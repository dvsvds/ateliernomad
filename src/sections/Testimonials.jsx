import { testimonials } from '../data/site.js'

export default function Testimonials() {
  return (
    <section className="section section--sand">
      <div className="container">
        <div className="section-head center mx-auto reveal">
          <span className="eyebrow">Wat klanten zeggen</span>
          <h2 className="h2">Geliefd in interieurs<br />door heel Europa</h2>
        </div>

        <div className="quote-grid">
          {testimonials.map((t, i) => (
            <figure className="quote reveal" data-delay={i + 1} key={i}>
              <div className="stars" aria-label="5 sterren">★★★★★</div>
              <blockquote><p>“{t.quote}”</p></blockquote>
              <figcaption className="quote__by">{t.by}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
