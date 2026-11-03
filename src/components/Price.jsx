import { formatPrice } from '../data/products.js'
import { useTaal } from '../i18n.js'

/* Prijs met "incl. btw" erachter. Alle prijzen zijn inclusief btw
   (zie tax_behavior: 'inclusive' in de checkout-functie). */
export default function Price({ value, className = '' }) {
  const { t } = useTaal()
  return (
    <span className={`price ${className}`}>
      {formatPrice(value)}
      <span className="price__vat">{t('incl. btw', 'incl. VAT')}</span>
    </span>
  )
}
