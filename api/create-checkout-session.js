import Stripe from 'stripe'
import { CATALOG } from './_catalog.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { items = [] } = req.body || {}

    const line_items = items
      .filter((i) => CATALOG[i.slug])
      .map((i) => {
        const ref = CATALOG[i.slug]
        return {
          // max komt uit de catalogus: unieke stukken 1, overige 20
          quantity: Math.max(1, Math.min(ref.max || 20, parseInt(i.qty, 10) || 1)),
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(ref.price * 100), // prijs van de SERVER, niet de client
            product_data: { name: ref.name },
          },
        }
      })

    if (line_items.length === 0) return res.status(400).json({ error: 'Lege of ongeldige winkelmand' })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${SITE_URL}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/shop`,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['NL', 'BE', 'DE', 'FR', 'LU', 'AT', 'ES', 'IT', 'PT', 'DK', 'SE', 'FI', 'IE'],
      },
      shipping_options: [
        { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 995, currency: 'eur' }, display_name: 'Standaard verzending (EU)', delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 7 } } } },
      ],
    })

    return res.status(200).json({ id: session.id, url: session.url })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Stripe-fout', detail: err.message })
  }
}
