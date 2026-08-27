import { loadStripe } from '@stripe/stripe-js'

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const ENDPOINT = import.meta.env.VITE_CHECKOUT_ENDPOINT || '/api/create-checkout-session'

let stripePromise
const getStripe = () => {
  if (!stripePromise && PUBLISHABLE_KEY) stripePromise = loadStripe(PUBLISHABLE_KEY)
  return stripePromise
}

/**
 * Stuurt de winkelmand naar de serverless functie, die een Stripe
 * Checkout-sessie aanmaakt. Daarna leiden we de klant door naar de
 * beveiligde betaalpagina van Stripe.
 */
export async function startCheckout(items) {
  if (!PUBLISHABLE_KEY) {
    alert(
      'Stripe is nog niet geconfigureerd.\n\n' +
      'Vul je sleutels in het bestand ".env" in (zie .env.example) ' +
      'en deploy de functie in /api om echt te kunnen afrekenen.'
    )
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((i) => ({ slug: i.slug, name: i.name, price: i.price, qty: i.qty, image: i.image })),
    }),
  })

  if (!res.ok) {
    console.error(await res.text())
    alert('Er ging iets mis bij het starten van de betaling. Probeer het later opnieuw.')
    return
  }

  const data = await res.json()

  // Voorkeur: redirect via sessie-URL (eenvoudigst).
  if (data.url) { window.location.href = data.url; return }

  // Alternatief: redirect via sessie-id.
  if (data.id) {
    const stripe = await getStripe()
    await stripe.redirectToCheckout({ sessionId: data.id })
  }
}
