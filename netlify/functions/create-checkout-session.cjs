const Stripe = require('stripe')
const { reserveer, draagOver, geefVrij, RESERVERING_MS } = require('../lib/voorraad.cjs')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// Geen terugval op localhost: een productie-deploy zonder SITE_URL zou
// klanten na het betalen naar een dood adres sturen.
const SITE_URL = process.env.SITE_URL

// <catalog: gegenereerd door scripts/sync-catalog.mjs — niet met de hand aanpassen>
const CATALOG = {
  'pouf-haze':     { name: "Berber poef — Haze", price: 130, max: 1 },
  'pouf-poppy':    { name: "Berber poef — Poppy", price: 130, max: 1 },
  'pouf-heather':  { name: "Berber poef — Heather", price: 130, max: 1 },
  'pouf-saffron':  { name: "Berber poef — Saffron", price: 130, max: 1 },
  'pouf-drift':    { name: "Berber poef — Drift", price: 130, max: 1 },
  'pouf-indigo':   { name: "Berber poef — Indigo", price: 130, max: 1 },
  'pouf-peach':    { name: "Berber poef — Peach", price: 130, max: 1 },
  'pouf-chalk':    { name: "Berber poef — Chalk", price: 120, max: 1 },
  'pouf-tide':     { name: "Berber poef — Tide", price: 130, max: 1 },
  'pouf-blush':    { name: "Berber poef — Blush", price: 140, max: 1 },
  'pouf-cinnamon': { name: "Berber poef — Cinnamon", price: 130, max: 1 },
  'pouf-dune':     { name: "Berber poef — Dune", price: 140, max: 1 },
  'pouf-rust':     { name: "Berber poef — Rust", price: 140, max: 1 },
  'pouf-pebble':   { name: "Berber poef — Pebble", price: 130, max: 1 },
  'pouf-solstice': { name: "Berber poef — Solstice", price: 130, max: 1 },
  'pouf-shoal':    { name: "Berber poef — Shoal", price: 130, max: 1 },
  'pouf-ember':    { name: "Berber poef — Ember", price: 130, max: 1 },
  'pouf-quill':    { name: "Berber poef — Quill", price: 120, max: 1 },
  'pouf-marigold': { name: "Berber poef — Marigold", price: 140, max: 1 },
  'pouf-signal':   { name: "Berber poef — Signal", price: 140, max: 1 },
  'pouf-basalt':   { name: "Berber poef — Basalt", price: 140, max: 1 },
  'pouf-ash':      { name: "Berber poef — Ash", price: 130, max: 1 },
  'pouf-sorrel':   { name: "Berber poef — Sorrel", price: 140, max: 1 },
  'pouf-coral':    { name: "Berber poef — Coral", price: 140, max: 1 },
  'pouf-foxglove': { name: "Berber poef — Foxglove", price: 140, max: 1 },
  'pouf-apricot':  { name: "Berber poef — Apricot", price: 140, max: 1 },
  'pouf-garnet':   { name: "Berber poef — Garnet", price: 140, max: 1 },
  'pouf-bloom':    { name: "Berber poef — Bloom", price: 130, max: 1 },
  'pouf-kapsa':    { name: "Berber poef — Kapsa", price: 130, max: 1 },
  'kussen-atlas':  { name: "Berber kussen — Atlas", price: 75, max: 1 },
  'kussen-fern':   { name: "Berber kussen — Fern", price: 75, max: 1 },
  'kussen-cobalt': { name: "Berber kussen — Cobalt", price: 75, max: 1 },
  'kussen-sienna': { name: "Berber kussen — Sienna", price: 75, max: 1 },
  'kussen-cipher': { name: "Berber kussen — Cipher", price: 75, max: 1 },
  'kussen-prism':  { name: "Berber kussen — Prism", price: 75, max: 1 },
  'kussen-umber':  { name: "Berber kussen — Umber", price: 75, max: 1 },
  'kussen-flare':  { name: "Berber kussen — Flare", price: 75, max: 1 },
}
// </catalog>

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  try {
    if (!SITE_URL) {
      console.error('SITE_URL ontbreekt in Netlify')
      return { statusCode: 500, body: JSON.stringify({ error: 'Shop niet geconfigureerd' }) }
    }

    const { items } = JSON.parse(event.body || '{}')
    if (!Array.isArray(items)) return { statusCode: 400, body: JSON.stringify({ error: 'Ongeldige winkelwagen' }) }

    // Eerst per slug optellen, dan pas begrenzen: twee losse regels van
    // hetzelfde unieke stuk zouden anders samen 2 exemplaren verkopen.
    const perSlug = new Map()
    for (const i of items) {
      if (!i || typeof i.slug !== 'string' || !CATALOG[i.slug]) continue
      perSlug.set(i.slug, (perSlug.get(i.slug) || 0) + (Math.max(0, parseInt(i.qty, 10)) || 0))
    }

    const line_items = [...perSlug].map(([slug, aantal]) => {
      const ref = CATALOG[slug]
      return {
        // max komt uit de catalogus: unieke stukken 1 (nu de hele collectie), overige 20
        quantity: Math.max(1, Math.min(ref.max || 20, aantal)),
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(ref.price * 100), // prijs van de SERVER, niet de client
          // Prijzen zijn inclusief btw; Stripe Tax rekent de btw eruit.
          tax_behavior: 'inclusive',
          product_data: {
            name: ref.name,
            // Zo staat de foto op de betaalpagina en in de bevestigingsmail.
            images: [`${SITE_URL}/images/products/${slug}.jpg`],
          },
        },
      }
    })

    if (line_items.length === 0) return { statusCode: 400, body: JSON.stringify({ error: 'Lege of ongeldige winkelwagen' }) }

    // Unieke stukken: eerst kijken of ze nog vrij zijn, en meteen vastzetten
    // voor deze klant. Zo kunnen twee mensen niet dezelfde pouf afrekenen.
    const uniek = [...perSlug.keys()].filter((slug) => CATALOG[slug].max === 1)
    const tijdelijkId = 'aanmaak_' + Date.now() + '_' + Math.random().toString(36).slice(2)
    const r = await reserveer(event, uniek, tijdelijkId)
    if (!r.ok) {
      const naam = (s) => CATALOG[s].name
      if (r.onbeschikbaar) console.error('voorraad onbereikbaar: unieke stukken tijdelijk geweigerd')
      return {
        statusCode: 409,
        body: JSON.stringify({
          error: 'Niet meer beschikbaar',
          verkocht: r.verkocht.map((s) => ({ slug: s, name: naam(s) })),
          gereserveerd: r.gereserveerd.map((s) => ({ slug: s, name: naam(s) })),
        }),
      }
    }

    let session
    try {
      session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // Zelfde levensduur als de reservering: verloopt de sessie, dan komt
      // het stuk vrij (via de webhook checkout.session.expired, of vanzelf).
      expires_at: Math.floor((Date.now() + RESERVERING_MS) / 1000),
      // De webhook leest hier welke stukken verkocht zijn.
      metadata: { slugs: [...perSlug.keys()].join(','), reservering: tijdelijkId },
      // Stripe Tax rekent pas mee als de sessie er expliciet om vraagt.
      automatic_tax: { enabled: true },
      success_url: `${SITE_URL}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/shop`,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['NL','BE','DE','FR','LU','AT','ES','IT','PT','DK','SE','FI','IE'] },
      shipping_options: [
        { shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 995, currency: 'eur' }, tax_behavior: 'inclusive', display_name: 'Standaard verzending (EU)', delivery_estimate: { minimum: { unit: 'business_day', value: 2 }, maximum: { unit: 'business_day', value: 4 } } } },
      ],
    })

    } catch (err) {
      // Stripe weigerde: reservering meteen weer vrij, anders staat het stuk
      // een half uur voor niets vast.
      await geefVrij(event, uniek, tijdelijkId).catch(() => {})
      throw err
    }

    // Reservering overzetten op de echte sessie-id, zodat de webhook hem
    // bij een verlopen sessie kan vrijgeven.
    await draagOver(event, r.etags || {}, tijdelijkId, session.id).catch((err) => console.error('overdracht reservering mislukt:', err.message))

    return { statusCode: 200, body: JSON.stringify({ id: session.id, url: session.url }) }
  } catch (err) {
    console.error(err)
    // Geen foutdetails naar de browser; die staan in de functielogs.
    return { statusCode: 500, body: JSON.stringify({ error: 'Stripe-fout' }) }
  }
}
