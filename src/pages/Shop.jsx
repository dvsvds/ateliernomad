import { Fragment, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import useGehydrateerd from '../hooks/useGehydrateerd.js'
import ProductCard from '../components/ProductCard.jsx'
import { products, categories, collectie } from '../data/products.js'
import { useTaal } from '../i18n.js'
import { categorieLabel, collectieVoor } from '../data/vertaal.js'

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
      title: 'Marokkaanse poef kopen · Berber poefs',
      description: `${aantal('poufs')} Marokkaanse poefs, met de hand geknoopt uit vintage Berberkleden, boucherouite en kelim. Elk stuk is uniek. Vanaf € 120, verzending in de EU.`,
    },
    eyebrow: 'Poefs',
    titel: 'Marokkaanse Berber poefs',
    gids: { to: '/berber-poef', tekst: 'Wol, boucherouite of kelim: wat is het verschil?' },
    intro: `${aantal('poufs')} vintage poefs, elk met de hand geknoopt uit een oud Berberkleed, boucherouite of kelim uit Marokko. Omdat elk kleed anders is, bestaat elke poef maar één keer: wat je op de foto ziet, is precies wat je ontvangt. We versturen ze standaard ongevuld, als hoes met rits, zodat je hem zelf zo stevig vult als je wil — of je kiest gevuld, voor € 9 extra.`,
  },
  kussens: {
    seo: {
      title: 'Marokkaanse kussens · Berber kussens',
      description: `${aantal('kussens')} handgeweven Marokkaanse kussens van Berberwol uit de Atlas: hoogpolig, met franjes of geborduurde motieven. Elk kussen is uniek. Verzending in de EU.`,
    },
    eyebrow: 'Kussens',
    titel: 'Marokkaanse Berber kussens',
    intro: `${aantal('kussens')} handgeweven kussens van schapenwol, gemaakt op smalle weefgetouwen in de Atlas. Ongeverfde wol, geverfde banen, franjes en geborduurde tekens: geen twee zijn gelijk, en elk kussen bestaat maar één keer.`,
  },
}

const PAGINA_EN = {
  all: {
    seo: {
      title: 'Shop Moroccan poufs & Berber cushions',
      description: `Unique Moroccan poufs, hand-knotted from vintage Berber rugs, and hand-woven wool Berber cushions. ${products.length} pieces, each one of a kind. Shipping across the EU.`,
    },
    eyebrow: `Collection ${collectie.nummer}`,
    titel: collectieVoor('en').naam,
    intro: `${products.length} pieces, selected in Morocco all in one go: ${aantal('poufs')} vintage Moroccan poufs and ${aantal('kussens')} hand-woven Berber cushions. All made by hand and every piece unique — what you see in the photo is exactly what you receive. Once it’s gone, it won’t be back.`,
  },
  poufs: {
    seo: {
      title: 'Moroccan poufs · vintage Berber poufs',
      description: `${aantal('poufs')} Moroccan poufs, hand-knotted from vintage Berber rugs, boucherouite and kilim. Every piece is one of a kind. From € 120, shipping across the EU.`,
    },
    eyebrow: 'Poufs',
    titel: 'Moroccan Berber poufs',
    gids: { to: '/berber-poef', tekst: 'Wool, boucherouite or kilim: what’s the difference?' },
    intro: `${aantal('poufs')} vintage poufs, each hand-knotted from an old Berber rug, boucherouite or kilim from Morocco. Because every rug is different, every pouf exists only once: what you see in the photo is exactly what you receive. We ship them unfilled by default, as a cover with a zip, so you can fill it as firmly as you like — or choose filled, for € 9 extra.`,
  },
  kussens: {
    seo: {
      title: 'Moroccan cushions · Berber cushions',
      description: `${aantal('kussens')} hand-woven Moroccan cushions in Berber wool from the Atlas: high-pile, fringed or embroidered. Every cushion is one of a kind. Shipping across the EU.`,
    },
    eyebrow: 'Cushions',
    titel: 'Moroccan Berber cushions',
    intro: `${aantal('kussens')} hand-woven cushions in sheep’s wool, made on narrow looms in the Atlas. Undyed wool, dyed bands, fringes and embroidered symbols: no two are alike, and every cushion exists only once.`,
  },
}

export default function Shop({ soort }) {
  const { taal, en, t, lp } = useTaal()
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
  const pagina = (en ? PAGINA_EN : PAGINA)[soort || 'all']
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
    navigate(lp(SOORT_PAD[id] || `/shop?cat=${id}`), { state: { behoudScroll: true } })

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
        {pagina.gids && (
          <p className="reveal" data-delay="3">
            <Link to={pagina.gids.to} className="link-underline">{pagina.gids.tekst}</Link>
          </p>
        )}
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
                  {categorieLabel(c, taal)}
                </button>
              </Fragment>
            ))}
          </div>

          <p className="filters__count reveal" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? t('stuk', 'piece') : t('stuks', 'pieces')}
            {active !== 'all' && ` ${t('van', 'of')} ${products.length}`}
          </p>

          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={(i % 3) + 1} />
            ))}
          </div>

          {filtered.length === 0 && <p className="notice">{t('Geen producten in deze categorie.', 'No products in this category.')}</p>}
        </div>
      </section>
    </>
  )
}
