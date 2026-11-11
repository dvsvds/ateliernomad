import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'
import SmartImage from './SmartImage.jsx'
import PaymentMethods from './PaymentMethods.jsx'
import { shop } from '../data/site.js'
import { startCheckout } from '../lib/checkout.js'
import { useVoorraad } from '../context/VoorraadContext.jsx'
import { useTaal } from '../i18n.js'
import { trackEvent, gaItems, gaWaarde } from '../lib/analytics.js'
import { getProduct } from '../data/products.js'
import { productNaam } from '../data/vertaal.js'

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQty, subtotal, count } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { taal, t, lp } = useTaal()
  // Namen in de taal van de pagina (de wagen bewaart de Nederlandse naam).
  const naam = (p) => { const pr = getProduct(p.slug); return pr ? productNaam(pr, taal) : p.name }
  // "Verder winkelen" sluit de winkelwagen én brengt je naar de collectie.
  // Alleen sluiten liet je op een productpagina staan, en dat voelde alsof
  // de knop niets deed.
  const verderWinkelen = () => {
    close()
    if (pathname !== lp('/shop')) navigate(lp('/shop'))
  }
  // Prijzen zijn inclusief btw, dus de btw zit er al in: bedrag x 21/121.
  const btwInSubtotaal = Math.round((subtotal * shop.btwTarief) / (1 + shop.btwTarief) * 100) / 100
  const [loading, setLoading] = useState(false)
  const [weg, setWeg] = useState(null) // { verkocht: [...], gereserveerd: [...] }
  const { ververs } = useVoorraad()

  // Escape sluit de winkelwagen, zoals elk overlay hoort te doen.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const checkout = async () => {
    setLoading(true)
    trackEvent('begin_checkout', { currency: 'EUR', value: gaWaarde(items), items: gaItems(items) })
    // Bij een redirect blijft de knop uit tot de pagina weg is; anders kon
    // een tweede klik een tweede Stripe-sessie starten.
    const uit = await startCheckout(items, taal)
    if (uit && uit.nietBeschikbaar) {
      // Net verkocht of door iemand anders gereserveerd: uit de wagen, en
      // uitleggen waarom het totaal ineens lager is.
      for (const p of [...uit.nietBeschikbaar.verkocht, ...uit.nietBeschikbaar.gereserveerd]) remove(p.slug)
      setWeg(uit.nietBeschikbaar)
      ververs()
      setLoading(false)
      return
    }
    if (!uit) setLoading(false)
  }

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={close} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} inert={isOpen ? undefined : ''} aria-label={t('Winkelwagen', 'Cart')}>
        <div className="drawer__head">
          <h3 className="h3">{t('Winkelwagen', 'Cart')} {count > 0 && `(${count})`}</h3>
          <button className="drawer__close" onClick={close} aria-label={t('Sluiten', 'Close')}>×</button>
        </div>

        <div className="drawer__body">
          {weg && (
            <p className="notice drawer__weg" role="alert">
              {weg.verkocht.length > 0 && (
                <>{t('Helaas, net verkocht:', 'Sorry, just sold:')} <strong>{weg.verkocht.map(naam).join(', ')}</strong>. {t('Er is er maar één van, dus we hebben het uit je winkelwagen gehaald.', 'There is only one, so we removed it from your cart.')}{' '}</>
              )}
              {weg.gereserveerd.length > 0 && (
                <>{t('Iemand anders is', 'Someone else is checking out')} <strong>{weg.gereserveerd.map(naam).join(', ')}</strong> {t('op dit moment aan het afrekenen. Rondt die het niet af, dan komt het binnen een half uur weer vrij.', 'right now. If they don’t complete the purchase, it becomes available again within half an hour.')}</>
              )}
            </p>
          )}
          {items.length === 0 && (
            <div className="drawer__empty">
              <p>{t('Je winkelwagen is nog leeg.', 'Your cart is empty.')}<br />{t('Ontdek de collectie en voeg iets moois toe.', 'Explore the collection and add something beautiful.')}</p>
              <button className="btn btn--ghost" onClick={verderWinkelen}>{t('Verder winkelen', 'Continue shopping')}</button>
            </div>
          )}

          {items.map((i) => (
            <div className="cart-item" key={i.slug}>
              <div className="cart-item__media">
                <SmartImage src={i.image} alt={naam(i)} label="" sublabel="" sizes="120px" />
              </div>
              <div>
                <div className="cart-item__name">{naam(i)}</div>
                <div className="cart-item__meta">{formatPrice(i.price)}</div>
                {getProduct(i.slug)?.vulbaar && (
                  <div className="cart-item__meta">{i.gevuld ? t(`Gevuld (+ ${formatPrice(shop.vulPrijs)})`, `Filled (+ ${formatPrice(shop.vulPrijs)})`) : t('Ongevuld, als hoes', 'Unfilled, as a cover')}</div>
                )}
                {i.unique ? (
                  <div className="cart-item__meta">{t('Uniek stuk — 1 beschikbaar', 'Unique piece — 1 available')}</div>
                ) : (
                  <div className="qty">
                    <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label={t('Minder', 'Less')}>−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label={t('Meer', 'More')}>+</button>
                  </div>
                )}
              </div>
              <button className="cart-item__remove" onClick={() => remove(i.slug)}>{t('Verwijder', 'Remove')}</button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            {/* Geen verrassingen bij het afrekenen: verzendkosten staan er al.
                Vast bedrag per bestelling, gelijk aan de checkout-functie. */}
            <dl className="drawer__sum">
              <div><dt>{t('Subtotaal', 'Subtotal')} <small>{t('incl. btw', 'incl. VAT')}</small></dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="drawer__vat"><dt>{t('waarvan btw', 'of which VAT')} ({Math.round(shop.btwTarief * 100)}%)</dt><dd>{formatPrice(btwInSubtotaal)}</dd></div>
              <div><dt>{t('Verzending (EU)', 'Shipping (EU)')}</dt><dd>{formatPrice(shop.shippingCost)}</dd></div>
              {shop.gratisAntwerpen && <div className="drawer__vat"><dt>{t('Provincie Antwerpen: gratis levering, kies dit bij het afrekenen', 'Antwerp province: free delivery, choose it at checkout')}</dt><dd></dd></div>}
            </dl>
            <div className="drawer__total">
              <span>{t('Totaal', 'Total')} <small>{t('incl. btw', 'incl. VAT')}</small></span>
              <b>{formatPrice(subtotal + shop.shippingCost)}</b>
            </div>
            <button className="btn btn--terracotta btn--block" onClick={checkout} disabled={loading}>
              {loading ? t('Even geduld…', 'One moment…') : t('Veilig afrekenen', 'Secure checkout')}
              <span className="btn__icon" aria-hidden>→</span>
            </button>
            <button className="drawer__continue" onClick={verderWinkelen}>{t('of verder winkelen', 'or continue shopping')}</button>
            <p className="drawer__assure">
              {t(`Verzonden binnen ${shop.deliveryTime}`, `Ships within ${shop.deliveryTime.replace('werkdagen', 'working days')}`)} · {shop.returnDays} {t('dagen bedenktijd', 'days to return')}
            </p>
            <PaymentMethods className="drawer__pay" />
          </div>
        )}
      </aside>
    </>
  )
}
