import { Link } from './TaalLink.jsx'
import { brand } from '../data/site.js'
import PaymentMethods from './PaymentMethods.jsx'
import { analyticsAan } from '../lib/analytics.js'
import { useTaal } from '../i18n.js'
import { brandEn } from '../data/en/site.js'

export default function Footer() {
  const { en, t } = useTaal()
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
              {t('Luxe, handgemaakte Marokkaanse interieurstukken — geselecteerd voor tijdloze interieurs.', 'Handmade Moroccan interior pieces — selected for timeless interiors.')}
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <Link to="/shop">{t('Volledige collectie', 'Full collection')}</Link>
            <Link to="/poefs">{t('Marokkaanse poefs', 'Moroccan poufs')}</Link>
            <Link to="/kussens">{t('Berber kussens', 'Berber cushions')}</Link>
            <Link to="/shop?cat=geweven">{t('Geweven', 'Woven')}</Link>
          </div>

          <div>
            <h4>Atelier</h4>
            <Link to="/over">{t('Over Atelier Nomàd', 'About Atelier Nomàd')}</Link>
            <Link to="/ambacht">{t('Ambacht & Herkomst', 'Craft & Origin')}</Link>
            <Link to="/faq">{t('Veelgestelde vragen', 'FAQ')}</Link>
            <Link to="/gidsen">{t('Gidsen', 'Guides')}</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Contact</h4>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            {brand.phone && (
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}>{brand.phone}</a>
            )}
            <a href={brand.instagram} target="_blank" rel="noreferrer">Instagram {brand.instagramHandle}</a>
            <span style={{ color: 'rgba(250,246,239,0.6)', fontSize: '0.9rem', display: 'block', paddingTop: '0.4rem' }}>{en ? brandEn.city : brand.city}</span>
          </div>
        </div>

        <div className="footer__pay">
          <span className="footer__pay-label">{t('Veilig betalen met', 'Pay securely with')}</span>
          <PaymentMethods variant="dark" />
        </div>

        <div className="footer__bottom">
          <small>© {new Date().getFullYear()} Atelier Nomàd. {t('Met de hand gemaakt in Marokko.', 'Handmade in Morocco.')}</small>
          <small className="footer__legal">
            <Link to="/voorwaarden">{t('Algemene voorwaarden', 'Terms & conditions')}</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/verzending">{t('Verzending & retour', 'Shipping & returns')}</Link>
            {analyticsAan && (
              <button type="button" className="footer__cookies" onClick={() => window.dispatchEvent(new Event('cookies-openen'))}>{t('Cookie-instellingen', 'Cookie settings')}</button>
            )}
          </small>
          <small>{t('Website door', 'Website by')} <a href="https://web-makers.be" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>WebMakers</a></small>
        </div>
      </div>
    </footer>
  )
}
