import { Link } from 'react-router-dom'
import SmartImage from '../components/SmartImage.jsx'

export default function AboutPreview() {
  return (
    <section className="section section--alt">
      <div className="container split">
        <div className="split__media reveal">
          <SmartImage src="/images/lifestyle/styling-1.jpg" alt="Atelier Nomàd sfeer" label="Sfeerbeeld" />
        </div>
        <div className="reveal" data-delay="1">
          <span className="eyebrow">Over Atelier Nomàd</span>
          <h2 className="h2">Stukken met een ziel,<br />gekozen om te blijven</h2>
          <p className="lead">
            Atelier Nomàd ontstond uit een liefde voor het Marokkaanse ambacht en de
            wens om eerlijke, tijdloze stukken een plek te geven in moderne interieurs.
          </p>
          <p>
            We werken rechtstreeks samen met familieateliers en coöperatieven in
            Marrakech en het Atlasgebergte. Geen massaproductie — alleen stukken die
            met aandacht, geduld en vakmanschap zijn gemaakt.
          </p>
          <div className="stat-row">
            <div className="stat"><b>2018</b><span>Opgericht</span></div>
            <div className="stat"><b>40+</b><span>Makers</span></div>
            <div className="stat"><b>100%</b><span>Eerlijk handwerk</span></div>
          </div>
          <p style={{ marginTop: '2rem' }}>
            <Link to="/over" className="btn btn--ghost">Lees ons verhaal <span className="btn__icon" aria-hidden>→</span></Link>
          </p>
        </div>
      </div>
    </section>
  )
}
