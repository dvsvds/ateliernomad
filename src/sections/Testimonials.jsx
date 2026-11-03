import { testimonials } from '../data/site.js'
import { useTaal } from '../i18n.js'

export default function Testimonials() {
  const { t: tt } = useTaal()
  return (
    <section className="section section--sand">
      <div className="container">
        <div className="section-head center mx-auto reveal">
          <span className="eyebrow">{tt('Wat klanten zeggen', 'What customers say')}</span>
          <h2 className="h2">{tt('Geliefd in interieurs', 'Loved in interiors')}<br />{tt('door heel Europa', 'across Europe')}</h2>
        </div>

        <div className="quote-grid">
          {testimonials.map((t, i) => (
            <figure className="quote reveal" data-delay={i + 1} key={i}>
              <div className="stars" aria-label={tt('5 sterren', '5 stars')}>★★★★★</div>
              <blockquote><p>“{t.quote}”</p></blockquote>
              <figcaption className="quote__by">{t.by}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
