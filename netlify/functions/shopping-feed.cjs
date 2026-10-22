const { stand } = require('../lib/voorraad.cjs')

/* ============================================================
   Google Shopping-feed — /google-shopping.xml (zie public/_redirects)
   ------------------------------------------------------------
   Merchant Center haalt dit bestand geregeld op. Zo verschijnen de
   stukken gratis met foto en prijs in Google Shopping.

   De productgegevens komen uit /feed-data.json (gemaakt bij elke
   build door scripts/prerender.mjs), de beschikbaarheid live uit de
   voorraad: een verkocht stuk staat meteen op "out_of_stock".
   ============================================================ */

const SITE = 'https://ateliernomad.eu'
const VERZENDING = '9.95 EUR' // gelijk aan shop.shippingCost in src/data/site.js

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const CATEGORIE = {
  poufs: 'Furniture > Ottomans',
  kussens: 'Home & Garden > Decor > Throw Pillows',
}

exports.handler = async (event) => {
  const res = await fetch(`${SITE}/feed-data.json`)
  if (!res.ok) return { statusCode: 502, body: 'feed-data.json niet gevonden' }
  const producten = await res.json()

  let verkocht = []
  try { verkocht = (await stand(event)).verkocht || [] } catch (err) {
    console.error('voorraad voor feed mislukt:', err.message)
  }

  const items = producten.map((p) => {
    const [foto, ...meer] = p.fotos
    return `    <item>
      <g:id>${esc(p.id)}</g:id>
      <g:title>${esc(p.titel)}</g:title>
      <g:description>${esc(p.beschrijving)}</g:description>
      <g:link>${SITE}${esc(p.pad)}</g:link>
      <g:image_link>${SITE}${esc(foto)}</g:image_link>
${meer.map((f) => `      <g:additional_image_link>${SITE}${esc(f)}</g:additional_image_link>\n`).join('')}      <g:availability>${verkocht.includes(p.id) ? 'out_of_stock' : 'in_stock'}</g:availability>
      <g:price>${Number(p.prijs).toFixed(2)} EUR</g:price>
      <g:condition>new</g:condition>
      <g:brand>Atelier Nomàd</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${esc(CATEGORIE[p.soort] || 'Home & Garden > Decor')}</g:google_product_category>
      <g:product_type>${esc(p.label)}</g:product_type>
      <g:shipping><g:country>BE</g:country><g:price>${VERZENDING}</g:price></g:shipping>
    </item>`
  }).join('\n')

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=900' },
    body: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Atelier Nomàd</title>
    <link>${SITE}</link>
    <description>Marokkaanse Berber poefs en kussens</description>
${items}
  </channel>
</rss>
`,
  }
}
