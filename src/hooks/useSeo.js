import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { taalVan, tegenhanger } from '../i18n.js'

export const SITE = 'Atelier Nomàd'
export const SITE_URL = 'https://ateliernomad.eu'
export const STANDAARD = {
  description: 'Atelier Nomàd biedt handgemaakte Marokkaanse interieurstukken: vintage vloerpoufs en handgeweven wollen kussens. Authentiek, ambachtelijk en tijdloos.',
  descriptionEn: 'Atelier Nomàd: handmade Moroccan interior pieces — vintage Berber poufs and hand-woven wool cushions. Authentic, crafted by hand and timeless.',
  image: '/images/brand/og-image.jpg',
}

/* Bij het vooraf renderen (scripts/prerender.mjs) loopt geen useEffect.
   Daar schrijft de hook zijn gegevens in dit object, zodat het script
   ze in de <head> van het HTML-bestand kan zetten. */
export const SeoContext = createContext(null)

const absoluut = (pad) => (/^https?:/.test(pad) ? pad : SITE_URL + pad)

/** Alles wat in de <head> van een pagina hoort, uit wat de pagina opgeeft. */
export function seoGegevens({ title, description, image, type, noindex, jsonLd }, pathname) {
  const taal = taalVan(pathname)
  const pad = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const ander = noindex ? null : tegenhanger(pad)
  const nl = taal === 'nl' ? pad : ander
  const en = taal === 'en' ? pad : ander
  return {
    taal,
    title: title ? `${title} — ${SITE}` : `${SITE} — Handcrafted Moroccan Living`,
    description: description || (taal === 'en' ? STANDAARD.descriptionEn : STANDAARD.description),
    // Zonder queryparameters: /shop?cat=poufs is inhoudelijk /shop.
    canonical: SITE_URL + pad,
    // hreflang: welke Nederlandse en Engelse pagina bij elkaar horen.
    alternates: nl && en ? [['nl-BE', SITE_URL + nl], ['en', SITE_URL + en], ['x-default', SITE_URL + nl]] : [],
    image: absoluut(image || STANDAARD.image),
    type: type || 'website',
    noindex: Boolean(noindex),
    jsonLd: jsonLd ? [].concat(jsonLd) : [],
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// In een <script> mag geen "</script>" of "<!--" terechtkomen.
const jsonVeilig = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

/** De <head>-tags als tekst — gebruikt door het prerenderscript. */
export function headHtml(g) {
  return [
    `<title>${esc(g.title)}</title>`,
    `<meta name="description" content="${esc(g.description)}" />`,
    g.noindex ? '<meta name="robots" content="noindex, follow" />' : '',
    `<link rel="canonical" href="${esc(g.canonical)}" />`,
    `<meta property="og:type" content="${esc(g.type)}" />`,
    `<meta property="og:site_name" content="${SITE}" />`,
    `<meta property="og:locale" content="${g.taal === 'en' ? 'en_GB' : 'nl_BE'}" />`,
    ...g.alternates.map(([hl, href]) => `<link rel="alternate" hreflang="${hl}" href="${esc(href)}" />`),
    `<meta property="og:title" content="${esc(g.title)}" />`,
    `<meta property="og:description" content="${esc(g.description)}" />`,
    `<meta property="og:image" content="${esc(g.image)}" />`,
    `<meta property="og:url" content="${esc(g.canonical)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(g.title)}" />`,
    `<meta name="twitter:description" content="${esc(g.description)}" />`,
    `<meta name="twitter:image" content="${esc(g.image)}" />`,
    ...g.jsonLd.map((o) => `<script type="application/ld+json" data-seo>${jsonVeilig(o)}</script>`),
  ].filter(Boolean).join('\n    ')
}

function zetMeta(attr, naam, waarde) {
  let tag = document.head.querySelector(`meta[${attr}="${naam}"]`)
  if (waarde == null) { tag?.remove(); return }
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, naam)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', waarde)
}

/** Lichtgewicht SEO-hook: title, description, canonical, Open Graph en structured data per pagina. */
export default function useSeo(opties = {}) {
  const { pathname } = useLocation()
  const g = seoGegevens(opties, pathname)
  const verzamel = useContext(SeoContext)
  if (verzamel) Object.assign(verzamel, g)

  const sleutel = JSON.stringify(g)
  useEffect(() => {
    document.title = g.title
    document.documentElement.lang = g.taal === 'en' ? 'en' : 'nl-BE'
    zetMeta('property', 'og:locale', g.taal === 'en' ? 'en_GB' : 'nl_BE')
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.remove())
    g.alternates.forEach(([hl, href]) => {
      const l = document.createElement('link')
      l.rel = 'alternate'
      l.hreflang = hl
      l.href = href
      document.head.appendChild(l)
    })
    zetMeta('name', 'description', g.description)
    zetMeta('name', 'robots', g.noindex ? 'noindex, follow' : null)
    zetMeta('property', 'og:type', g.type)
    zetMeta('property', 'og:title', g.title)
    zetMeta('property', 'og:description', g.description)
    zetMeta('property', 'og:image', g.image)
    zetMeta('property', 'og:url', g.canonical)
    zetMeta('name', 'twitter:title', g.title)
    zetMeta('name', 'twitter:description', g.description)
    zetMeta('name', 'twitter:image', g.image)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = g.canonical
    document.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove())
    g.jsonLd.forEach((o) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = ''
      s.textContent = JSON.stringify(o)
      document.head.appendChild(s)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleutel])
}
