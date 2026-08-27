import { Link } from 'react-router-dom'
import { craftSteps } from '../data/site.js'

export default function CraftsmanshipSection() {
  return (
    <section className="section section--ink">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Ambacht &amp; Herkomst</span>
          <h2 className="h2">Van de medina<br />tot jouw interieur</h2>
          <p className="lead" style={{ color: 'rgba(250,246,239,0.78)' }}>
            Achter elk stuk schuilt een paar handen, een techniek en een verhaal.
            Zo komt jouw stuk tot stand.
          </p>
        </div>

        <div className="steps">
          {craftSteps.map((s, i) => (
            <div className="step reveal" data-delay={i + 1} key={s.num}>
              <div className="step__num">{s.num}</div>
              <h3 className="h3">{s.title}</h3>
              <p style={{ color: 'rgba(250,246,239,0.74)' }}>{s.text}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '3rem' }} className="reveal">
          <Link to="/ambacht" className="btn btn--light">Ontdek het ambacht <span className="btn__icon" aria-hidden>→</span></Link>
        </p>
      </div>
    </section>
  )
}
