import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Price from '../components/Price.jsx'
import PaymentMethods from '../components/PaymentMethods.jsx'
import { getProduct, products, formatPrice } from '../data/products.js'
import { shop } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import { useVoorraad, STATUS_TEKST } from '../context/VoorraadContext.jsx'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { add, items, open } = useCart()
  const { status } = useVoorraad()
  const [qty, setQty] = useState(1)
  const [beeld, setBeeld] = useState(0)
  // De component wordt hergebruikt tussen producten: aantal en gekozen foto
  // mogen niet meereizen naar het volgende product.
  useEffect(() => { setQty(1); setBeeld(0) }, [slug])
  const ctaRef = useRef(null)
  const [showSticky, setShowSticky] = useState(false)
  useReveal([slug])

  /* Sticky knop op mobiel: verschijnt zodra de gewone knop uit beeld is,
     en verdwijnt weer bij de footer zodat die niet bedekt wordt. */
  useEffect(() => {
    const cta = ctaRef.current
    const footer = document.querySelector('.footer')
    if (!cta || !('IntersectionObserver' in window)) return
    const seen = { cta: true, footer: false }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { seen[e.target === cta ? 'cta' : 'footer'] = e.isIntersecting })
      setShowSticky(!seen.cta && !seen.footer)
    })
    io.observe(cta)
    if (footer) io.observe(footer)
    return () => { io.disconnect(); setShowSticky(false) }
  }, [slug])
  useSeo({
    title: product ? product.name : 'Product',
    description: product ? product.short : 'Atelier Nomàd product',
  })

  if (!product) {
    return (
      <section className="section container center">
        <h1 className="h2">Product niet gevonden</h1>
        <p><Link to="/shop" className="btn btn--ghost">Terug naar de shop <span className="btn__icon">→</span></Link></p>
      </section>
    )
  }

  /* Een uniek stuk dat al in de winkelwagen zit, kan er niet nog eens in:
     de knop opent dan de winkelwagen in plaats van niets te doen. */
  const inCart = product.unique && items.some((i) => i.slug === product.slug)
  const stand = product.unique ? status(product.slug) : 'beschikbaar'
  const weg = stand !== 'beschikbaar'
  const addToCart = () =>
    inCart
      ? open()
      : add({ slug: product.slug, name: product.name, price: product.price, image: product.images?.[0], unique: product.unique, qty: product.unique ? 1 : qty })
  const ctaLabel = inCart ? 'Bekijk winkelwagen' : 'In winkelwagen'

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)
  const more = related.length ? related : products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
          <Link to="/">Home</Link> &nbsp;/&nbsp; <Link to="/shop">Shop</Link> &nbsp;/&nbsp; <span>{product.name}</span>
        </p>
      </div>

      <section className="section container" style={{ paddingTop: '1.5rem' }}>
        <div className="pdp">
          <div className="pdp__gallery reveal">
            <div className="main">
              <SmartImage key={product.images?.[beeld]} src={product.images?.[beeld]} alt={product.name} label={product.name} loading="eager" />
            </div>
            {(product.images || []).length > 1 && product.images.map((src, i) => (
              <button
                type="button"
                className={`thumb ${i === beeld ? 'is-active' : ''}`}
                key={src}
                onClick={() => setBeeld(i)}
                aria-label={i === 0 ? 'Voorkant tonen' : 'Achterkant tonen'}
                aria-pressed={i === beeld}
              >
                <SmartImage src={src} alt="" label="" sublabel="" />
              </button>
            ))}
          </div>

          <div className="pdp__info reveal" data-delay="1">
            <span className="card__cat">{product.categoryLabel}</span>
            <h1 className="h2" style={{ marginTop: '0.4rem' }}>{product.name}</h1>
            <Price value={product.price} className="pdp__price" />
            <p className="lead">{product.short}</p>
            <p>{product.description}</p>

            <ul className="pdp__list">
              {product.details.map(([k, v]) => (
                <li key={k}><span>{k}</span><span style={{ marginLeft: 'auto', textAlign: 'right' }}>{v}</span></li>
              ))}
            </ul>

            <div className="pdp__cta" ref={ctaRef}>
              {weg && (
                <p className="pdp__weg" role="status">
                  <strong>{STATUS_TEKST[stand]}.</strong>{' '}
                  {stand === 'verkocht'
                    ? 'Dit stuk heeft een nieuwe eigenaar. Er is er maar één van, dus hij komt niet terug.'
                    : 'Iemand anders is dit stuk op dit moment aan het afrekenen. Rondt die het niet af, dan komt het binnen een half uur weer vrij.'}
                </p>
              )}
              {/* Unieke stukken bestaan één keer — dan is een aantal-keuze onzin */}
              {!product.unique && !weg && (
                <div className="qty" style={{ border: '1px solid var(--line)', borderRadius: 100, padding: '0.4rem 0.6rem' }}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Minder">−</button>
                  <span style={{ minWidth: 24, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Meer">+</button>
                </div>
              )}
              {weg
                ? <Link to="/shop" className="btn btn--ghost">Bekijk de andere stukken <span className="btn__icon" aria-hidden>→</span></Link>
                : <button className="btn btn--terracotta" onClick={addToCart}>
                    {ctaLabel} <span className="btn__icon" aria-hidden>{inCart ? '→' : '+'}</span>
                  </button>}
            </div>
            {product.unique && !weg && (
              <p className="pdp__stock">Uniek stuk — er is er maar één van</p>
            )}

            {/* Vertrouwen vlak bij de knop: alles hieronder moet kloppen
                met src/data/site.js (shop) en de pagina Verzending & retour. */}
            <ul className="trust">
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>Verzonden binnen {shop.deliveryTime}</b>, met track &amp; trace</span></li>
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>{formatPrice(shop.shippingCost)} verzending</b> binnen de EU, per bestelling</span></li>
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>{shop.returnDays} dagen bedenktijd</b> — <Link to="/verzending" className="trust__link">zo werkt retour</Link></span></li>
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>Veilig betalen</b> via Stripe</span></li>
            </ul>
            <PaymentMethods className="pdp__pay" />
          </div>
        </div>
      </section>

      <div className={`sticky-cta ${showSticky ? 'is-visible' : ''}`} aria-hidden={!showSticky}>
        <div className="sticky-cta__info">
          <span className="sticky-cta__name">{product.name}</span>
          <Price value={product.price} className="sticky-cta__price" />
        </div>
        <button className="btn btn--terracotta" onClick={addToCart} tabIndex={showSticky ? 0 : -1}>
          {ctaLabel}
        </button>
      </div>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">Misschien ook iets voor jou</span><h2 className="h2">Verder ontdekken</h2></div>
          <div className="product-grid">
            {more.map((p, i) => <ProductCard key={p.slug} product={p} delay={(i % 3) + 1} />)}
          </div>
        </div>
      </section>
    </>
  )
}
