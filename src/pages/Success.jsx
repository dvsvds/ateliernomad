import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/TaalLink.jsx'
import useSeo from '../hooks/useSeo.js'
import { useCart } from '../context/CartContext.jsx'
import { useTaal } from '../i18n.js'

export default function Success() {
  const { t, lp } = useTaal()
  useSeo({ title: t('Bedankt voor je bestelling', 'Thank you for your order'), noindex: true })
  const { clear } = useCart()
  const [params] = useSearchParams()
  // Stripe stuurt de klant hierheen mét session_id. Zonder die parameter
  // is er niet betaald: dan geen succesbericht en geen lege winkelwagen.
  const sessionId = params.get('session_id')
  useEffect(() => { if (sessionId) clear() }, [sessionId])
  if (!sessionId) return <Navigate to={lp('/shop')} replace />

  return (
    <section className="section container center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
      <span className="eyebrow">{t('Betaling geslaagd', 'Payment successful')}</span>
      <h1 className="display" style={{ maxWidth: '16ch', marginInline: 'auto' }}>{t('Dank je wel ✦', 'Thank you ✦')}</h1>
      <p className="lead measure mx-auto">
        {t('Je bestelling is ontvangen. Je krijgt een bevestiging per e-mail. We pakken je stuk met zorg in en sturen je een track & trace zodra het onderweg is.',
          'Your order has been received. You’ll get a confirmation by email. We’ll pack your piece with care and send you a tracking link as soon as it’s on its way.')}
      </p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/shop" className="btn btn--ghost">{t('Verder shoppen', 'Continue shopping')} <span className="btn__icon" aria-hidden>→</span></Link>
      </p>
    </section>
  )
}
