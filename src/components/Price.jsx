import { formatPrice } from '../data/products.js'

/* Prijs met "incl. btw" erachter. Alle prijzen zijn inclusief btw
   (zie tax_behavior: 'inclusive' in de checkout-functie). */
export default function Price({ value, className = '' }) {
  return (
    <span className={`price ${className}`}>
      {formatPrice(value)}
      <span className="price__vat">incl. btw</span>
    </span>
  )
}
