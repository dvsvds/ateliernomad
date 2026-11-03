import { Link } from '../components/TaalLink.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { useTaal } from '../i18n.js'

export default function AboutPreview() {
  const { t } = useTaal()
  return (
    <section className="section section--alt">
      <div className="container split">
        <div className="split__media reveal">
          <SmartImage src="/images/lifestyle/styling-1.jpg" alt={t('Atelier Nomàd sfeer', 'Atelier Nomàd atmosphere')} label={t('Sfeerbeeld', 'Atmosphere')} />
        </div>
        <div className="reveal" data-delay="1">
          <span className="eyebrow">{t('Over Atelier Nomàd', 'About Atelier Nomàd')}</span>
          <h2 className="h2">{t('Stukken met een ziel,', 'Pieces with a soul,')}<br />{t('gekozen om te blijven', 'chosen to last')}</h2>
          <p className="lead">
            {t('Atelier Nomàd ontstond uit een liefde voor het Marokkaanse ambacht en de wens om eerlijke, tijdloze stukken een plek te geven in moderne interieurs.',
              'Atelier Nomàd grew out of a love for Moroccan craft and the wish to give honest, timeless pieces a place in modern interiors.')}
          </p>
          <p>
            {t('We werken rechtstreeks samen met familieateliers en coöperatieven in Marrakech en het Atlasgebergte. Geen massaproductie — alleen stukken die met aandacht, geduld en vakmanschap zijn gemaakt.',
              'We work directly with family workshops and cooperatives in Marrakech and the Atlas Mountains. No mass production — only pieces made with care, patience and craftsmanship.')}
          </p>
          <div className="stat-row">
            <div className="stat"><b>2018</b><span>{t('Opgericht', 'Founded')}</span></div>
            <div className="stat"><b>40+</b><span>{t('Makers', 'Makers')}</span></div>
            <div className="stat"><b>100%</b><span>{t('Eerlijk handwerk', 'Honest handwork')}</span></div>
          </div>
          <p style={{ marginTop: '2rem' }}>
            <Link to="/over" className="btn btn--ghost">{t('Lees ons verhaal', 'Read our story')} <span className="btn__icon" aria-hidden>→</span></Link>
          </p>
        </div>
      </div>
    </section>
  )
}
