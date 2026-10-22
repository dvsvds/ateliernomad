import { analytics } from '../data/site.js'

/* Google Analytics 4 met toestemming vooraf (AVG/GDPR).
   Zolang de bezoeker niet op "Accepteren" klikte, wordt gtag.js niet
   eens geladen — er gaat dan niets naar Google. */

const KEUZE_KEY = 'atelier-nomad-cookies'
const id = analytics.ga4Id

export const analyticsAan = Boolean(id)

export function leesKeuze() {
  try { return localStorage.getItem(KEUZE_KEY) } catch { return null }
}

let geladen = false

function laadGtag() {
  if (geladen || !id) return
  geladen = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  // Paginaweergaven sturen we zelf (zie trackPagina): bij een React-site
  // verandert de titel pas ná de navigatie.
  window.gtag('config', id, { send_page_view: false })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}

export function zetKeuze(keuze) {
  try { localStorage.setItem(KEUZE_KEY, keuze) } catch {}
  if (keuze === 'ja') {
    laadGtag()
    trackPagina()
  } else if (geladen) {
    // Toestemming ingetrokken: GA-cookies opruimen en de pagina herladen,
    // zodat gtag.js niet meer actief is.
    document.cookie.split(';').map((c) => c.split('=')[0].trim())
      .filter((n) => n === '_ga' || n.startsWith('_ga_'))
      .forEach((n) => {
        document.cookie = `${n}=; Max-Age=0; path=/; domain=.${location.hostname}`
        document.cookie = `${n}=; Max-Age=0; path=/`
      })
    location.reload()
  }
}

export function startAnalytics() {
  if (leesKeuze() === 'ja') laadGtag()
}

export function trackPagina() {
  if (!geladen) return
  window.gtag('event', 'page_view', {
    page_location: location.href,
    page_path: location.pathname + location.search,
    page_title: document.title,
  })
}

export function trackEvent(naam, params) {
  if (geladen) window.gtag('event', naam, params)
}
