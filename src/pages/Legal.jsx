import { Link as RRLink } from 'react-router-dom'
import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import { documenten } from '../data/legal.js'
import { documentenEn } from '../data/en/legal.js'
import { useTaal } from '../i18n.js'

/**
 * Eén opmaak voor de drie juridische pagina's. De inhoud staat in
 * src/data/legal.js, zodat je teksten kunt aanpassen zonder aan
 * componenten te komen.
 */
export default function Legal({ doc }) {
  useReveal()
  const { en, t } = useTaal()
  const d = (en ? documentenEn : documenten)[doc]
  useSeo({ title: d.titel, description: d.intro })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{d.eyebrow}</span>
        <h1 className="display reveal" data-delay="1">{d.titel}</h1>
        <p className="lead measure reveal" data-delay="2">{d.intro}</p>
        {en && (
          <p className="reveal" data-delay="3" style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            This English version is provided for convenience. In case of any difference, the <RRLink to={`/${doc}`} hrefLang="nl" className="link-underline" lang="nl">Dutch version</RRLink> prevails.
          </p>
        )}
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
            {t('Nog een vraag hierover?', 'Any questions about this?')} <Link to="/contact" className="link-underline">{t('Neem contact op', 'Get in touch')}</Link> —
            {t(' we antwoorden binnen één à twee werkdagen.', ' we reply within one or two working days.')}
          </p>
        </div>
      </section>
    </>
  )
}
