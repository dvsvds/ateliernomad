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
            // Onze prijzen zijn INCLUSIEF btw, zoals de algemene voorwaarden
            // zeggen. Stripe Tax rekent de btw er dus uít, in plaats van er
            // 21% bovenop te zetten: de klant betaalt gewoon de getoonde prijs.
            tax_behavior: 'inclusive',
            product_data: { name: ref.name },
          },
        }
      })

    const alleenTest = items.length > 0 && items.every((i) => i.slug === 'test-artikel')

    if (line_items.length === 0) return res.status(400).json({ error: 'Lege of ongeldige winkelmand' })

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
      // Bij een losse test geen verzendkosten: dan kost de test echt 50 cent.
      // Het leveradres blijft wel gevraagd worden, want Stripe Tax heeft het
      // nodig om het btw-tarief te bepalen.
      ...(alleenTest
        ? {}
        : {
          shipping_options: [
        { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 995, currency: 'eur' }, tax_behavior: 'inclusive', display_name: 'Standaard verzending (EU)', delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 7 } } } },
          ],
        }),
    })

    return res.status(200).json({ id: session.id, url: session.url })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Stripe-fout', detail: err.message })
  }
}
