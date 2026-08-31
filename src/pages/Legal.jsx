import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import { documenten } from '../data/legal.js'

/**
 * Eén opmaak voor de drie juridische pagina's. De inhoud staat in
 * src/data/legal.js, zodat je teksten kunt aanpassen zonder aan
 * componenten te komen.
 */
export default function Legal({ doc }) {
  useReveal()
  const d = documenten[doc]
  useSeo({ title: d.titel, description: d.intro })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{d.eyebrow}</span>
        <h1 className="display reveal" data-delay="1">{d.titel}</h1>
        <p className="lead measure reveal" data-delay="2">{d.intro}</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {d.secties.map((s, i) => (
            <div className="legal-block reveal" key={s.h} data-delay={(i % 3) + 1}>
              <h2 className="h3">{s.h}</h2>
              {(s.p || []).map((t) => <p key={t}>{t}</p>)}
              {s.lijst && (
                <ul className="legal-list">
                  {s.lijst.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
            </div>
          ))}

          <p className="notice reveal" style={{ marginTop: '2.5rem' }}>
            Nog een vraag hierover? <Link to="/contact" className="link-underline">Neem contact op</Link> —
            we antwoorden binnen één à twee werkdagen.
          </p>
        </div>
      </section>
    </>
  )
}
