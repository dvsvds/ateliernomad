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
          {/* Het merkbeeld als trage camerabeweging. Geen gegenereerde
              animatie: elk frame is een uitsnede uit dezelfde foto, dus er
              kan niets vervormen. Het posterframe is beeld nummer één, zodat
              er geen sprong zit tussen stilstand en afspelen.
              Opnieuw maken? Zie IMAGES_GUIDE.md. */}
          <div className="frame-main" style={{ overflow: 'hidden', borderRadius: 'var(--radius-xl)', aspectRatio: '4 / 5', background: 'var(--sand)' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/brand/hero-poster.jpg"
              aria-label="Marokkaanse vloerpoufs en kussens in een licht interieur"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
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
