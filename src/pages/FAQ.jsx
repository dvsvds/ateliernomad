import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import { faqs } from '../data/site.js'

export default function FAQ() {
  useReveal()
  useSeo({
    title: 'Veelgestelde vragen',
    description: 'Antwoorden op veelgestelde vragen over Atelier Nomàd: handwerk, levering, verzending, retour en onderhoud.',
  })
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">FAQ</span>
        <h1 className="display reveal" data-delay="1">Veelgestelde vragen</h1>
        <p className="lead measure reveal" data-delay="2">
          Niet gevonden wat je zoekt? <Link to="/contact" className="link-underline">Neem gerust contact op.</Link>
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="accordion reveal">
            {faqs.map((f, i) => (
              <div className={`acc-item ${open === i ? 'open' : ''}`} key={i}>
                <button className="acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}<span className="plus" aria-hidden>+</span>
                </button>
                <div className="acc-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
