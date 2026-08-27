import { Link } from 'react-router-dom'
import useSeo from '../hooks/useSeo.js'

export default function NotFound() {
  useSeo({ title: 'Pagina niet gevonden' })
  return (
    <section className="section container center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
      <span className="eyebrow">404</span>
      <h1 className="display">Deze pagina is op reis</h1>
      <p className="lead measure mx-auto">De pagina die je zoekt bestaat niet (meer).</p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/" className="btn btn--terracotta">Terug naar home <span className="btn__icon" aria-hidden>→</span></Link>
      </p>
    </section>
  )
}
