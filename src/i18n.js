import { useLocation } from 'react-router-dom'

/* ============================================================
   TALEN — Nederlands (standaard) en Engels (onder /en)
   ------------------------------------------------------------
   Elke Nederlandse pagina heeft een Engelse tegenhanger. Links in
   de code schrijf je altijd met het Nederlandse pad (to="/over");
   TaalLink zet dat op een Engelse pagina vanzelf om naar /en/about.
   ============================================================ */

/* Nederlands pad → Engels pad. Producten (/product/x) en
   queryparameters gaan automatisch mee. */
export const PADEN = {
  '/': '/en',
  '/shop': '/en/shop',
  '/poefs': '/en/poufs',
  '/kussens': '/en/cushions',
  '/gidsen': '/en/guides',
  '/over': '/en/about',
  '/ambacht': '/en/craftsmanship',
  '/contact': '/en/contact',
  '/faq': '/en/faq',
  '/voorwaarden': '/en/terms',
  '/privacy': '/en/privacy',
  '/verzending': '/en/shipping',
  '/bedankt': '/en/thank-you',
  '/poef-vullen': '/en/how-to-fill-a-pouf',
  '/berber-poef': '/en/berber-pouf',
  '/berber-poef-of-leren-poef': '/en/berber-pouf-vs-leather-pouf',
}
const TERUG = Object.fromEntries(Object.entries(PADEN).map(([nl, en]) => [en, nl]))

export const taalVan = (pathname) => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'nl')

/** Nederlands pad (eventueel met ?query of #anker) naar de taal `taal`. */
export function lokaal(to, taal) {
  if (taal !== 'en' || typeof to !== 'string' || !to.startsWith('/') || taalVan(to) === 'en') return to
  const [, pad, rest] = to.match(/^([^?#]*)(.*)$/)
  if (PADEN[pad]) return PADEN[pad] + rest
  if (pad.startsWith('/product/')) return '/en' + pad + rest
  return to
}

/** De tegenhanger van een pad in de andere taal (voor hreflang en de taalknop). */
export function tegenhanger(pathname) {
  const pad = pathname.replace(/\/+$/, '') || '/'
  if (taalVan(pad) === 'en') {
    if (TERUG[pad]) return TERUG[pad]
    if (pad.startsWith('/en/product/')) return pad.slice(3)
    return null
  }
  return lokaal(pad, 'en') !== pad || pad === '/' ? lokaal(pad, 'en') : null
}

/** Taal van de huidige pagina, plus `t(nl, en)` om een tekst te kiezen. */
export function useTaal() {
  const { pathname } = useLocation()
  const taal = taalVan(pathname)
  return { taal, en: taal === 'en', t: (nl, en) => (taal === 'en' ? en : nl), lp: (to) => lokaal(to, taal) }
}
