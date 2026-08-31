import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/over', label: 'Over' },
  { to: '/ambacht', label: 'Ambacht' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const { count, open } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

        <nav className="nav__links" aria-label="Hoofdmenu">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="nav__cart" onClick={open} aria-label="Winkelmand openen">
            Mand
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

      <nav className={`nav__mobile ${menuOpen ? 'open' : ''}`} aria-label="Mobiel menu">
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/over" onClick={() => setMenuOpen(false)}>Over</Link>
        <Link to="/ambacht" onClick={() => setMenuOpen(false)}>Ambacht & Herkomst</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
      </nav>
    </header>
  )
}
