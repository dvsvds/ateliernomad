import { Fragment, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import ProductCard from '../components/ProductCard.jsx'
import { products, categories, collectie } from '../data/products.js'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  /* De URL is de bron van waarheid — zo werkt een link naar
     /shop?cat=poufs ook als je al op de shoppagina staat. */
  const active = params.get('cat') || 'all'
  useReveal([active])
  useSeo({
    title: 'De eerste collectie',
    description: 'De volledige collectie van Atelier Nomad: 33 unieke vintage Marokkaanse vloerpoufs, plus negen handgeweven wollen kussens, een stoel, een krukje en een kapstok van hout en touw.',
  })

  /* Twee filterassen door één chiprij: 'poufs'/'interieur' filtert op
     productsoort, de kleurchips op kleurfamilie. Welke van de twee een
     chip is, staat in `as` — zo blijft dit één simpele vergelijking. */
  const filtered = useMemo(() => {
    if (active === 'all') return products
    const veld = categories.find((c) => c.id === active)?.as === 'type' ? 'type' : 'category'
    return products.filter((p) => p[veld] === active)
  }, [active])

  const choose = (id) => {
    if (id === 'all') setParams({})
    else setParams({ cat: id })
  }

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Collectie {collectie.nummer}</span>
        <h1 className="display reveal" data-delay="1">{collectie.naam}</h1>
        <p className="lead measure reveal" data-delay="2">
          {products.length} stukken, in één keer geselecteerd in Marokko: drieëndertig vintage
          vloerpoufs, acht handgeweven kussens, een stoel, een krukje en een kapstok.
          Alles met de hand gemaakt en elk stuk uniek — wat je op de foto ziet, is precies
          wat je ontvangt. Is het weg, dan komt het niet terug.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filters reveal">
            {categories.map((c, i) => (
              <Fragment key={c.id}>
                {/* streepje tussen de soort- en de kleurchips */}
                {i > 0 && categories[i - 1].as !== c.as && <span className="filters__split" aria-hidden="true" />}
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
