import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'
import SmartImage from './SmartImage.jsx'
import PaymentMethods from './PaymentMethods.jsx'
import { shop } from '../data/site.js'
import { startCheckout } from '../lib/checkout.js'

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQty, subtotal, count } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // "Verder winkelen" sluit de winkelwagen én brengt je naar de collectie.
  // Alleen sluiten liet je op een productpagina staan, en dat voelde alsof
  // de knop niets deed.
  const verderWinkelen = () => {
    close()
    if (pathname !== '/shop') navigate('/shop')
  }
  // Prijzen zijn inclusief btw, dus de btw zit er al in: bedrag x 21/121.
  const btwInSubtotaal = Math.round((subtotal * shop.btwTarief) / (1 + shop.btwTarief) * 100) / 100
  const [loading, setLoading] = useState(false)

  const checkout = async () => {
    setLoading(true)
    try { await startCheckout(items) } finally { setLoading(false) }
  }

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={close} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} aria-label="Winkelwagen">
        <div className="drawer__head">
          <h3 className="h3">Winkelwagen {count > 0 && `(${count})`}</h3>
          <button className="drawer__close" onClick={close} aria-label="Sluiten">×</button>
        </div>

        <div className="drawer__body">
          {items.length === 0 && (
            <div className="drawer__empty">
              <p>Je winkelwagen is nog leeg.<br />Ontdek de collectie en voeg iets moois toe.</p>
              <button className="btn btn--ghost" onClick={verderWinkelen}>Verder winkelen</button>
            </div>
          )}

          {items.map((i) => (
            <div className="cart-item" key={i.slug}>
              <div className="cart-item__media">
                <SmartImage src={i.image} alt={i.name} label="" sublabel="" />
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
            {/* Geen verrassingen bij het afrekenen: verzendkosten staan er al.
                Vast bedrag per bestelling, gelijk aan de checkout-functie. */}
            <dl className="drawer__sum">
              <div><dt>Subtotaal <small>incl. btw</small></dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="drawer__vat"><dt>waarvan btw ({Math.round(shop.btwTarief * 100)}%)</dt><dd>{formatPrice(btwInSubtotaal)}</dd></div>
              <div><dt>Verzending (EU)</dt><dd>{formatPrice(shop.shippingCost)}</dd></div>
            </dl>
            <div className="drawer__total">
              <span>Totaal <small>incl. btw</small></span>
              <b>{formatPrice(subtotal + shop.shippingCost)}</b>
            </div>
            <button className="btn btn--terracotta btn--block" onClick={checkout} disabled={loading}>
              {loading ? 'Even geduld…' : 'Veilig afrekenen'}
              <span className="btn__icon" aria-hidden>→</span>
            </button>
            <button className="drawer__continue" onClick={verderWinkelen}>of verder winkelen</button>
            <p className="drawer__assure">
              Verzonden binnen {shop.deliveryTime} · {shop.returnDays} dagen bedenktijd
            </p>
            <PaymentMethods className="drawer__pay" />
          </div>
        )}
      </aside>
    </>
  )
}
