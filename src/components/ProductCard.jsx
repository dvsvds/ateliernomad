import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import { formatPrice } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product, delay }) {
  const { add } = useCart()
  const to = `/product/${product.slug}`

  return (
    <article className="card reveal" data-delay={delay}>
      <div className="card__media">
        {product.tag && <span className="card__tag">{product.tag}</span>}
        <Link to={to} aria-label={product.name}>
          <SmartImage src={product.images?.[0]} alt={product.name} label={product.name} />
        </Link>
        <div className="card__quick">
          <button
            className="btn btn--light"
            onClick={() => add({ slug: product.slug, name: product.name, price: product.price, image: product.images?.[0] })}
          >
            In winkelmand
            <span className="btn__icon" aria-hidden>+</span>
          </button>
        </div>
      </div>
      <Link to={to}>
        <span className="card__cat">{product.categoryLabel}</span>
        <h3 className="card__name">{product.name}</h3>
      </Link>
      <div className="card__row">
        <span className="card__price">{formatPrice(product.price)}</span>
      </div>
    </article>
  )
}
