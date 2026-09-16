import { useEffect } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import useSeo from '../hooks/useSeo.js'
import { useCart } from '../context/CartContext.jsx'

export default function Success() {
  useSeo({ title: 'Bedankt voor je bestelling' })
  const { clear } = useCart()
  const [params] = useSearchParams()
  // Stripe stuurt de klant hierheen mét session_id. Zonder die parameter
  // is er niet betaald: dan geen succesbericht en geen lege winkelwagen.
  const sessionId = params.get('session_id')
  useEffect(() => { if (sessionId) clear() }, [sessionId])
  if (!sessionId) return <Navigate to="/shop" replace />

  return (
    <section className="section container center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
      <span className="eyebrow">Betaling geslaagd</span>
      <h1 className="display" style={{ maxWidth: '16ch', marginInline: 'auto' }}>Dank je wel ✦</h1>
      <p className="lead measure mx-auto">
        Je bestelling is ontvangen. Je krijgt een bevestiging per e-mail. We pakken je
        stuk met zorg in en sturen je een track &amp; trace zodra het onderweg is.
      </p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/shop" className="btn btn--ghost">Verder shoppen <span className="btn__icon" aria-hidden>→</span></Link>
      </p>
    </section>
  )
}
