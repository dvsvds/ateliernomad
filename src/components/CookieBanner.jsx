import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { analyticsAan, leesKeuze, zetKeuze, trackPagina } from '../lib/analytics.js'

/* Vraagt toestemming voor Google Analytics en telt paginaweergaven.
   Verschijnt alleen als er een Measurement ID ingevuld is (site.js) en
   de bezoeker nog niet koos. Via de footerlink "Cookie-instellingen"
   (die een 'cookies-openen'-event stuurt) komt hij terug. */
export default function CookieBanner() {
  const [zichtbaar, setZichtbaar] = useState(false)
  const { pathname, search } = useLocation()

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
        Mogen we anoniem meten hoe je de site gebruikt? Zo weten we wat beter kan.
        Geen advertenties, geen doorverkoop. <Link to="/privacy">Meer info</Link>
      </p>
      <div className="cookiebanner__knoppen">
        <button className="btn btn--ghost" onClick={() => kies('nee')}>Weigeren</button>
        <button className="btn" onClick={() => kies('ja')}>Accepteren</button>
      </div>
    </div>
  )
}
