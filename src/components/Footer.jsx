import { Link } from 'react-router-dom'
import { brand } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              Atelier Nomàd
              <small>Handcrafted Moroccan Living</small>
            </div>
            <p style={{ maxWidth: '34ch', marginTop: '1.2rem', color: 'rgba(250,246,239,0.7)' }}>
              Luxe, handgemaakte Marokkaanse interieurstukken — geselecteerd voor tijdloze interieurs.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <Link to="/shop">Volledige collectie</Link>
            <Link to="/shop?cat=poufs">Vloerpoufs</Link>
            <Link to="/shop?cat=interieur">Interieur</Link>
            <Link to="/shop?cat=geweven">Geweven</Link>
          </div>

          <div>
            <h4>Atelier</h4>
            <Link to="/over">Over Atelier Nomàd</Link>
            <Link to="/ambacht">Ambacht & Herkomst</Link>
            <Link to="/faq">Veelgestelde vragen</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Contact</h4>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            {brand.phone && (
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}>{brand.phone}</a>
            )}
            <a href={brand.instagram} target="_blank" rel="noreferrer">Instagram {brand.instagramHandle}</a>
            <span style={{ color: 'rgba(250,246,239,0.6)', fontSize: '0.9rem', display: 'block', paddingTop: '0.4rem' }}>{brand.city}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <small>© {new Date().getFullYear()} Atelier Nomàd. Met de hand gemaakt in Marokko.</small>
          <small className="footer__legal">
            <Link to="/voorwaarden">Algemene voorwaarden</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/verzending">Verzending &amp; retour</Link>
          </small>
          <small>Website door <a href="https://web-makers.be" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>WebMakers</a></small>
        </div>
      </div>
    </footer>
  )
}
