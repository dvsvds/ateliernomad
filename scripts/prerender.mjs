/* ============================================================
   PRERENDER — draait na `vite build` (zie package.json)
   ------------------------------------------------------------
   Maakt van elke pagina een eigen HTML-bestand met de inhoud en de
   juiste <title>, description, canonical en Open Graph-tags erin.
   Zo zien Google, maar ook WhatsApp/Facebook/Instagram-voorbeelden
   en AI-zoekmachines (die geen JavaScript draaien), meteen wat er
   op de pagina staat. Daarna neemt React het in de browser over.

   Schrijft ook dist/sitemap.xml opnieuw uit de productlijst, zodat
   een nieuw of verwijderd product nooit vergeten wordt.
   ============================================================ */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE_URL = 'https://ateliernomad.eu'

const { render, productSlugs } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const sjabloon = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const vast = ['/', '/shop', '/over', '/ambacht', '/contact', '/faq', '/voorwaarden', '/privacy', '/verzending']
const pagina = [...vast, ...productSlugs.map((s) => `/product/${s}`)]

const SEO = /<!--seo-->[\s\S]*?<!--\/seo-->/

function schrijf(bestand, { html, head }) {
  if (!SEO.test(sjabloon)) throw new Error('index.html mist de <!--seo--> … <!--/seo--> markering')
  const uit = sjabloon
    .replace(SEO, head)
    .replace('<div id="root"><!--app--></div>', `<div id="root">${html}</div>`)
  const doel = path.join(dist, bestand)
  fs.mkdirSync(path.dirname(doel), { recursive: true })
  fs.writeFileSync(doel, uit)
}

// /shop → shop.html: Netlify serveert dat op /shop, zonder slash-doorverwijzing.
const bestandVoor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`)

const inSitemap = []
for (const url of pagina) {
  const r = render(url)
  schrijf(bestandVoor(url), r)
  if (!r.noindex) inSitemap.push(url)
}

// Echte 404-pagina (Netlify geeft dan ook status 404, geen "zachte" 404).
schrijf('404.html', render('/deze-pagina-bestaat-niet'))

// /bedankt hangt af van de Stripe-sessie in de URL: geen vooraf gerenderde
// inhoud, React bouwt de pagina in de browser op. Wel noindex.
fs.writeFileSync(
  path.join(dist, 'bedankt.html'),
  sjabloon.replace(SEO, (m) => m.replace('<!--/seo-->', '<meta name="robots" content="noindex, follow" />\n    <!--/seo-->')),
)

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${inSitemap.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`,
)

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: ${pagina.length} pagina's + 404 + bedankt, sitemap met ${inSitemap.length} URL's`)
