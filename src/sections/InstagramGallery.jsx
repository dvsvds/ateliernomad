import SmartImage from '../components/SmartImage.jsx'
import { instagram, brand } from '../data/site.js'
import { useTaal } from '../i18n.js'

export default function InstagramGallery() {
  const { t } = useTaal()
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center mx-auto reveal">
          <span className="eyebrow">{brand.instagramHandle}</span>
          <h2 className="h2">{t('Volg het atelier', 'Follow the atelier')}</h2>
          <p className="lead measure mx-auto">
            {t('Een blik achter de schermen, nieuwe stukken en interieurs van klanten.', 'A look behind the scenes, new pieces and customers’ interiors.')}
          </p>
        </div>

        <div className="ig-grid reveal">
          {instagram.map((src, i) => (
            <a key={i} href={brand.instagram} target="_blank" rel="noreferrer" aria-label={t('Bekijk op Instagram', 'View on Instagram')}>
              <SmartImage src={src} alt={`Instagram ${i + 1}`} label="Instagram" sublabel="" />
            </a>
          ))}
        </div>

        <p className="center" style={{ marginTop: '2.5rem' }}>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="btn btn--ghost">
            {t('Volg ons op Instagram', 'Follow us on Instagram')} <span className="btn__icon" aria-hidden>→</span>
          </a>
        </p>
      </div>
    </section>
  )
}
