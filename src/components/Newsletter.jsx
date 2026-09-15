import { useState } from 'react'
import { Link } from 'react-router-dom'
import { verstuurFormulier } from '../lib/netlifyForm.js'

export default function Newsletter({ dark = false }) {
  const [email, setEmail] = useState('')
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
      <span className="eyebrow eyebrow--muted">Blijf op de hoogte</span>
      <h2 className="h2">Word lid van de Nomad-cirkel</h2>
      <p className="lead mx-auto measure">
        Nieuwe collecties, verhalen uit het atelier en stille pre-sales — een paar keer per jaar, nooit spam.
      </p>
      {status === 'klaar' ? (
        <p className="notice mx-auto" style={{ maxWidth: 460, marginTop: '1.5rem' }}>
          Dank je wel — je staat op de lijst. ✦
        </p>
      ) : (
        <form className="newsletter__form" name="nieuwsbrief" onSubmit={submit}>
          {/* Honeypot tegen spambots */}
          <input name="bot-field" hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input
            name="email"
            type="email" required placeholder="Je e-mailadres"
            value={email} onChange={(e) => setEmail(e.target.value)}
            aria-label="E-mailadres"
          />
          <button className="btn btn--terracotta" type="submit" disabled={status === 'bezig'}>
            {status === 'bezig' ? 'Even geduld…' : 'Inschrijven'}
          </button>
        </form>
      )}
      {status === 'fout' && (
        <p className="notice mx-auto" role="alert" style={{ maxWidth: 460, marginTop: '1rem' }}>
          Inschrijven lukte niet. Probeer het later opnieuw, of mail ons.
        </p>
      )}
      <p className="newsletter__note">
        Door je in te schrijven ga je akkoord met ons <Link to="/privacy">privacybeleid</Link>.
      </p>
    </div>
  )
}
