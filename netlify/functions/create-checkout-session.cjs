const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'

// <catalog: gegenereerd door scripts/sync-catalog.mjs — niet met de hand aanpassen>
const CATALOG = {
  'pouf-haze':     { name: "Vloerpouf — Haze", price: 130, max: 1 },
  'pouf-poppy':    { name: "Vloerpouf — Poppy", price: 130, max: 1 },
  'pouf-heather':  { name: "Vloerpouf — Heather", price: 130, max: 1 },
  'pouf-saffron':  { name: "Vloerpouf — Saffron", price: 130, max: 1 },
  'pouf-clay':     { name: "Vloerpouf — Clay", price: 140, max: 1 },
  'pouf-drift':    { name: "Vloerpouf — Drift", price: 130, max: 1 },
  'pouf-indigo':   { name: "Vloerpouf — Indigo", price: 130, max: 1 },
  'pouf-peach':    { name: "Vloerpouf — Peach", price: 130, max: 1 },
  'pouf-chalk':    { name: "Vloerpouf — Chalk", price: 120, max: 1 },
  'pouf-tide':     { name: "Vloerpouf — Tide", price: 130, max: 1 },
  'pouf-blush':    { name: "Vloerpouf — Blush", price: 140, max: 1 },
  'pouf-cinnamon': { name: "Vloerpouf — Cinnamon", price: 130, max: 1 },
  'pouf-dune':     { name: "Vloerpouf — Dune", price: 140, max: 1 },
  'pouf-rust':     { name: "Vloerpouf — Rust", price: 140, max: 1 },
  'pouf-pebble':   { name: "Vloerpouf — Pebble", price: 130, max: 1 },
  'pouf-solstice': { name: "Vloerpouf — Solstice", price: 130, max: 1 },
  'pouf-shoal':    { name: "Vloerpouf — Shoal", price: 130, max: 1 },
  'pouf-ember':    { name: "Vloerpouf — Ember", price: 130, max: 1 },
  'pouf-meadow':   { name: "Vloerpouf — Meadow", price: 140, max: 1 },
  'pouf-quill':    { name: "Vloerpouf — Quill", price: 120, max: 1 },
  'pouf-thistle':  { name: "Vloerpouf — Thistle", price: 140, max: 1 },
  'pouf-marigold': { name: "Vloerpouf — Marigold", price: 140, max: 1 },
  'pouf-signal':   { name: "Vloerpouf — Signal", price: 140, max: 1 },
  'pouf-basalt':   { name: "Vloerpouf — Basalt", price: 140, max: 1 },
  'pouf-ash':      { name: "Vloerpouf — Ash", price: 130, max: 1 },
  'pouf-mist':     { name: "Vloerpouf — Mist", price: 130, max: 1 },
  'pouf-sorrel':   { name: "Vloerpouf — Sorrel", price: 140, max: 1 },
  'pouf-coral':    { name: "Vloerpouf — Coral", price: 140, max: 1 },
  'pouf-foxglove': { name: "Vloerpouf — Foxglove", price: 140, max: 1 },
  'pouf-apricot':  { name: "Vloerpouf — Apricot", price: 140, max: 1 },
  'pouf-garnet':   { name: "Vloerpouf — Garnet", price: 140, max: 1 },
  'pouf-bloom':    { name: "Vloerpouf — Bloom", price: 130, max: 1 },
  'pouf-kapsa':    { name: "Vloerpouf — Kapsa", price: 130, max: 1 },
  'stoel-laurel':  { name: "Stoel — Laurel", price: 165, max: 20 },
  'krukje-laurel': { name: "Krukje — Laurel", price: 95, max: 20 },
  'kapstok-doum':  { name: "Kapstok — Doum", price: 285, max: 20 },
  'kussen-atlas':  { name: "Kussen — Atlas", price: 75, max: 20 },
  'kussen-fern':   { name: "Kussen — Fern", price: 75, max: 20 },
  'kussen-cobalt': { name: "Kussen — Cobalt", price: 75, max: 20 },
  'kussen-sienna': { name: "Kussen — Sienna", price: 75, max: 20 },
  'kussen-cipher': { name: "Kussen — Cipher", price: 75, max: 20 },
  'kussen-prism':  { name: "Kussen — Prism", price: 75, max: 20 },
  'kussen-umber':  { name: "Kussen — Umber", price: 75, max: 20 },
  'kussen-flare':  { name: "Kussen — Flare", price: 75, max: 20 },
}
// </catalog>

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  try {
    const { items = [] } = JSON.parse(event.body || '{}')
    const line_items = items
      .filter((i) => CATALOG[i.slug])
      .map((i) => ({
        // max komt uit de catalogus: unieke stukken 1, overige 20
        quantity: Math.max(1, Math.min(CATALOG[i.slug].max || 20, parseInt(i.qty, 10) || 1)),
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(CATALOG[i.slug].price * 100),
          // Prijzen zijn inclusief btw; Stripe Tax rekent de btw eruit.
          tax_behavior: 'inclusive',
          product_data: { name: CATALOG[i.slug].name },
        },
      }))

    if (line_items.length === 0) return { statusCode: 400, body: JSON.stringify({ error: 'Lege of ongeldige winkelmand' }) }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // Stripe Tax rekent pas mee als de sessie er expliciet om vraagt.
      automatic_tax: { enabled: true },
      success_url: `${SITE_URL}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/shop`,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['NL','BE','DE','FR','LU','AT','ES','IT','PT','DK','SE','FI','IE'] },
      shipping_options: [
        { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 995, currency: 'eur' }, tax_behavior: 'inclusive', display_name: 'Standaard verzending (EU)' } },
      ],
    })

    return { statusCode: 200, body: JSON.stringify({ id: session.id, url: session.url }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Stripe-fout', detail: err.message }) }
  }
}
