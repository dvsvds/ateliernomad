import { useState } from 'react'
import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import { faqs as faqsNl } from '../data/site.js'
import { faqsEn } from '../data/en/site.js'
import { useTaal } from '../i18n.js'

export default function FAQ() {
  useReveal()
  const { en, t } = useTaal()
  const faqs = en ? faqsEn : faqsNl
  useSeo({
    title: t('Veelgestelde vragen', 'Frequently asked questions'),
    description: t('Antwoorden op veelgestelde vragen over Atelier Nomàd: handwerk, levering, verzending, retour en onderhoud.',
      'Answers to frequently asked questions about Atelier Nomàd: craftsmanship, delivery, shipping, returns and care.'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  })
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">FAQ</span>
        <h1 className="display reveal" data-delay="1">{t('Veelgestelde vragen', 'Frequently asked questions')}</h1>
        <p className="lead measure reveal" data-delay="2">
          {t('Niet gevonden wat je zoekt?', 'Can’t find what you’re looking for?')} <Link to="/contact" className="link-underline">{t('Neem gerust contact op.', 'Feel free to get in touch.')}</Link>
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
          <p className="notice reveal" style={{ marginTop: '2.5rem' }}>
            {t('Je poef zelf vullen?', 'Filling your pouf yourself?')} <Link to="/poef-vullen" className="link-underline">{t('Zo doe je dat, stap voor stap.', 'Here’s how, step by step.')}</Link>
          </p>
        </div>
      </section>
    </>
  )
}
