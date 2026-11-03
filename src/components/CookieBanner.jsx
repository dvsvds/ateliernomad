import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from './TaalLink.jsx'
import { analyticsAan, leesKeuze, zetKeuze, trackPagina } from '../lib/analytics.js'
import { useTaal } from '../i18n.js'

/* Vraagt toestemming voor Google Analytics en telt paginaweergaven.
   Verschijnt alleen als er een Measurement ID ingevuld is (site.js) en
   de bezoeker nog niet koos. Via de footerlink "Cookie-instellingen"
   (die een 'cookies-openen'-event stuurt) komt hij terug. */
export default function CookieBanner() {
  const [zichtbaar, setZichtbaar] = useState(false)
  const { pathname, search } = useLocation()
  const { t } = useTaal()

  // Pas na het laden bepalen: de vooraf gerenderde HTML heeft geen banner.
  useEffect(() => {
    if (!analyticsAan) return
    if (!leesKeuze()) setZichtbaar(true)
    const open = () => setZichtbaar(true)
    window.addEventListener('cookies-openen', open)
    return () => window.removeEventListener('cookies-openen', open)
  }, [])

  // Staat na de pagina's in de boom, dus loopt nadat useSeo de titel zette.
  useEffect(() => { trackPagina() }, [pathname, search])

  if (!zichtbaar) return null

  const kies = (keuze) => { setZichtbaar(false); zetKeuze(keuze) }

  return (
    <div className="cookiebanner" role="dialog" aria-label="Cookies" aria-live="polite">
      <p>
        {t('Mogen we anoniem meten hoe je de site gebruikt? Zo weten we wat beter kan. Geen advertenties, geen doorverkoop.',
          'May we measure anonymously how you use the site? It helps us improve it. No ads, no reselling.')}{' '}
        <Link to="/privacy">{t('Meer info', 'More info')}</Link>
      </p>
      <div className="cookiebanner__knoppen">
        <button className="btn btn--ghost" onClick={() => kies('nee')}>{t('Weigeren', 'Decline')}</button>
        <button className="btn" onClick={() => kies('ja')}>{t('Accepteren', 'Accept')}</button>
      </div>
    </div>
  )
}
