import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo, { SITE_URL } from '../hooks/useSeo.js'
import { getGids, gidsen as gidsenNl } from '../data/gidsen.js'
import { gidsenEn } from '../data/en/gidsen.js'
import { useTaal } from '../i18n.js'

// Links tussen gidsen altijd via het Nederlandse pad; TaalLink vertaalt.
const padVan = (g) => `/${g.nl || g.slug}`

/* Eén gids uit src/data/gidsen.js, in dezelfde opmaak als de juridische pagina's. */
export default function Gids({ slug }) {
  const { en, t, lp } = useTaal()
  const gidsen = en ? gidsenEn : gidsenNl
  const g = en ? gidsenEn.find((x) => x.nl === slug) : getGids(slug)
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
      inLanguage: en ? 'en' : 'nl-BE',
      mainEntityOfPage: SITE_URL + lp(`/${slug}`),
      author: { '@id': `${SITE_URL}/#winkel` },
      publisher: { '@id': `${SITE_URL}/#winkel` },
      image: `${SITE_URL}/images/brand/og-image.jpg`,
    },
  })
  const andere = gidsen.filter((x) => padVan(x) !== `/${slug}`)

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
              <h2 className="h3">{t('Meer gidsen', 'More guides')}</h2>
              <ul className="legal-list">
                {andere.map((x) => <li key={x.slug}><Link to={padVan(x)} className="link-underline">{x.titel}</Link></li>)}
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
  const { en, t } = useTaal()
  const gidsen = en ? gidsenEn : gidsenNl
  useSeo({
    title: t('Gidsen over Marokkaanse poefs en kussens', 'Guides to Moroccan poufs and cushions'),
    description: t('Alles over Berber poefs en Marokkaanse kussens: het verschil tussen wol, boucherouite en kelim, een poef vullen, en leer of Berber kiezen.',
      'All about Berber poufs and Moroccan cushions: wool, boucherouite or kilim, how to fill a pouf, and choosing between leather and Berber.'),
  })
  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{t('Gidsen', 'Guides')}</span>
        <h1 className="display reveal" data-delay="1">{t('Over poefs & kussens', 'About poufs & cushions')}</h1>
        <p className="lead measure reveal" data-delay="2">
          {t('Praktische uitleg over onze Marokkaanse stukken: waar ze vandaan komen, hoe je kiest en hoe je ze verzorgt.', 'Practical guides to our Moroccan pieces: where they come from, how to choose and how to care for them.')}
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {gidsen.map((g, i) => (
            <div className="legal-block reveal" key={g.slug} data-delay={(i % 3) + 1}>
              <h2 className="h3"><Link to={padVan(g)}>{g.titel}</Link></h2>
              <p>{g.description}</p>
              <p><Link to={padVan(g)} className="link-underline">{t('Lees de gids →', 'Read the guide →')}</Link></p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
