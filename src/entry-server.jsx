import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { VoorraadProvider } from './context/VoorraadContext.jsx'
import { SeoContext, headHtml } from './hooks/useSeo.js'
import { alleProducten, products } from './data/products.js'
import { gidsen } from './data/gidsen.js'

/* Gebruikt door scripts/prerender.mjs: rendert één pagina naar HTML en
   geeft de bijhorende <head>-tags terug. Zelfde boom als main.jsx. */
export function render(url) {
  const seo = {}
  const html = renderToString(
    <StrictMode>
      <SeoContext.Provider value={seo}>
        <StaticRouter location={url}>
          <VoorraadProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </VoorraadProvider>
        </StaticRouter>
      </SeoContext.Provider>
    </StrictMode>,
  )
  return { html, head: headHtml(seo), noindex: seo.noindex }
}

export const productSlugs = alleProducten.map((p) => p.slug)
// Verborgen producten krijgen wel een pagina, maar horen niet in de sitemap.
export const zichtbareSlugs = products.map((p) => p.slug)
/* Productgegevens voor de Google Shopping-feed (netlify/functions/shopping-feed.cjs).
   De feed vult de beschikbaarheid live aan uit de voorraad. */
export const feedProducten = products.map((p) => ({
  id: p.slug,
  titel: p.type === 'poufs'
    ? `Marokkaanse Berber poef ${p.name.split('— ').pop()} – vintage, handgeknoopt, uniek`
    : p.type === 'kussens'
      ? `Marokkaans Berber kussen ${p.name.split('— ').pop()} – handgeweven wol, uniek`
      : p.name,
  beschrijving: `${p.short} ${p.description} ${p.details.map(([k, v]) => `${k}: ${v}.`).join(' ')}`,
  pad: `/product/${p.slug}`,
  fotos: p.images || [],
  prijs: p.price,
  soort: p.type,
  label: p.categoryLabel,
}))

export const gidsSlugs = gidsen.map((g) => g.slug)
