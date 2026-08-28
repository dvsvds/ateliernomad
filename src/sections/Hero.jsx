import { Link } from 'react-router-dom'
import SmartImage from '../components/SmartImage.jsx'
import { heroImages } from '../data/site.js'

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero__grid">
        <div>
          <span className="eyebrow reveal">Handgemaakt in Marokko</span>
          <h1 className="display hero__title reveal" data-delay="1">
            Handcrafted<br /><span className="serif-italic">Moroccan</span> Living
          </h1>
          <p className="lead hero__sub reveal" data-delay="2">
            Authentieke interieurstukken, met de hand gemaakt met ziel en
            geselecteerd voor tijdloze interieurs.
          </p>
          <div className="hero__cta reveal" data-delay="3">
            <Link to="/shop" className="btn btn--terracotta">
              Shop Collection <span className="btn__icon" aria-hidden>&#8594;</span>
            </Link>
            <Link to="/over" className="btn btn--ghost">
              Discover Our Story <span className="btn__icon" aria-hidden>&#8594;</span>
            </Link>
          </div>

          <div className="hero__meta reveal" data-delay="4">
            <div><b>100%</b><span>Handgemaakt</span></div>
            <div><b>Uniek</b><span>Geen twee gelijk</span></div>
            <div><b>EU</b><span>Verzending</span></div>
          </div>
        </div>

        <div className="hero__visual reveal" data-delay="2">
          {/* Merkbeeld als hero. Wil je hier weer bewegend beeld, zie
              bronbeelden/hero-video.mp4 en git-historie voor de video-variant. */}
          <div className="frame-main" style={{ overflow: 'hidden', borderRadius: 'var(--radius-xl)', aspectRatio: '4 / 5', background: 'var(--sand)' }}>
            <SmartImage
              src={heroImages.main}
              alt="Marokkaanse vloerpoufs en kussens in een licht interieur"
              label="Atelier Nomad"
              sublabel=""
              loading="eager"
            />
          </div>

          <div className="frame-sub" style={{ overflow: 'hidden' }}>
            <SmartImage src={heroImages.sub} alt="Marokkaanse vloerpouf" label="Vloerpouf" sublabel="" />
          </div>
          <span className="hero__badge">Vintage &amp; uniek</span>
        </div>
      </div>
    </section>
  )
}
