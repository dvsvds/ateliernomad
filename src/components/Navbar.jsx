import { useEffect, useState } from 'react'
import { Link as RRLink, useLocation } from 'react-router-dom'
import { Link, NavLink } from './TaalLink.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useTaal, tegenhanger } from '../i18n.js'

const links = [
  { to: '/shop', label: 'Shop', en: 'Shop' },
  { to: '/over', label: 'Over', en: 'About' },
  { to: '/ambacht', label: 'Ambacht', en: 'Craft' },
  { to: '/contact', label: 'Contact', en: 'Contact' },
  { to: '/faq', label: 'FAQ', en: 'FAQ' },
]

export default function Navbar() {
  const { count, open } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, search } = useLocation()
  const { en, t } = useTaal()
  // Taalknop: naar dezelfde pagina in de andere taal (of de homepage).
  const ander = (tegenhanger(pathname) || (en ? '/' : '/en')) + search

  // Ook dicht bij de terugknop of een link buiten het menu; anders bleef
  // het overlay-menu over de nieuwe pagina staan met een geblokkeerde scroll.
  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${menuOpen ? 'nav--menu-open' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setMenuOpen(false)}>
          Atelier Nomàd
          <small>Handcrafted Moroccan Living</small>
        </Link>

        <nav className="nav__links" aria-label={t('Hoofdmenu', 'Main menu')}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>
              {en ? l.en : l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <RRLink to={ander} className="nav__taal" hrefLang={en ? 'nl' : 'en'} aria-label={t('English version', 'Nederlandse versie')}>
            {en ? 'NL' : 'EN'}
          </RRLink>
          <button className="nav__cart" onClick={open} aria-label={t('Winkelwagen openen', 'Open cart')}>
            {t('Winkelwagen', 'Cart')}
            {count > 0 && <span className="nav__cart-count">{count}</span>}
          </button>
          <button
            className={`nav__toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav className={`nav__mobile ${menuOpen ? 'open' : ''}`} aria-label={t('Mobiel menu', 'Mobile menu')}>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/over" onClick={() => setMenuOpen(false)}>{t('Over', 'About')}</Link>
        <Link to="/ambacht" onClick={() => setMenuOpen(false)}>{t('Ambacht & Herkomst', 'Craft & Origin')}</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
      </nav>
    </header>
  )
}
