import { Fragment, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import useGehydrateerd from '../hooks/useGehydrateerd.js'
import ProductCard from '../components/ProductCard.jsx'
import { products, categories, collectie } from '../data/products.js'

/* Een productsoort zonder stukken (bv. interieur zolang alles uitverkocht is)
   krijgt geen filterknop — anders klikt een bezoeker op een lege shop. */
const chips = categories.filter(
  (c) => c.as !== 'type' || c.id === 'all' || products.some((p) => p.type === c.id)
)

/* Poefs en kussens hebben elk een eigen landingspagina (/poefs, /kussens),
   zodat ze in Google kunnen ranken op "marokkaanse poef" en "marokkaanse
   kussens". De rest van de filters blijft een parameter op /shop. */
export const SOORT_PAD = { all: '/shop', poufs: '/poefs', kussens: '/kussens' }

const aantal = (type) => products.filter((p) => p.type === type).length

const PAGINA = {
  all: {
    seo: {
      title: 'Shop Marokkaanse poefs & Berber kussens',
      description: `Unieke Marokkaanse poefs, geknoopt uit vintage Berberkleden, en handgeweven wollen Berber kussens. ${products.length} stukken, elk maar één keer. Verzending in België en de EU.`,
    },
    eyebrow: `Collectie ${collectie.nummer}`,
    titel: collectie.naam,
  },
  poufs: {
    seo: {
      title: 'Marokkaanse poef kopen · vintage Berber poefs',
      description: `${aantal('poufs')} unieke Marokkaanse poefs, met de hand geknoopt uit vintage Berberkleden, boucherouite en kelim. Elk stuk bestaat maar één keer. Vanaf € 120, verzending in België en de EU.`,
    },
    eyebrow: 'Poefs',
    titel: 'Marokkaanse Berber poefs',
    intro: `${aantal('poufs')} vintage poefs, elk met de hand geknoopt uit een oud Berberkleed, boucherouite of kelim uit Marokko. Omdat elk kleed anders is, bestaat elke poef maar één keer: wat je op de foto ziet, is precies wat je ontvangt. We versturen ze ongevuld, als hoes met rits — zo blijft verzenden betaalbaar en vul je hem zelf zo stevig als je wil.`,
  },
  kussens: {
    seo: {
      title: 'Marokkaanse kussens · handgeweven Berber kussens',
      description: `${aantal('kussens')} handgeweven Marokkaanse kussens van Berberwol uit de Atlas: hoogpolig, met franjes of geborduurde motieven. Elk kussen is uniek. Verzending in België en de EU.`,
    },
    eyebrow: 'Kussens',
    titel: 'Marokkaanse Berber kussens',
    intro: `${aantal('kussens')} handgeweven kussens van schapenwol, gemaakt op smalle weefgetouwen in de Atlas. Ongeverfde wol, geverfde banen, franjes en geborduurde tekens: geen twee zijn gelijk, en elk kussen bestaat maar één keer.`,
  },
}

export default function Shop({ soort }) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  /* De URL is de bron van waarheid — zo werkt een link naar
     /shop?cat=poufs ook als je al op de shoppagina staat. */
  // De vooraf gerenderde HTML toont de hele collectie; de filter uit de
  // URL komt er pas na het overnemen door React bij.
  const gehydrateerd = useGehydrateerd()
  const gevraagd = soort || (gehydrateerd ? params.get('cat') : null)
  // Een oude of verzonnen link (?cat=interieur, ?cat=foo) toont anders een lege shop.
  const active = categories.some((c) => c.id === gevraagd) ? gevraagd : 'all'
  useReveal([active])
  const pagina = PAGINA[soort || 'all']
  useSeo(pagina.seo)

  /* Twee filterassen door één chiprij: 'poufs'/'kussens'/'interieur' filtert op
     productsoort, de kleurchips op kleurfamilie. Welke van de twee een
     chip is, staat in `as` — zo blijft dit één simpele vergelijking. */
  const filtered = useMemo(() => {
    if (active === 'all') return products
    const veld = categories.find((c) => c.id === active)?.as === 'type' ? 'type' : 'category'
    return products.filter((p) => p[veld] === active)
  }, [active])

  // `behoudScroll`: van /shop naar /poefs wisselen is een filterklik, geen
  // nieuwe pagina — dan niet naar boven springen (zie ScrollToTop in App).
  const choose = (id) =>
    navigate(SOORT_PAD[id] || `/shop?cat=${id}`, { state: { behoudScroll: true } })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{pagina.eyebrow}</span>
        <h1 className="display reveal" data-delay="1">{pagina.titel}</h1>
        <p className="lead measure reveal" data-delay="2">
          {pagina.intro || <>
            {products.length} stukken, in één keer geselecteerd in Marokko: {aantal('poufs')} vintage
            Marokkaanse poefs en {aantal('kussens')} handgeweven Berber kussens.
            Alles met de hand gemaakt en elk stuk uniek — wat je op de foto ziet, is precies
            wat je ontvangt. Is het weg, dan komt het niet terug.
          </>}
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filters reveal">
            {chips.map((c, i) => (
              <Fragment key={c.id}>
                {/* streepje tussen de soort- en de kleurchips */}
                {i > 0 && chips[i - 1].as !== c.as && <span className="filters__split" aria-hidden="true" />}
                <button
                  className={`chip ${active === c.id ? 'active' : ''}`}
                  onClick={() => choose(c.id)}
                >
                  {c.label}
                </button>
              </Fragment>
            ))}
          </div>

          <p className="filters__count reveal" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'stuk' : 'stuks'}
            {active !== 'all' && ` van ${products.length}`}
          </p>

          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={(i % 3) + 1} />
            ))}
          </div>

          {filtered.length === 0 && <p className="notice">Geen producten in deze categorie.</p>}
        </div>
      </section>
    </>
  )
}
