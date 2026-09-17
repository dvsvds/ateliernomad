const Stripe = require('stripe')
const nodemailer = require('nodemailer')
const { maakBevestiging, bestelcode } = require('../lib/bestelmail.cjs')
const { markeerVerkocht, geefVrij } = require('../lib/voorraad.cjs')

/* ============================================================
   stripe-webhook — na elke geslaagde betaling:
     1. een bevestigingsmail naar de klant
     2. een bestelmelding naar de eigenaar
   ------------------------------------------------------------
   Stripe roept deze functie aan zodra er betaald is. We controleren
   eerst de handtekening (anders kan iedereen valse bestellingen
   sturen) en halen dan de artikelen op.

   De klant krijgt zijn bevestiging via het Gmail-account van de zaak.
   De eigenaar krijgt de bestelling via Netlify Forms, dat al naar
   ateliernomad01@gmail.com doormailt. In die melding staat of de mail
   naar de klant gelukt is — mislukt die, dan zie je dat meteen.

   Eenmalig instellen in Netlify (Environment variables):
     STRIPE_WEBHOOK_SECRET  "Signing secret" van de webhook in Stripe (whsec_…)
     MAIL_USER              ateliernomad01@gmail.com
     MAIL_APP_PASSWORD      een Gmail-app-wachtwoord (niet je gewone wachtwoord)
   Daarna opnieuw deployen: Netlify geeft nieuwe variabelen pas bij een
   deploy door aan functies.

   Stripe-webhook: Developers → Webhooks → Add endpoint
     URL:    https://xn--ateliernomd-h7a.be/.netlify/functions/stripe-webhook
     Events: checkout.session.completed, checkout.session.async_payment_succeeded,
             checkout.session.expired (geeft een reservering vrij)

   Testbetalingen (Stripe in testmodus) sturen de klantmail naar
   MAIL_USER in plaats van naar het testadres, met [TEST] in het onderwerp.
   ============================================================ */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const SITE_URL = process.env.SITE_URL

const euro = (centen) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format((centen || 0) / 100)

const adresTekst = (a) =>
  [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(' '), a.state, a.country]
    .filter(Boolean)
    .join('\n')

/* Zuivere functie: de velden van de bestelmelding voor de eigenaar. */
function maakVelden(session, regels, { test = false, klantmail = 'onbekend' } = {}) {
  const klant = session.customer_details || {}
  const lever = session.collected_information?.shipping_details || session.shipping_details || null
  const adres = lever?.address || klant.address

  return {
    'form-name': 'bestelling',
    status: test ? 'TEST — dit is geen echte bestelling' : 'Betaald',
    bestelcode: bestelcode(session.id),
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
    klantmail,
    stripe: typeof session.payment_intent === 'string'
      ? `https://dashboard.stripe.com/payments/${session.payment_intent}`
      : 'https://dashboard.stripe.com/payments',
    'bot-field': '',
  }
}

/* Stuurt de bevestiging naar de klant. Gooit nooit: het resultaat komt
   als tekst in de melding voor de eigenaar. `transport` is er voor tests. */
async function stuurBevestiging(session, regels, { test = false, transport } = {}) {
  const user = process.env.MAIL_USER
  const pass = process.env.MAIL_APP_PASSWORD
  if (!transport && (!user || !pass)) return 'niet verstuurd — MAIL_USER of MAIL_APP_PASSWORD ontbreekt in Netlify'

  const aan = test ? user : session.customer_details?.email
  if (!aan) return 'niet verstuurd — geen e-mailadres van de klant'

  const { onderwerp, html, tekst } = maakBevestiging({ session, regels, siteUrl: SITE_URL })
  try {
    const verzender = transport || nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      // Netlify-functies hebben maar een paar seconden: niet blijven hangen.
      connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 8000,
    })
    await verzender.sendMail({
      from: `"Atelier Nomàd" <${user}>`,
      to: aan,
      replyTo: user,
      subject: (test ? '[TEST] ' : '') + onderwerp,
      html,
      text: tekst,
    })
    return `verstuurd naar ${aan}`
  } catch (err) {
    console.error('Bevestiging naar klant mislukt:', err.message)
    return `MISLUKT (${err.message}) — stuur de klant zelf een bevestiging`
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  if (!SITE_URL) {
    console.error('SITE_URL ontbreekt in Netlify — webhook genegeerd')
    return { statusCode: 500, body: 'Webhook niet geconfigureerd' }
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

  const slugs = String(session.metadata?.slugs || '').split(',').filter(Boolean)

  if (stripeEvent.type === 'checkout.session.expired') {
    // Niet betaald binnen 30 minuten: het stuk mag weer verkocht worden.
    await geefVrij(event, slugs, session.id).catch((err) => console.error('vrijgeven mislukt:', err.message))
    return { statusCode: 200, body: JSON.stringify({ vrijgegeven: session.id }) }
  }

  if (!betaald) {
    return { statusCode: 200, body: JSON.stringify({ genegeerd: stripeEvent.type }) }
  }

  // Eerst de voorraad: vanaf nu staat het stuk overal als "Verkocht". Dit
  // gaat vóór de mails, want een gemiste mail is te herstellen, een dubbele
  // verkoop niet.
  try {
    await markeerVerkocht(event, slugs, session.id)
  } catch (err) {
    console.error('verkocht markeren mislukt:', err.message)
    return { statusCode: 500, body: 'Voorraad bijwerken mislukt' }
  }

  const test = !stripeEvent.livemode

  let regels = []
  try {
    // price.product meegeven, dan staan de productfoto's erbij voor de mail.
    regels = (await stripe.checkout.sessions.listLineItems(session.id, { limit: 100, expand: ['data.price.product'] })).data
  } catch (err) {
    // Geen reden om de meldingen tegen te houden.
    console.error('Artikelen ophalen mislukt:', err.message)
  }

  // Eerst de melding voor de eigenaar. Mislukt die, dan antwoorden we met een
  // fout en probeert Stripe later opnieuw — en dan mag de klant niet al een
  // mail hebben gehad, anders krijgt hij er bij elke poging nog een.
  const melding = async (velden) => {
    const res = await fetch(`${SITE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(velden).toString(),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  }

  try {
    await melding(maakVelden(session, regels, { test, klantmail: 'wordt verstuurd…' }))
  } catch (err) {
    console.error('Bestelmelding versturen mislukt:', err.message)
    return { statusCode: 500, body: 'Melding mislukt' }
  }

  // Daarna de klant. Vanaf hier altijd 200: Stripe hoeft niet meer terug te
  // komen, en het resultaat staat in een tweede regel in Netlify Forms als
  // het misging.
  const klantmail = await stuurBevestiging(session, regels, { test })
  if (klantmail.startsWith('MISLUKT') || klantmail.startsWith('niet verstuurd')) {
    try {
      await melding({ ...maakVelden(session, regels, { test, klantmail }), status: 'LET OP — klantmail niet verstuurd' })
    } catch (err) {
      console.error('Tweede melding mislukt:', err.message)
    }
  }

  return { statusCode: 200, body: JSON.stringify({ gemeld: session.id, klantmail }) }
}

exports._maakVelden = maakVelden
exports._stuurBevestiging = stuurBevestiging
