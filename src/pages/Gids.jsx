import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo, { SITE_URL } from '../hooks/useSeo.js'
import { getGids, gidsen } from '../data/gidsen.js'

/* Eén gids uit src/data/gidsen.js, in dezelfde opmaak als de juridische pagina's. */
export default function Gids({ slug }) {
  const g = getGids(slug)
  useReveal([slug])
  useSeo({
    title: g.seoTitel,
    description: g.description,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.seoTitel,
      description: g.description,
      inLanguage: 'nl-BE',
      mainEntityOfPage: `${SITE_URL}/${g.slug}`,
      author: { '@id': `${SITE_URL}/#winkel` },
      publisher: { '@id': `${SITE_URL}/#winkel` },
      image: `${SITE_URL}/images/brand/og-image.jpg`,
    },
  })
  const andere = gidsen.filter((x) => x.slug !== slug)

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{g.eyebrow}</span>
        <h1 className="display reveal" data-delay="1">{g.titel}</h1>
        <p className="lead measure reveal" data-delay="2">{g.intro}</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {g.secties.map((s, i) => (
            <div className="legal-block reveal" key={s.h} data-delay={(i % 3) + 1}>
              <h2 className="h3">{s.h}</h2>
              {s.lijst && (
                <ul className="legal-list">
                  {s.lijst.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
              {(s.p || []).map((t) => <p key={t}>{t}</p>)}
              {s.link && <p><Link to={s.link.to} className="link-underline">{s.link.tekst} →</Link></p>}
            </div>
          ))}

          <p className="notice reveal" style={{ marginTop: '2.5rem' }}>
            {g.slot.tekst} <Link to={g.slot.to} className="link-underline">{g.slot.link}</Link>
          </p>

          {andere.length > 0 && (
            <div className="legal-block reveal" style={{ marginTop: '3rem' }}>
              <h2 className="h3">Meer gidsen</h2>
              <ul className="legal-list">
                {andere.map((x) => <li key={x.slug}><Link to={`/${x.slug}`} className="link-underline">{x.titel}</Link></li>)}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

/* Overzicht van alle gidsen op /gidsen. */
export function Gidsen() {
  useReveal()
  useSeo({
    title: 'Gidsen over Marokkaanse poefs en kussens',
    description: 'Alles over Berber poefs en Marokkaanse kussens: het verschil tussen wol, boucherouite en kelim, een poef vullen, en leer of Berber kiezen.',
  })
  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Gidsen</span>
        <h1 className="display reveal" data-delay="1">Over poefs &amp; kussens</h1>
        <p className="lead measure reveal" data-delay="2">
          Praktische uitleg over onze Marokkaanse stukken: waar ze vandaan komen, hoe je kiest en hoe je ze verzorgt.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {gidsen.map((g, i) => (
            <div className="legal-block reveal" key={g.slug} data-delay={(i % 3) + 1}>
              <h2 className="h3"><Link to={`/${g.slug}`}>{g.titel}</Link></h2>
              <p>{g.description}</p>
              <p><Link to={`/${g.slug}`} className="link-underline">Lees de gids →</Link></p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
