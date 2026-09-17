import { loadStripe } from '@stripe/stripe-js'

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
// Deze site draait op Netlify, dus dat is de standaard. Stond hier het
// Vercel-pad, dan wees elke build zonder .env naar een functie die niet bestaat.
const ENDPOINT = import.meta.env.VITE_CHECKOUT_ENDPOINT || '/.netlify/functions/create-checkout-session'

let stripePromise
const getStripe = () => {
  if (!stripePromise && PUBLISHABLE_KEY) stripePromise = loadStripe(PUBLISHABLE_KEY)
  return stripePromise
}

/**
 * Stuurt de winkelwagen naar de serverless functie, die een Stripe
 * Checkout-sessie aanmaakt. Daarna leiden we de klant door naar de
 * beveiligde betaalpagina van Stripe.
 */
const MELDING = 'Er ging iets mis bij het starten van de betaling. Probeer het later opnieuw, of mail ons als het blijft gebeuren.'

/**
 * Geeft true terug als de klant wordt doorgestuurd naar Stripe, zodat de
 * afrekenknop uitgeschakeld blijft tot de pagina echt weg is. Geeft false
 * terug (na een melding) als er niets gebeurde — dan kan de klant het
 * opnieuw proberen.
 */
export async function startCheckout(items) {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((i) => ({ slug: i.slug, qty: i.qty })) }),
    })

    if (res.status === 409) {
      // Een uniek stuk is intussen verkocht of gereserveerd. De winkelwagen
      // handelt dit af: verwijdert het stuk en legt uit wat er gebeurde.
      const d = await res.json()
      return { nietBeschikbaar: { verkocht: d.verkocht || [], gereserveerd: d.gereserveerd || [] } }
    }

    if (!res.ok) {
      console.error(await res.text())
      alert(MELDING)
      return false
    }

    const data = await res.json()

    // Voorkeur: redirect via sessie-URL (eenvoudigst).
    if (data.url) { window.location.href = data.url; return true }

    // Alternatief: redirect via sessie-id; daarvoor is de publieke sleutel nodig.
    if (data.id && PUBLISHABLE_KEY) {
      const stripe = await getStripe()
      await stripe.redirectToCheckout({ sessionId: data.id })
      return true
    }

    console.error('Checkout gaf geen url of id terug', data)
    alert(MELDING)
    return false
  } catch (err) {
    // Offline, DNS, ongeldige JSON: zonder dit bleef de knop stil.
    console.error(err)
    alert(MELDING)
    return false
  }
}
