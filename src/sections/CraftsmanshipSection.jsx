import { Link } from '../components/TaalLink.jsx'
import { craftSteps } from '../data/site.js'
import { craftStepsEn } from '../data/en/site.js'
import { useTaal } from '../i18n.js'

export default function CraftsmanshipSection() {
  const { en, t } = useTaal()
  return (
    <section className="section section--ink">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t('Ambacht & Herkomst', 'Craft & Origin')}</span>
          <h2 className="h2">{t('Van de medina', 'From the medina')}<br />{t('tot jouw interieur', 'to your interior')}</h2>
          <p className="lead" style={{ color: 'rgba(250,246,239,0.78)' }}>
            {t('Achter elk stuk schuilt een paar handen, een techniek en een verhaal. Zo komt jouw stuk tot stand.',
              'Behind every piece are a pair of hands, a technique and a story. This is how your piece comes to be.')}
          </p>
        </div>

        <div className="steps">
          {(en ? craftStepsEn : craftSteps).map((s, i) => (
            <div className="step reveal" data-delay={i + 1} key={s.num}>
              <div className="step__num">{s.num}</div>
              <h3 className="h3">{s.title}</h3>
              <p style={{ color: 'rgba(250,246,239,0.74)' }}>{s.text}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '3rem' }} className="reveal">
          <Link to="/ambacht" className="btn btn--light">{t('Ontdek het ambacht', 'Discover the craft')} <span className="btn__icon" aria-hidden>→</span></Link>
        </p>
      </div>
    </section>
  )
}
