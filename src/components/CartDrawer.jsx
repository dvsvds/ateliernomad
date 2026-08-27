import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'
import SmartImage from './SmartImage.jsx'
import { startCheckout } from '../lib/checkout.js'

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQty, subtotal, count } = useCart()
  const [loading, setLoading] = useState(false)

  const checkout = async () => {
    setLoading(true)
    try { await startCheckout(items) } finally { setLoading(false) }
  }

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={close} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} aria-label="Winkelmand">
        <div className="drawer__head">
          <h3 className="h3">Winkelmand {count > 0 && `(${count})`}</h3>
          <button className="drawer__close" onClick={close} aria-label="Sluiten">×</button>
        </div>

        <div className="drawer__body">
          {items.length === 0 && (
            <p className="drawer__empty">Je winkelmand is nog leeg.<br />Ontdek de collectie en voeg iets moois toe.</p>
          )}

          {items.map((i) => (
            <div className="cart-item" key={i.slug}>
              <div className="cart-item__media">
                <SmartImage src={i.image} alt={i.name} label={i.name} sublabel="" />
              </div>
              <div>
                <div className="cart-item__name">{i.name}</div>
                <div className="cart-item__meta">{formatPrice(i.price)}</div>
                {i.unique ? (
                  <div className="cart-item__meta">Uniek stuk — 1 beschikbaar</div>
                ) : (
                  <div className="qty">
                    <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Minder">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Meer">+</button>
                  </div>
                )}
              </div>
              <button className="cart-item__remove" onClick={() => remove(i.slug)}>Verwijder</button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__total">
              <span>Subtotaal</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
            <p className="newsletter__note" style={{ marginTop: 0, marginBottom: '1rem' }}>
              Verzendkosten worden bij het afrekenen berekend.
            </p>
            <button className="btn btn--terracotta btn--block" onClick={checkout} disabled={loading}>
              {loading ? 'Even geduld…' : 'Afrekenen'}
              <span className="btn__icon" aria-hidden>→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
