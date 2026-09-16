import { paymentMethods } from '../data/site.js'

/* Rij met betaalmethodes. De lijst staat in src/data/site.js.
   variant 'dark' = op de donkere footer, 'light' = op crème. */
export default function PaymentMethods({ variant = 'light', className = '' }) {
  if (!paymentMethods.length) return null
  return (
    <ul className={`pay pay--${variant} ${className}`} aria-label="Betaalmethodes">
      {paymentMethods.map((m) => (
        <li key={m.name} className="pay__item" title={m.name}>
          {m.logo ? <img src={m.logo} alt={m.name} loading="lazy" /> : m.name}
        </li>
      ))}
    </ul>
  )
}
