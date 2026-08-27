import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { getProduct, products, formatPrice } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  useReveal([slug])
  useSeo({
    title: product ? product.name : 'Product',
    description: product ? product.short : 'Atelier Nomad product',
  })

  if (!product) {
    return (
      <section className="section container center">
        <h1 className="h2">Product niet gevonden</h1>
        <p><Link to="/shop" className="btn btn--ghost">Terug naar de shop <span className="btn__icon">→</span></Link></p>
      </section>
    )
  }

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
              <SmartImage src={product.images?.[0]} alt={product.name} label={product.name} loading="eager" />
            </div>
            {(product.images || []).slice(1).map((src, i) => (
              <div className="thumb" key={i}>
                <SmartImage src={src} alt={`${product.name} ${i + 2}`} label="Detail" sublabel="" />
              </div>
            ))}
          </div>

          <div className="pdp__info reveal" data-delay="1">
            <span className="card__cat">{product.categoryLabel}</span>
            <h1 className="h2" style={{ marginTop: '0.4rem' }}>{product.name}</h1>
            <div className="pdp__price">{formatPrice(product.price)}</div>
            <p className="lead">{product.short}</p>
            <p>{product.description}</p>

            <ul className="pdp__list">
              {product.details.map(([k, v]) => (
                <li key={k}><span>{k}</span><span style={{ marginLeft: 'auto', textAlign: 'right' }}>{v}</span></li>
              ))}
            </ul>

            <div className="pdp__cta">
              {/* Unieke stukken bestaan één keer — dan is een aantal-keuze onzin */}
              {!product.unique && (
                <div className="qty" style={{ border: '1px solid var(--line)', borderRadius: 100, padding: '0.4rem 0.6rem' }}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Minder">−</button>
                  <span style={{ minWidth: 24, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Meer">+</button>
                </div>
              )}
              <button
                className="btn btn--terracotta"
                onClick={() => add({ slug: product.slug, name: product.name, price: product.price, image: product.images?.[0], unique: product.unique, qty: product.unique ? 1 : qty })}
              >
                In winkelmand <span className="btn__icon" aria-hidden>+</span>
              </button>
            </div>

            <p className="notice" style={{ marginTop: '1.6rem' }}>
              ✦ Uniek handgemaakt stuk · Verzending binnen heel Europa · Veilig betalen via Stripe
            </p>
          </div>
        </div>
      </section>

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
