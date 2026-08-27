import SmartImage from '../components/SmartImage.jsx'
import { lifestyle } from '../data/site.js'

export default function Lifestyle() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center mx-auto reveal">
          <span className="eyebrow">Interieurinspiratie</span>
          <h2 className="h2">Leef met textuur</h2>
          <p className="lead measure mx-auto">
            Warme aardetinten, natuurlijke materialen en stukken die je elke dag wilt aanraken.
          </p>
        </div>

        <div className="editorial-grid">
          <figure className="e-tall reveal">
            <SmartImage src={lifestyle[0].src} alt={lifestyle[0].label} label={lifestyle[0].label} />
          </figure>
          <figure className="e-wide reveal" data-delay="1">
            <SmartImage src={lifestyle[1].src} alt={lifestyle[1].label} label={lifestyle[1].label} />
          </figure>
          <figure className="e-half reveal" data-delay="1">
            <SmartImage src={lifestyle[2].src} alt={lifestyle[2].label} label={lifestyle[2].label} />
          </figure>
          <figure className="e-half reveal" data-delay="2">
            <SmartImage src={lifestyle[3].src} alt={lifestyle[3].label} label={lifestyle[3].label} />
          </figure>
        </div>
      </div>
    </section>
  )
}
