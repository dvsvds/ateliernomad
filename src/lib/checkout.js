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
export async function startCheckout(items) {
  // Geen controle op PUBLISHABLE_KEY vóór de betaling. De server geeft een
  // betaal-URL terug, dus de publieke sleutel is alleen nodig voor de oude
  // redirect via sessie-id onderaan. Die controle stond hier vroeger en werd
  // bij een build zonder .env letterlijk in de code gebakken: klanten kregen
  // "nog niet geconfigureerd" terwijl de betaalfunctie gewoon werkte.

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
  if (data.id && PUBLISHABLE_KEY) {
    const stripe = await getStripe()
    await stripe.redirectToCheckout({ sessionId: data.id })
  }
}
