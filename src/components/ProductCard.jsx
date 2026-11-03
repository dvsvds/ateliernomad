import { Link } from './TaalLink.jsx'
import SmartImage from './SmartImage.jsx'
import Price from './Price.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useVoorraad, STATUS_TEKST, STATUS_TEKST_EN } from '../context/VoorraadContext.jsx'
import { useTaal } from '../i18n.js'
import { vertaalProduct } from '../data/vertaal.js'

export default function ProductCard({ product: origineel, delay }) {
  const { taal, en, t } = useTaal()
  const product = vertaalProduct(origineel, taal)
  const { add } = useCart()
  const { status } = useVoorraad()
  const to = `/product/${product.slug}`
  // Alleen unieke stukken kunnen op zijn (nu: alles).
  const stand = product.unique ? status(product.slug) : 'beschikbaar'
  const weg = stand !== 'beschikbaar'

  return (
    <article className={`card reveal ${weg ? 'card--weg' : ''}`} data-delay={delay}>
      <div className="card__media">
        {weg
          ? <span className={`card__tag card__tag--${stand}`}>{(en ? STATUS_TEKST_EN : STATUS_TEKST)[stand]}</span>
          : product.tag && <span className="card__tag">{product.tag}</span>}
        <Link to={to} aria-label={product.name}>
          <SmartImage src={product.images?.[0]} alt={product.name} label={product.name} />
        </Link>
        {!weg && <div className="card__quick">
          <button
            className="btn btn--light"
            onClick={() => add({ slug: product.slug, name: origineel.name, price: product.price, image: product.images?.[0], unique: product.unique })}
          >
            {t('In winkelwagen', 'Add to cart')}
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
