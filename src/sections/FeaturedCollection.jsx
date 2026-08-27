import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { featured, collectie } from '../data/products.js'

export default function FeaturedCollection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', maxWidth: 'none' }}>
          <div>
            <span className="eyebrow reveal">Collectie {collectie.nummer}</span>
            <h2 className="h2 reveal" data-delay="1">Uit de eerste collectie</h2>
          </div>
          <Link to="/shop" className="link-underline reveal" data-delay="2">Bekijk de collectie</Link>
        </div>

        <div className="product-grid product-grid--4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={(i % 4) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
