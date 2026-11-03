import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { useTaal } from '../i18n.js'

export default function About() {
  useReveal()
  const { t } = useTaal()
  useSeo({
    title: t('Over Atelier Nomàd', 'About Atelier Nomàd'),
    description: t('Het verhaal achter Atelier Nomàd — een liefde voor Marokkaans ambacht, eerlijke samenwerking en tijdloze interieurstukken.',
      'The story behind Atelier Nomàd — a love for Moroccan craft, fair collaboration and timeless interior pieces.'),
  })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{t('Over Atelier Nomàd', 'About Atelier Nomàd')}</span>
        <h1 className="display reveal" data-delay="1">{t('Een liefdesbrief aan', 'A love letter to')}<br />{t('het Marokkaanse ambacht', 'Moroccan craft')}</h1>
        <p className="lead measure reveal" data-delay="2">
          {t('Wij geloven dat een interieur pas echt tot leven komt met stukken die een verhaal dragen — gemaakt door mensenhanden, om generaties mee te gaan.',
            'We believe an interior truly comes to life with pieces that carry a story — made by human hands, to last for generations.')}
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="split__media reveal">
            <SmartImage src="/images/brand/hero.jpg" alt="Atelier Nomàd" label="Atelier Nomàd" />
          </div>
          <div className="reveal" data-delay="1">
            <h2 className="h2">{t('Hoe het begon', 'How it began')}</h2>
            <p>
              {t('Atelier Nomàd ontstond uit een reis door de medina’s van Marrakech, waar de geur van leer, de kleuren van wol en het geduldige tikken van weefgetouwen een blijvende indruk achterlieten. Wat begon als bewondering, groeide uit tot een merk met een missie: dit ambacht eerlijk delen met interieurliefhebbers in Europa.',
                'Atelier Nomàd began with a journey through the medinas of Marrakech, where the smell of leather, the colours of wool and the patient tapping of looms left a lasting impression. What started as admiration grew into a brand with a mission: to share this craft honestly with interior lovers across Europe.')}
            </p>
            <p>
              {t('We kopen niet in bulk. We kiezen. Elk stuk wordt persoonlijk geselecteerd — vaak rechtstreeks bij de maker — en getoetst aan één vraag: zou dit een plek verdienen in een interieur dat je generaties wilt doorgeven?',
                'We don’t buy in bulk. We choose. Every piece is selected in person — often directly from the maker — and measured against one question: would it deserve a place in an interior you want to pass on for generations?')}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head center mx-auto reveal">
            <span className="eyebrow">{t('Waar we voor staan', 'What we stand for')}</span>
            <h2 className="h2">{t('Onze waarden', 'Our values')}</h2>
          </div>
          <div className="steps">
            <div className="step reveal" style={{ borderTopColor: 'var(--line)' }}>
              <div className="step__num" style={{ color: 'var(--terracotta)' }}>{t('Eerlijk', 'Fair')}</div>
              <h3 className="h3">{t('Directe samenwerking', 'Direct collaboration')}</h3>
              <p>{t('We werken rechtstreeks met makers en coöperatieven, voor eerlijke prijzen en blijvende relaties.', 'We work directly with makers and cooperatives, for fair prices and lasting relationships.')}</p>
            </div>
            <div className="step reveal" data-delay="1" style={{ borderTopColor: 'var(--line)' }}>
              <div className="step__num" style={{ color: 'var(--terracotta)' }}>{t('Tijdloos', 'Timeless')}</div>
              <h3 className="h3">{t('Gemaakt om te blijven', 'Made to last')}</h3>
              <p>{t('Geen trends die vervliegen — alleen stukken die mooier worden met de jaren.', 'No passing trends — only pieces that grow more beautiful with the years.')}</p>
            </div>
            <div className="step reveal" data-delay="2" style={{ borderTopColor: 'var(--line)' }}>
              <div className="step__num" style={{ color: 'var(--terracotta)' }}>{t('Uniek', 'Unique')}</div>
              <h3 className="h3">{t('Eén van één', 'One of one')}</h3>
              <p>{t('Handwerk betekent karakter. Elk stuk draagt de signatuur van zijn maker.', 'Handwork means character. Every piece carries its maker’s signature.')}</p>
            </div>
          </div>
          <p className="center" style={{ marginTop: '3rem' }}>
            <Link to="/ambacht" className="btn btn--ghost">{t('Ontdek het ambacht', 'Discover the craft')} <span className="btn__icon" aria-hidden>→</span></Link>
          </p>
        </div>
      </section>

      <section className="section"><Newsletter /></section>
    </>
  )
}
