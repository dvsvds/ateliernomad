import { Link } from '../components/TaalLink.jsx'
import useSeo from '../hooks/useSeo.js'
import { useTaal } from '../i18n.js'

export default function NotFound() {
  const { t } = useTaal()
  useSeo({ title: t('Pagina niet gevonden', 'Page not found'), noindex: true })
  return (
    <section className="section container center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
      <span className="eyebrow">404</span>
      <h1 className="display">{t('Deze pagina is op reis', 'This page is travelling')}</h1>
      <p className="lead measure mx-auto">{t('De pagina die je zoekt bestaat niet (meer).', 'The page you are looking for doesn’t exist (anymore).')}</p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link to="/" className="btn btn--terracotta">{t('Terug naar home', 'Back to home')} <span className="btn__icon" aria-hidden>→</span></Link>
      </p>
    </section>
  )
}
