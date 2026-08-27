import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import { brand } from '../data/site.js'

export default function Contact() {
  useReveal()
  useSeo({
    title: 'Contact',
    description: 'Neem contact op met Atelier Nomad voor vragen over producten, maatwerk, verzending of samenwerking.',
  })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // TODO: koppel een mailservice of formulier-backend (Formspree, Resend, eigen API).
    setSent(true)
  }

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Contact</span>
        <h1 className="display reveal" data-delay="1">Laten we praten</h1>
        <p className="lead measure reveal" data-delay="2">
          Een vraag over een stuk, maatwerk of samenwerking? We horen graag van je.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <form className="reveal" onSubmit={submit}>
            {sent && <p className="notice" style={{ marginBottom: '1.2rem' }}>Dank je wel — je bericht is verstuurd. We reageren binnen 1–2 werkdagen. ✦</p>}
            <div className="field">
              <label htmlFor="name">Naam</label>
              <input id="name" name="name" required placeholder="Je naam" />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" name="email" required placeholder="je@email.com" />
            </div>
            <div className="field">
              <label htmlFor="subject">Onderwerp</label>
              <select id="subject" name="subject">
                <option>Algemene vraag</option>
                <option>Vraag over een product</option>
                <option>Maatwerk / op bestelling</option>
                <option>Verzending &amp; retour</option>
                <option>Samenwerking / pers</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Bericht</label>
              <textarea id="message" name="message" required placeholder="Waarmee kunnen we je helpen?"></textarea>
            </div>
            <button className="btn btn--terracotta" type="submit">Verstuur bericht <span className="btn__icon" aria-hidden>→</span></button>
          </form>

          <aside className="reveal" data-delay="1">
            <div className="info-card">
              <h4>E-mail</h4>
              <p style={{ margin: 0 }}><a href={`mailto:${brand.email}`} className="link-underline">{brand.email}</a></p>
            </div>
            <div className="info-card">
              <h4>Telefoon</h4>
              <p style={{ margin: 0 }}><a href={`tel:${brand.phone.replace(/[^+\d]/g,'')}`} className="link-underline">{brand.phone}</a></p>
            </div>
            <div className="info-card">
              <h4>Instagram</h4>
              <p style={{ margin: 0 }}><a href={brand.instagram} target="_blank" rel="noreferrer" className="link-underline">{brand.instagramHandle}</a></p>
            </div>
            <div className="info-card">
              <h4>Atelier &amp; basis</h4>
              <p style={{ margin: 0 }}>{brand.city}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
