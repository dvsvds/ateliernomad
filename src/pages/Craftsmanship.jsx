import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import { craftSteps as craftStepsNl } from '../data/site.js'
import { craftStepsEn } from '../data/en/site.js'
import { useTaal } from '../i18n.js'

export default function Craftsmanship() {
  useReveal()
  const { en, t } = useTaal()
  const craftSteps = en ? craftStepsEn : craftStepsNl
  useSeo({
    title: t('Ambacht & Herkomst', 'Craft & Origin'),
    description: t('Ontdek het Marokkaanse ambacht achter Atelier Nomàd: de technieken, de regio’s en de makers achter elk handgemaakt stuk.',
      'Discover the Moroccan craft behind Atelier Nomàd: the techniques, the regions and the makers behind every handmade piece.'),
  })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{t('Ambacht & Herkomst', 'Craft & Origin')}</span>
        <h1 className="display reveal" data-delay="1">{t('De handen achter', 'The hands behind')}<br />{t('elk stuk', 'every piece')}</h1>
        <p className="lead measure reveal" data-delay="2">
          {t('Onze stukken komen uit Marrakech en het Atlasgebergte, waar technieken van generatie op generatie worden doorgegeven.',
            'Our pieces come from Marrakech and the Atlas Mountains, where techniques are passed down from generation to generation.')}
        </p>
      </section>

      <section className="section section--ink" style={{ marginTop: '1rem' }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t('Het proces', 'The process')}</span>
            <h2 className="h2">{t('Van grondstof tot interieur', 'From raw material to interior')}</h2>
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
            <SmartImage src="/images/lifestyle/styling-1.jpg" alt={t('Marokkaans ambacht', 'Moroccan craft')} label={t('Ambachtsdetail', 'Craft detail')} />
          </div>
          <div className="reveal" data-delay="1">
            <span className="eyebrow">{t('De technieken', 'The techniques')}</span>
            <h2 className="h2">{t('Geduld als materiaal', 'Patience as a material')}</h2>
            <p>
              {t('Een boucherouite-pouf wordt lus voor lus met de hand geknoopt. Wol wordt gewassen, gekaard en met de hand geweven. Hout wordt gevormd uit laurustak en touw met de hand gevlochten. Niets gaat snel — en dat is precies de bedoeling.',
                'A boucherouite pouf is knotted by hand, loop by loop. Wool is washed, carded and woven by hand. Wood is shaped from laurel branches and rope is braided by hand. Nothing is rushed — and that is exactly the point.')}
            </p>
            <ul className="pdp__list">
              <li><span>{t('Wol', 'Wool')}</span><span style={{ marginLeft: 'auto' }}>{t('Handgeknoopt & geweven', 'Hand-knotted & woven')}</span></li>
              <li><span>{t('Hout', 'Wood')}</span><span style={{ marginLeft: 'auto' }}>{t('Laurustak, met de hand gevormd', 'Laurel branch, shaped by hand')}</span></li>
              <li><span>{t('Vlechtwerk', 'Weaving')}</span><span style={{ marginLeft: 'auto' }}>{t('Doumpalm & touw', 'Doum palm & rope')}</span></li>
              <li><span>{t('Textiel', 'Textile')}</span><span style={{ marginLeft: 'auto' }}>{t('Vintage, handgeknoopt & uniek', 'Vintage, hand-knotted & unique')}</span></li>
            </ul>
            <p style={{ marginTop: '1.5rem' }}>
              <Link to="/shop" className="btn btn--terracotta">{t('Shop het ambacht', 'Shop the craft')} <span className="btn__icon" aria-hidden>→</span></Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container cta-strip">
          <h2 className="display">{t('Breng een stukje', 'Bring a piece of')}<br />{t('Marokko thuis', 'Morocco home')}</h2>
          <p className="lead measure mx-auto" style={{ marginBottom: '2rem' }}>
            {t('Ontdek stukken die warmte, textuur en verhaal toevoegen aan je interieur.', 'Discover pieces that add warmth, texture and story to your interior.')}
          </p>
          <Link to="/shop" className="btn btn--terracotta">{t('Shop de collectie', 'Shop the collection')} <span className="btn__icon" aria-hidden>→</span></Link>
        </div>
      </section>
    </>
  )
}
