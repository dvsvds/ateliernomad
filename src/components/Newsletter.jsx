import { useState } from 'react'

export default function Newsletter({ dark = false }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: koppel hier je e-mailprovider (Mailchimp, Klaviyo, Brevo…)
    setDone(true)
    setEmail('')
  }

  return (
    <div className={`newsletter container ${dark ? '' : ''}`} style={{ maxWidth: 720 }}>
      <span className="eyebrow eyebrow--muted">Blijf op de hoogte</span>
      <h2 className="h2">Word lid van de Nomad-cirkel</h2>
      <p className="lead mx-auto measure">
        Nieuwe collecties, verhalen uit het atelier en stille pre-sales — een paar keer per jaar, nooit spam.
      </p>
      {done ? (
        <p className="notice mx-auto" style={{ maxWidth: 460, marginTop: '1.5rem' }}>
          Dank je wel — je staat op de lijst. ✦
        </p>
      ) : (
        <form className="newsletter__form" onSubmit={submit}>
          <input
            type="email" required placeholder="Je e-mailadres"
            value={email} onChange={(e) => setEmail(e.target.value)}
            aria-label="E-mailadres"
          />
          <button className="btn btn--terracotta" type="submit">Inschrijven</button>
        </form>
      )}
      <p className="newsletter__note">Door je in te schrijven ga je akkoord met ons privacybeleid.</p>
    </div>
  )
}
