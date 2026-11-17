import actie from '../../netlify/lib/actie.json'
import { shop } from '../data/site.js'

/* ============================================================
   ACTIE — kortingscode (nu: Black Friday, 10%)
   ------------------------------------------------------------
   De instellingen staan in netlify/lib/actie.json, zodat de site en de
   betaalfunctie dezelfde code, hetzelfde percentage en dezelfde data
   gebruiken. De server controleert opnieuw: wat hier staat is alleen
   voor de weergave. De korting geldt op de stukken, niet op de vulling
   en niet op de verzending. Data in Belgische tijd, "tot" inbegrepen.
   ============================================================ */
export { actie }

const vandaag = (nu = new Date()) => nu.toLocaleDateString('sv-SE', { timeZone: 'Europe/Brussels' })

/** Einddatum leesbaar: "30 november" / "30 November". */
export const totDatum = (taal) => new Date(actie.tot + 'T12:00:00').toLocaleDateString(taal === 'en' ? 'en-GB' : 'nl-BE', { day: 'numeric', month: 'long' })

export const actieLoopt = (nu) => { const d = vandaag(nu); return d >= actie.van && d <= actie.tot }

export const codeGeldig = (code, nu) => actieLoopt(nu) && String(code || '').trim().toUpperCase() === actie.code

/** Korting in euro op de winkelwagen (alleen de prijs van de stukken). */
export const kortingOp = (items) =>
  Math.round(items.reduce((n, i) => n + (i.price - (i.gevuld ? shop.vulPrijs : 0)) * i.qty * actie.procent, 0)) / 100
