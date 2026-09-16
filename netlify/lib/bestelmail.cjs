/* ============================================================
   bestelmail — de bevestiging die een klant na betaling krijgt
   ------------------------------------------------------------
   Zuivere functie: krijgt een Stripe Checkout-sessie en de
   artikelregels, en geeft onderwerp, HTML en platte tekst terug.
   Versturen gebeurt in netlify/functions/stripe-webhook.cjs.

   E-mailprogramma's negeren de meeste moderne CSS. Daarom tabellen
   en inline stijlen, en lettertypes met een veilige terugval: de
   webfonts van de site laden in vrijwel geen enkele mailbox.
   ============================================================ */

// Gelijk houden met src/data/site.js (shop.deliveryTime, returnDays, btwTarief)
const LEVERTIJD = '2–4 werkdagen'
const BEDENKTIJD = 14
const BTW = 0.21
const KBO = '1035.137.874'

const KLEUR = {
  achtergrond: '#F2EADB', kaart: '#FAF6EF', inkt: '#2F2A24', zacht: '#4A4339',
  gedempt: '#837868', lijn: '#E3D8C6', accent: '#BC6B45',
}
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif"
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"

const LANDEN = {
  BE: 'België', NL: 'Nederland', DE: 'Duitsland', FR: 'Frankrijk', LU: 'Luxemburg', AT: 'Oostenrijk',
  ES: 'Spanje', IT: 'Italië', PT: 'Portugal', DK: 'Denemarken', SE: 'Zweden', FI: 'Finland', IE: 'Ierland',
}

const euro = (centen) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format((centen || 0) / 100)

// Namen en adressen komen van de klant: altijd escapen voor ze in HTML gaan.
const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const bestelcode = (id) => 'AN-' + String(id || '').slice(-8).toUpperCase()

function leesSessie(session, regels) {
  const klant = session.customer_details || {}
  // Nieuwere API-versies zetten het leveradres onder collected_information.
  const lever = session.collected_information?.shipping_details || session.shipping_details || null
  const a = lever?.address || klant.address || null
  const naam = (lever?.name || klant.name || '').trim()
  const totaal = session.amount_total || 0
  return {
    naam,
    voornaam: naam.split(/\s+/)[0] || '',
    adres: a
      ? [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(' '), LANDEN[a.country] || a.country].filter(Boolean)
      : [],
    code: bestelcode(session.id),
    artikelen: (regels || []).map((r) => ({
      naam: r.description,
      aantal: r.quantity,
      bedrag: r.amount_total,
      beeld: r.price?.product?.images?.[0] || null,
    })),
    verzending: session.shipping_cost?.amount_total || 0,
    totaal,
    // Rekent Stripe Tax zelf niets (nog geen registratie), dan tonen we de
    // btw die in de prijs zit, net als in de winkelwagen: bedrag x 21/121.
    btw: session.total_details?.amount_tax || Math.round((totaal * BTW) / (1 + BTW)),
  }
}

