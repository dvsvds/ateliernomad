const Stripe = require('stripe')

/* ============================================================
   stripe-webhook — mailt de eigenaar bij elke geslaagde betaling
   ------------------------------------------------------------
   Stripe roept deze functie aan zodra er betaald is. We controleren
   eerst de handtekening (anders kan iedereen valse bestellingen
   sturen), halen dan de artikelen op en posten de bestelling naar
   Netlify Forms. Netlify mailt elke formulierinzending door naar
   ateliernomad01@gmail.com, dus er is geen aparte maildienst nodig.

   Eenmalig instellen:
   1. Stripe → Developers → Webhooks → Add endpoint
        URL:    https://xn--ateliernomd-h7a.be/.netlify/functions/stripe-webhook
        Events: checkout.session.completed
                checkout.session.async_payment_succeeded
   2. Kopieer de "Signing secret" (begint met whsec_) naar Netlify als
      STRIPE_WEBHOOK_SECRET, en deploy daarna opnieuw: Netlify geeft
      nieuwe variabelen pas bij een deploy door aan functies.

   Het formulier "bestelling" staat als verborgen kopie in index.html.
   Voeg je hier een veld toe, zet het daar dan ook bij — anders gooit
   Netlify het weg.
   ============================================================ */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const SITE_URL = process.env.SITE_URL

const euro = (centen) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format((centen || 0) / 100)

const adresTekst = (a) =>
  [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(' '), a.state, a.country]
    .filter(Boolean)
    .join('\n')

/* Zuivere functie: zet een Checkout-sessie om in de velden van de
   bestelmail. Apart gehouden zodat ze zonder Stripe te testen is. */
function maakVelden(session, regels, { test = false } = {}) {
  const klant = session.customer_details || {}
  // Nieuwere API-versies zetten het leveradres onder collected_information.
  const lever = session.collected_information?.shipping_details || session.shipping_details || null
  const adres = lever?.address || klant.address

  return {
    'form-name': 'bestelling',
    status: test ? 'TEST — dit is geen echte bestelling' : 'Betaald',
    bestelnummer: session.id,
    datum: new Date((session.created || Date.now() / 1000) * 1000).toLocaleString('nl-BE', { timeZone: 'Europe/Brussels' }),
    totaal: euro(session.amount_total),
    verzending: euro(session.shipping_cost?.amount_total),
    btw: euro(session.total_details?.amount_tax),
    artikelen: regels && regels.length
      ? regels.map((r) => `${r.quantity} × ${r.description} — ${euro(r.amount_total)}`).join('\n')
      : 'Artikelen konden niet opgehaald worden — bekijk de betaling in Stripe.',
    naam: lever?.name || klant.name || '',
    email: klant.email || '',
    leveradres: adres ? adresTekst(adres) : 'niet opgegeven',
    stripe: typeof session.payment_intent === 'string'
      ? `https://dashboard.stripe.com/payments/${session.payment_intent}`
      : 'https://dashboard.stripe.com/payments',
    'bot-field': '',
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET ontbreekt in Netlify — webhook genegeerd')
    return { statusCode: 500, body: 'Webhook niet geconfigureerd' }
  }

  // De handtekening wordt berekend over de ruwe body, dus die mag niet
  // eerst geparsed of omgezet worden.
  const handtekening = event.headers['stripe-signature'] || event.headers['Stripe-Signature']
  const ruw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : (event.body || '')

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(ruw, handtekening, secret)
  } catch (err) {
    console.error('Ongeldige Stripe-handtekening:', err.message)
    return { statusCode: 400, body: 'Ongeldige handtekening' }
  }

  const session = stripeEvent.data.object
  // Kaart en Bancontact zijn meteen betaald: dan volstaat "completed".
  // Trage methodes (bv. SEPA) sturen eerst "completed" met status unpaid
  // en pas later "async_payment_succeeded" — dan pas is het geld er.
  const betaald =
    (stripeEvent.type === 'checkout.session.completed' && session.payment_status === 'paid') ||
    stripeEvent.type === 'checkout.session.async_payment_succeeded'

  if (!betaald) {
    return { statusCode: 200, body: JSON.stringify({ genegeerd: stripeEvent.type }) }
  }

  let regels = []
  try {
    regels = (await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })).data
  } catch (err) {
    // Geen reden om de melding tegen te houden: de mail zegt dan dat je
    // de artikelen in Stripe moet bekijken.
    console.error('Artikelen ophalen mislukt:', err.message)
  }

  const velden = maakVelden(session, regels, { test: !stripeEvent.livemode })

  try {
    const res = await fetch(`${SITE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(velden).toString(),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } catch (err) {
    console.error('Bestelmelding versturen mislukt:', err.message)
    // Een fout laat Stripe het later opnieuw proberen, dus geen gemiste bestelling.
    return { statusCode: 500, body: 'Melding mislukt' }
  }

  return { statusCode: 200, body: JSON.stringify({ gemeld: session.id }) }
}

exports._maakVelden = maakVelden
