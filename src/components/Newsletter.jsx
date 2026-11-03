import { useState } from 'react'
import { Link } from './TaalLink.jsx'
import { verstuurFormulier } from '../lib/netlifyForm.js'
import { useTaal } from '../i18n.js'

export default function Newsletter({ dark = false }) {
  const [email, setEmail] = useState('')
  const { t } = useTaal()
  // idle | bezig | klaar | fout
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    const botVeld = e.currentTarget.elements['bot-field']?.value || ''
    setStatus('bezig')
    const ok = await verstuurFormulier('nieuwsbrief', { email, 'bot-field': botVeld })
    if (ok) setEmail('')
    setStatus(ok ? 'klaar' : 'fout')
  }

  return (
    <div className={`newsletter container ${dark ? '' : ''}`} style={{ maxWidth: 720 }}>
      <span className="eyebrow eyebrow--muted">{t('Blijf op de hoogte', 'Stay in touch')}</span>
      <h2 className="h2">{t('Word lid van de Nomad-cirkel', 'Join the Nomad circle')}</h2>
      <p className="lead mx-auto measure">
        {t('Nieuwe collecties, verhalen uit het atelier en stille pre-sales — een paar keer per jaar, nooit spam.', 'New collections, stories from the atelier and quiet pre-sales — a few times a year, never spam.')}
      </p>
      {status === 'klaar' ? (
        <p className="notice mx-auto" style={{ maxWidth: 460, marginTop: '1.5rem' }}>
          {t('Dank je wel — je staat op de lijst. ✦', 'Thank you — you’re on the list. ✦')}
        </p>
      ) : (
        <form className="newsletter__form" name="nieuwsbrief" onSubmit={submit}>
          {/* Honeypot tegen spambots */}
          <input name="bot-field" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input
            name="email"
            type="email" required placeholder={t('Je e-mailadres', 'Your email address')}
            value={email} onChange={(e) => setEmail(e.target.value)}
            aria-label={t('E-mailadres', 'Email address')}
          />
          <button className="btn btn--terracotta" type="submit" disabled={status === 'bezig'}>
            {status === 'bezig' ? t('Even geduld…', 'One moment…') : t('Inschrijven', 'Subscribe')}
          </button>
        </form>
      )}
      {status === 'fout' && (
        <p className="notice mx-auto" role="alert" style={{ maxWidth: 460, marginTop: '1rem' }}>
          {t('Inschrijven lukte niet. Probeer het later opnieuw, of mail ons.', 'Subscribing didn’t work. Please try again later, or email us.')}
        </p>
      )}
      <p className="newsletter__note">
        {t('Door je in te schrijven ga je akkoord met ons', 'By subscribing you agree to our')} <Link to="/privacy">{t('privacybeleid', 'privacy policy')}</Link>.
      </p>
    </div>
  )
}
