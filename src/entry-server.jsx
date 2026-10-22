import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { VoorraadProvider } from './context/VoorraadContext.jsx'
import { SeoContext, headHtml } from './hooks/useSeo.js'
import { alleProducten } from './data/products.js'

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
