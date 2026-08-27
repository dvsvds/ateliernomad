import SmartImage from '../components/SmartImage.jsx'
import { instagram, brand } from '../data/site.js'

export default function InstagramGallery() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center mx-auto reveal">
          <span className="eyebrow">{brand.instagramHandle}</span>
          <h2 className="h2">Volg het atelier</h2>
          <p className="lead measure mx-auto">
            Een blik achter de schermen, nieuwe stukken en interieurs van klanten.
          </p>
        </div>

        <div className="ig-grid reveal">
          {instagram.map((src, i) => (
            <a key={i} href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Bekijk op Instagram">
              <SmartImage src={src} alt={`Instagram ${i + 1}`} label="Instagram" sublabel="" />
            </a>
          ))}
        </div>

        <p className="center" style={{ marginTop: '2.5rem' }}>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="btn btn--ghost">
            Volg ons op Instagram <span className="btn__icon" aria-hidden>→</span>
          </a>
        </p>
      </div>
    </section>
  )
}
