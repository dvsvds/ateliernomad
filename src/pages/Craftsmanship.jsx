import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import { craftSteps } from '../data/site.js'

export default function Craftsmanship() {
  useReveal()
  useSeo({
    title: 'Ambacht & Herkomst',
    description: 'Ontdek het Marokkaanse ambacht achter Atelier Nomad: de technieken, de regio’s en de makers achter elk handgemaakt stuk.',
  })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Ambacht &amp; Herkomst</span>
        <h1 className="display reveal" data-delay="1">De handen achter<br />elk stuk</h1>
        <p className="lead measure reveal" data-delay="2">
          Onze stukken komen uit Marrakech en het Atlasgebergte, waar technieken
          van generatie op generatie worden doorgegeven.
        </p>
      </section>

      <section className="section section--ink" style={{ marginTop: '1rem' }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Het proces</span>
            <h2 className="h2">Van grondstof tot interieur</h2>
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
        </div>
      </section>

      <section className="section">
        <div className="container split split--reverse">
          <div className="split__media reveal">
            <SmartImage src="/images/lifestyle/styling-1.jpg" alt="Marokkaans ambacht" label="Ambachtsdetail" />
          </div>
          <div className="reveal" data-delay="1">
            <span className="eyebrow">De technieken</span>
            <h2 className="h2">Geduld als materiaal</h2>
            <p>
              Een boucherouite-pouf wordt lus voor lus met de hand geknoopt. Wol wordt
              gewassen, gekaard en met de hand geweven. Hout wordt gevormd uit
              laurustak en touw met de hand gevlochten. Niets gaat snel — en dat is precies de bedoeling.
            </p>
            <ul className="pdp__list">
              <li><span>Wol</span><span style={{ marginLeft: 'auto' }}>Handgeknoopt &amp; geweven</span></li>
              <li><span>Hout</span><span style={{ marginLeft: 'auto' }}>Laurustak, met de hand gevormd</span></li>
              <li><span>Vlechtwerk</span><span style={{ marginLeft: 'auto' }}>Doumpalm &amp; touw</span></li>
              <li><span>Textiel</span><span style={{ marginLeft: 'auto' }}>Vintage, handgeknoopt &amp; uniek</span></li>
            </ul>
            <p style={{ marginTop: '1.5rem' }}>
              <Link to="/shop" className="btn btn--terracotta">Shop het ambacht <span className="btn__icon" aria-hidden>→</span></Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container cta-strip">
          <h2 className="display">Breng een stukje<br />Marokko thuis</h2>
          <p className="lead measure mx-auto" style={{ marginBottom: '2rem' }}>
            Ontdek stukken die warmte, textuur en verhaal toevoegen aan je interieur.
          </p>
          <Link to="/shop" className="btn btn--terracotta">Shop Collection <span className="btn__icon" aria-hidden>→</span></Link>
        </div>
      </section>
    </>
  )
}