function maakBevestiging({ session, regels, siteUrl, siteNaam = 'ateliernomàd.be' }) {
  const d = leesSessie(session, regels)
  const heeftPouf = d.artikelen.some((a) => /pouf/i.test(a.naam || ''))
  const onderwerp = `Bedankt voor je bestelling ${d.code} — Atelier Nomàd`
  const aanhef = d.voornaam ? `Bedankt, ${esc(d.voornaam)}.` : 'Bedankt voor je bestelling.'

  const p = (tekst, extra = '') =>
    `<p style="margin:0 0 14px;font:15px/1.65 ${SANS};color:${KLEUR.zacht};${extra}">${tekst}</p>`

  const regelsHtml = d.artikelen.length
    ? d.artikelen.map((a) => `
        <tr>
          <td width="72" style="padding:12px 12px 12px 0;vertical-align:top">
            ${a.beeld
              ? `<img src="${esc(a.beeld)}" width="64" height="80" alt="" style="display:block;width:64px;height:80px;object-fit:cover;border-radius:8px;background:${KLEUR.achtergrond}">`
              : `<div style="width:64px;height:80px;border-radius:8px;background:${KLEUR.achtergrond}"></div>`}
          </td>
          <td style="padding:12px 0;vertical-align:top;font:15px/1.4 ${SANS};color:${KLEUR.inkt}">
            ${esc(a.naam)}<br>
            <span style="font-size:13px;color:${KLEUR.gedempt}">Aantal: ${a.aantal}</span>
          </td>
          <td align="right" style="padding:12px 0;vertical-align:top;font:15px/1.4 ${SANS};color:${KLEUR.inkt};white-space:nowrap">${euro(a.bedrag)}</td>
        </tr>`).join('')
    : `<tr><td colspan="3" style="padding:12px 0;font:14px/1.5 ${SANS};color:${KLEUR.gedempt}">Je artikelen staan op het betalingsbewijs van Stripe.</td></tr>`

  const somRegel = (label, bedrag, sterk = false) => `
        <tr>
          <td colspan="2" style="padding:4px 0;font:${sterk ? '600 16px' : '14px'}/1.4 ${SANS};color:${sterk ? KLEUR.inkt : KLEUR.zacht}">${label}</td>
          <td align="right" style="padding:4px 0;font:${sterk ? '600 16px' : '14px'}/1.4 ${SANS};color:${sterk ? KLEUR.inkt : KLEUR.zacht};white-space:nowrap">${bedrag}</td>
        </tr>`

  const html = `<!doctype html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(onderwerp)}</title></head>
<body style="margin:0;padding:0;background:${KLEUR.achtergrond}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${KLEUR.achtergrond}">
    <tr><td align="center" style="padding:32px 12px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${KLEUR.kaart};border-radius:16px">
        <tr><td style="padding:36px 32px 8px">
          <div style="font:600 12px/1 ${SANS};letter-spacing:.2em;text-transform:uppercase;color:${KLEUR.accent}">Atelier Nomàd</div>
          <h1 style="margin:18px 0 14px;font:400 32px/1.15 ${SERIF};color:${KLEUR.inkt}">${aanhef}</h1>
          ${p(`Je betaling is gelukt. We pakken je bestelling met zorg in en versturen binnen ${LEVERTIJD}. Zodra het pakket onderweg is, krijg je een track &amp; trace.`)}
          ${p(`Bestelnummer <strong style="color:${KLEUR.inkt}">${d.code}</strong>`, `font-size:14px`)}
        </td></tr>

        <tr><td style="padding:8px 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${KLEUR.lijn}">
            ${regelsHtml}
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${KLEUR.lijn};margin-top:4px;padding-top:8px">
            ${somRegel('Verzending', euro(d.verzending))}
            ${somRegel('Totaal', euro(d.totaal), true)}
            ${somRegel(`waarvan btw (${Math.round(BTW * 100)}%)`, euro(d.btw))}
          </table>
        </td></tr>

        ${d.adres.length ? `
        <tr><td style="padding:20px 32px 4px">
          <div style="font:600 12px/1 ${SANS};letter-spacing:.14em;text-transform:uppercase;color:${KLEUR.gedempt};margin-bottom:10px">Leveradres</div>
          ${p(`${d.naam ? esc(d.naam) + '<br>' : ''}${d.adres.map(esc).join('<br>')}`)}
        </td></tr>` : ''}

        ${heeftPouf ? `
        <tr><td style="padding:4px 32px">
          <div style="background:${KLEUR.achtergrond};border-radius:12px;padding:16px 18px">
            ${p(`<strong style="color:${KLEUR.inkt}">Goed om te weten:</strong> je pouf komt ongevuld, als hoes met rits — zo blijft het pakket klein. Vullen doe je zelf, bijvoorbeeld met oude kussens of textielresten. Reken op ongeveer 100 liter.`, 'margin:0')}
          </div>
        </td></tr>` : ''}

        <tr><td style="padding:20px 32px 32px">
          ${p(`Je hebt ${BEDENKTIJD} dagen bedenktijd na ontvangst. Hoe retourneren werkt, lees je op <a href="${esc(siteUrl)}/verzending" style="color:${KLEUR.accent}">onze pagina over verzending &amp; retour</a>.`)}
          ${p('Een vraag over je bestelling? Antwoord gewoon op deze mail.', 'margin:0')}
        </td></tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
        <tr><td align="center" style="padding:18px 12px;font:12px/1.6 ${SANS};color:${KLEUR.gedempt}">
          Atelier Nomàd · ondernemingsnummer ${KBO}<br>
          <a href="${esc(siteUrl)}" style="color:${KLEUR.gedempt}">${esc(siteNaam)}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const tekst = [
    'ATELIER NOMÀD',
    '',
    d.voornaam ? `Bedankt, ${d.voornaam}.` : 'Bedankt voor je bestelling.',
    '',
    `Je betaling is gelukt. We pakken je bestelling met zorg in en versturen binnen ${LEVERTIJD}. Zodra het pakket onderweg is, krijg je een track & trace.`,
    '',
    `Bestelnummer: ${d.code}`,
    '',
    ...(d.artikelen.length ? d.artikelen.map((a) => `${a.aantal} × ${a.naam}  ${euro(a.bedrag)}`) : ['Je artikelen staan op het betalingsbewijs van Stripe.']),
    `Verzending  ${euro(d.verzending)}`,
    `Totaal  ${euro(d.totaal)}  (waarvan btw ${euro(d.btw)})`,
    ...(d.adres.length ? ['', 'Leveradres:', ...(d.naam ? [d.naam] : []), ...d.adres] : []),
    ...(heeftPouf ? ['', 'Goed om te weten: je pouf komt ongevuld, als hoes met rits. Vullen doe je zelf; reken op ongeveer 100 liter.'] : []),
    '',
    `Je hebt ${BEDENKTIJD} dagen bedenktijd na ontvangst. Retourneren: ${siteUrl}/verzending`,
    'Een vraag over je bestelling? Antwoord gewoon op deze mail.',
    '',
    `Atelier Nomàd · ondernemingsnummer ${KBO} · ${siteNaam}`,
  ].join('\n')

  return { onderwerp, html, tekst, code: d.code }
}

module.exports = { maakBevestiging, bestelcode }
