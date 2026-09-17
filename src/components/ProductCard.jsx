import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import Price from './Price.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useVoorraad, STATUS_TEKST } from '../context/VoorraadContext.jsx'

export default function ProductCard({ product, delay }) {
  const { add } = useCart()
  const { status } = useVoorraad()
  const to = `/product/${product.slug}`
  // Alleen unieke stukken kunnen op zijn; kussens blijven gewoon te koop.
  const stand = product.unique ? status(product.slug) : 'beschikbaar'
  const weg = stand !== 'beschikbaar'

  return (
    <article className={`card reveal ${weg ? 'card--weg' : ''}`} data-delay={delay}>
      <div className="card__media">
        {weg
          ? <span className={`card__tag card__tag--${stand}`}>{STATUS_TEKST[stand]}</span>
          : product.tag && <span className="card__tag">{product.tag}</span>}
        <Link to={to} aria-label={product.name}>
          <SmartImage src={product.images?.[0]} alt={product.name} label={product.name} />
        </Link>
        {!weg && <div className="card__quick">
          <button
            className="btn btn--light"
            onClick={() => add({ slug: product.slug, name: product.name, price: product.price, image: product.images?.[0], unique: product.unique })}
          >
            In winkelwagen
            <span className="btn__icon" aria-hidden>+</span>
          </button>
        </div>}
      </div>
      <Link to={to}>
        <span className="card__cat">{product.categoryLabel}</span>
        <h3 className="card__name">{product.name}</h3>
      </Link>
      <div className="card__row">
        <Price value={product.price} className="card__price" />
      </div>
    </article>
  )
}
