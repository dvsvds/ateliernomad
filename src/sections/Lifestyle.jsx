import SmartImage from '../components/SmartImage.jsx'
import { lifestyle as lifestyleNl } from '../data/site.js'
import { lifestyleLabelsEn } from '../data/en/site.js'
import { useTaal } from '../i18n.js'

export default function Lifestyle() {
  const { en, t } = useTaal()
  const lifestyle = en ? lifestyleNl.map((l) => ({ ...l, label: lifestyleLabelsEn[l.src] || l.label })) : lifestyleNl
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center mx-auto reveal">
          <span className="eyebrow">{t('Interieurinspiratie', 'Interior inspiration')}</span>
          <h2 className="h2">{t('Leef met textuur', 'Live with texture')}</h2>
          <p className="lead measure mx-auto">
            {t('Warme aardetinten, natuurlijke materialen en stukken die je elke dag wilt aanraken.', 'Warm earth tones, natural materials and pieces you want to touch every day.')}
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
