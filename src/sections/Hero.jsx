import { Link } from '../components/TaalLink.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { heroImages } from '../data/site.js'
import { useTaal } from '../i18n.js'

export default function Hero() {
  const { t } = useTaal()
  return (
    <section className="hero container">
      <div className="hero__grid">
        <div>
          {/* De h1 is de zoekterm (klein, als eyebrow); de grote tagline is
              beeldtaal en daarom geen kop. */}
          <h1 className="eyebrow reveal">{t('Marokkaanse poefs & Berber kussens', 'Moroccan poufs & Berber cushions')}</h1>
          <p className="display hero__title reveal" data-delay="1">
            Handcrafted<br /><span className="serif-italic">Moroccan</span> Living
          </p>
          <p className="lead hero__sub reveal" data-delay="2">
            {t('Vintage Berber poefs en handgeweven wollen kussens, met de hand gemaakt in Marokko. Elk stuk bestaat maar één keer.',
              'Vintage Berber poufs and hand-woven wool cushions, handmade in Morocco. Every piece exists only once.')}
          </p>
          <div className="hero__cta reveal" data-delay="3">
            <Link to="/shop" className="btn btn--terracotta">
              {t('Shop de collectie', 'Shop the collection')} <span className="btn__icon" aria-hidden>&#8594;</span>
            </Link>
            <Link to="/over" className="btn btn--ghost">
              {t('Ons verhaal', 'Our story')} <span className="btn__icon" aria-hidden>&#8594;</span>
            </Link>
          </div>

          <div className="hero__meta reveal" data-delay="4">
            <div><b>100%</b><span>{t('Handgemaakt', 'Handmade')}</span></div>
            <div><b>{t('Uniek', 'Unique')}</b><span>{t('Geen twee gelijk', 'No two alike')}</span></div>
            <div><b>EU</b><span>{t('Verzending', 'Shipping')}</span></div>
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
              aria-label={t('Marokkaanse poefs en kussens in een licht interieur', 'Moroccan poufs and cushions in a light interior')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="frame-sub" style={{ overflow: 'hidden' }}>
            <SmartImage src={heroImages.sub} alt={t('Marokkaanse Berber poef', 'Moroccan Berber pouf')} label={t('Berber poef', 'Berber pouf')} sublabel="" />
          </div>
          <span className="hero__badge">{t('Vintage & uniek', 'Vintage & unique')}</span>
        </div>
      </div>
    </section>
  )
}
