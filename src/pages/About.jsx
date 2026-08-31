import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import Newsletter from '../components/Newsletter.jsx'

export default function About() {
  useReveal()
  useSeo({
    title: 'Over Atelier Nomàd',
    description: 'Het verhaal achter Atelier Nomàd — een liefde voor Marokkaans ambacht, eerlijke samenwerking en tijdloze interieurstukken.',
  })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Over Atelier Nomàd</span>
        <h1 className="display reveal" data-delay="1">Een liefdesbrief aan<br />het Marokkaanse ambacht</h1>
        <p className="lead measure reveal" data-delay="2">
          Wij geloven dat een interieur pas echt tot leven komt met stukken die een
          verhaal dragen — gemaakt door mensenhanden, om generaties mee te gaan.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="split__media reveal">
            <SmartImage src="/images/brand/hero.jpg" alt="Atelier Nomàd" label="Atelier Nomàd" />
          </div>
          <div className="reveal" data-delay="1">
            <h2 className="h2">Hoe het begon</h2>
            <p>
              Atelier Nomàd ontstond uit een reis door de medina’s van Marrakech, waar
              de geur van leer, de kleuren van wol en het geduldige tikken van weefgetouwen
              een blijvende indruk achterlieten. Wat begon als bewondering, groeide uit tot
              een merk met een missie: dit ambacht eerlijk delen met interieurliefhebbers in Europa.
            </p>
            <p>
              We kopen niet in bulk. We kiezen. Elk stuk wordt persoonlijk geselecteerd —
              vaak rechtstreeks bij de maker — en getoetst aan één vraag: zou dit een plek
              verdienen in een interieur dat je generaties wilt doorgeven?
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head center mx-auto reveal">
            <span className="eyebrow">Waar we voor staan</span>
            <h2 className="h2">Onze waarden</h2>
          </div>
          <div className="steps">
            <div className="step reveal" style={{ borderTopColor: 'var(--line)' }}>
              <div className="step__num" style={{ color: 'var(--terracotta)' }}>Eerlijk</div>
              <h3 className="h3">Directe samenwerking</h3>
              <p>We werken rechtstreeks met makers en coöperatieven, voor eerlijke prijzen en blijvende relaties.</p>
            </div>
            <div className="step reveal" data-delay="1" style={{ borderTopColor: 'var(--line)' }}>
              <div className="step__num" style={{ color: 'var(--terracotta)' }}>Tijdloos</div>
              <h3 className="h3">Gemaakt om te blijven</h3>
              <p>Geen trends die vervliegen — alleen stukken die mooier worden met de jaren.</p>
            </div>
            <div className="step reveal" data-delay="2" style={{ borderTopColor: 'var(--line)' }}>
              <div className="step__num" style={{ color: 'var(--terracotta)' }}>Uniek</div>
              <h3 className="h3">Eén van één</h3>
              <p>Handwerk betekent karakter. Elk stuk draagt de signatuur van zijn maker.</p>
            </div>
          </div>
          <p className="center" style={{ marginTop: '3rem' }}>
            <Link to="/ambacht" className="btn btn--ghost">Ontdek het ambacht <span className="btn__icon" aria-hidden>→</span></Link>
          </p>
        </div>
      </section>

      <section className="section"><Newsletter /></section>
    </>
  )
}
