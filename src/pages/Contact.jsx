import { useState } from 'react'
import { verstuurFormulier } from '../lib/netlifyForm.js'
import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import { brand } from '../data/site.js'
import { brandEn } from '../data/en/site.js'
import { useTaal } from '../i18n.js'

export default function Contact() {
  useReveal()
  const { en, t } = useTaal()
  useSeo({
    title: 'Contact',
    description: t('Neem contact op met Atelier Nomàd voor vragen over producten, maatwerk, verzending of samenwerking.',
      'Get in touch with Atelier Nomàd with questions about products, custom orders, shipping or collaborations.'),
  })
  // idle | bezig | verzonden | fout
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('bezig')
    const ok = await verstuurFormulier('contact', new FormData(form))
    if (ok) form.reset()
    setStatus(ok ? 'verzonden' : 'fout')
  }

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Contact</span>
        <h1 className="display reveal" data-delay="1">{t('Laten we praten', 'Let’s talk')}</h1>
        <p className="lead measure reveal" data-delay="2">
          {t('Een vraag over een stuk, maatwerk of samenwerking? We horen graag van je.', 'A question about a piece, a custom order or a collaboration? We’d love to hear from you.')}
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <form className="reveal" name="contact" onSubmit={submit}>
            {status === 'verzonden' && (
              <p className="notice" role="status" style={{ marginBottom: '1.2rem' }}>{t('Dank je wel — je bericht is verstuurd. We reageren binnen 1–2 werkdagen. ✦', 'Thank you — your message has been sent. We reply within 1–2 working days. ✦')}</p>
            )}
            {status === 'fout' && (
              <p className="notice" role="alert" style={{ marginBottom: '1.2rem' }}>
                {t('Versturen lukte niet. Mail ons rechtstreeks op', 'Sending failed. Email us directly at')}{' '}
                <a href={`mailto:${brand.email}`} className="link-underline">{brand.email}</a>{t(', dan kijken we er meteen naar.', ' and we’ll look into it right away.')}
              </p>
            )}
            {/* Honeypot tegen spambots: onzichtbaar voor mensen, bots vullen het in. */}
            <p hidden>
              <label>Niet invullen / leave empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <div className="field">
              <label htmlFor="name">{t('Naam', 'Name')}</label>
              <input id="name" name="name" required placeholder={t('Je naam', 'Your name')} />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" name="email" required placeholder="je@email.com" />
            </div>
            <div className="field">
              <label htmlFor="subject">{t('Onderwerp', 'Subject')}</label>
              <select id="subject" name="subject">
                <option>{t('Algemene vraag', 'General question')}</option>
                <option>{t('Vraag over een product', 'Question about a product')}</option>
                <option>{t('Maatwerk / op bestelling', 'Custom order')}</option>
                <option>{t('Verzending & retour', 'Shipping & returns')}</option>
                <option>{t('Samenwerking / pers', 'Collaboration / press')}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">{t('Bericht', 'Message')}</label>
              <textarea id="message" name="message" required placeholder={t('Waarmee kunnen we je helpen?', 'How can we help?')}></textarea>
            </div>
            <button className="btn btn--terracotta" type="submit" disabled={status === 'bezig'}>
              {status === 'bezig' ? t('Bezig met versturen…', 'Sending…') : t('Verstuur bericht', 'Send message')} <span className="btn__icon" aria-hidden>→</span>
            </button>
          </form>

          <aside className="reveal" data-delay="1">
            <div className="info-card">
              <h4>E-mail</h4>
              <p style={{ margin: 0 }}><a href={`mailto:${brand.email}`} className="link-underline">{brand.email}</a></p>
            </div>
            {brand.phone && (
              <div className="info-card">
                <h4>{t('Telefoon', 'Phone')}</h4>
                <p style={{ margin: 0 }}><a href={`tel:${brand.phone.replace(/[^+\d]/g,'')}`} className="link-underline">{brand.phone}</a></p>
              </div>
            )}
            <div className="info-card">
              <h4>Instagram</h4>
              <p style={{ margin: 0 }}><a href={brand.instagram} target="_blank" rel="noreferrer" className="link-underline">{brand.instagramHandle}</a></p>
            </div>
            <div className="info-card">
              <h4>{t('Atelier & basis', 'Atelier & base')}</h4>
              <p style={{ margin: 0 }}>{en ? brandEn.city : brand.city}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
