// LET OP: deze Vercel-kopie heeft GEEN voorraadbeheer. De live shop draait
// op Netlify (netlify/functions/create-checkout-session.cjs); alleen daar
// worden unieke stukken gereserveerd en als verkocht gemarkeerd.
import Stripe from 'stripe'
import { CATALOG } from './_catalog.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// Geen terugval op localhost: zie de Netlify-versie.
const SITE_URL = process.env.SITE_URL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!SITE_URL) {
      console.error('SITE_URL ontbreekt')
      return res.status(500).json({ error: 'Shop niet geconfigureerd' })
    }

    const { items } = req.body || {}
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Ongeldige winkelwagen' })

    // Eerst per slug optellen, dan pas begrenzen (zie de Netlify-versie).
    const perSlug = new Map()
    for (const i of items) {
      if (!i || typeof i.slug !== 'string' || !CATALOG[i.slug]) continue
      perSlug.set(i.slug, (perSlug.get(i.slug) || 0) + (Math.max(0, parseInt(i.qty, 10)) || 0))
    }

    const line_items = [...perSlug].map(([slug, aantal]) => {
      const ref = CATALOG[slug]
      return {
        // max komt uit de catalogus: unieke stukken 1, overige 20
        quantity: Math.max(1, Math.min(ref.max || 20, aantal)),
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(ref.price * 100), // prijs van de SERVER, niet de client
          // Onze prijzen zijn INCLUSIEF btw, zoals de algemene voorwaarden
          // zeggen. Stripe Tax rekent de btw er dus uít, in plaats van er
          // 21% bovenop te zetten: de klant betaalt gewoon de getoonde prijs.
          tax_behavior: 'inclusive',
          product_data: {
            name: ref.name,
            images: [`${SITE_URL}/images/products/${slug}.jpg`],
          },
        },
      }
    })

    if (line_items.length === 0) return res.status(400).json({ error: 'Lege of ongeldige winkelwagen' })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // Stripe Tax staat aan in het dashboard, maar rekent pas mee als de
      // sessie er expliciet om vraagt. Vereist een leveradres van de klant
      // (zie shipping_address_collection hieronder) om het tarief te bepalen.
      automatic_tax: { enabled: true },
      success_url: `${SITE_URL}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/shop`,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['NL', 'BE', 'DE', 'FR', 'LU', 'AT', 'ES', 'IT', 'PT', 'DK', 'SE', 'FI', 'IE'],
      },
      shipping_options: [
        { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 995, currency: 'eur' }, tax_behavior: 'inclusive', display_name: 'Standaard verzending (EU)', delivery_estimate: { minimum: { unit: 'business_day', value: 2 }, maximum: { unit: 'business_day', value: 4 } } } },
      ],
    })

    return res.status(200).json({ id: session.id, url: session.url })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Stripe-fout' })
  }
}
