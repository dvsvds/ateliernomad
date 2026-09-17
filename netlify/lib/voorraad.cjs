/* ============================================================
   voorraad — wie is verkocht, wie is gereserveerd
   ------------------------------------------------------------
   Elke pouf bestaat één keer. Zonder dit bestand kon hetzelfde stuk
   twee keer verkocht worden: de collectie in products.js weet niets
   van betalingen. De stand staat daarom op de server, in Netlify
   Blobs, en verandert zonder dat er code aan te pas komt:

     reserveren   bij het aanmaken van een Stripe-sessie (30 minuten,
                  gelijk aan de levensduur van die sessie)
     verkocht     zodra Stripe meldt dat er betaald is
     vrijgeven    als de sessie verloopt zonder betaling

   Alleen unieke stukken (max 1 in de catalogus) worden bijgehouden —
   dat is op dit moment de hele collectie, poufs én kussens.

   Opslag: één record PER STUK, sleutel = slug. Dat is met opzet: Blobs
   leest kort na een schrijfactie soms nog een oude versie. Reserveren
   is daarom "maak aan, alleen als het nog niet bestaat" — dat beslist
   de server zelf, zonder eerst te hoeven lezen. Twee klanten die
   tegelijk dezelfde pouf afrekenen: precies één wint.

   Kan de stand niet gelezen of geschreven worden, dan wordt een stuk
   NIET verkocht (fout aan de veilige kant). De klant ziet dan dat het
   stuk even niet beschikbaar is en kan het zo opnieuw proberen.
   ============================================================ */

const RESERVERING_MS = 30 * 60 * 1000
const NAAM = 'voorraad'

/* ---------- opslag ---------- */

let geheugen = null // terugval zonder Blobs, alleen lokaal (tests)

function geheugenStore() {
  const m = new Map()
  const etag = () => Math.random().toString(36).slice(2)
  return {
    async getWithMetadata(k) { const r = m.get(k); return r ? { data: JSON.parse(r.json), etag: r.etag } : null },
    async setJSON(k, v, o = {}) {
      const r = m.get(k)
      if (o.onlyIfNew && r) return { modified: false }
      if (o.onlyIfMatch && (!r || r.etag !== o.onlyIfMatch)) return { modified: false }
      const e = etag(); m.set(k, { json: JSON.stringify(v), etag: e }); return { modified: true, etag: e }
    },
    async delete(k) { m.delete(k) },
    async list() { return { blobs: [...m.keys()].map((key) => ({ key })) } },
  }
}

function maakStore(event) {
  const { getStore, connectLambda } = require('@netlify/blobs')
  let fout
  // Nieuwere runtimes geven de Blobs-context via een omgevingsvariabele,
  // oudere via `event.blobs`. Eerst de omgeving, dan het event.
  try { return getStore(NAAM) } catch (e1) { fout = e1.message }
  try { if (event) { connectLambda(event); return getStore(NAAM) } } catch (e2) { fout = e2.message }
  if (process.env.NETLIFY) throw new Error('Netlify Blobs niet beschikbaar: ' + fout)
  if (!geheugen) { console.error('Netlify Blobs niet beschikbaar, geheugen-terugval (alleen lokaal):', fout); geheugen = geheugenStore() }
  return geheugen
}

const verlopen = (r) => r && !r.verkocht && r.tot < Date.now()

/* ---------- publieke functies ---------- */

/* Alles wat verkocht of (nog geldig) gereserveerd is. */
async function stand(event) {
  const store = maakStore(event)
  const { blobs } = await store.list()
  const uit = { verkocht: [], gereserveerd: [] }
  for (const { key } of blobs) {
    // Overblijfsel van een ouder ontwerp (één document voor alles): opruimen.
    if (key === 'stand') { await store.delete(key).catch(() => {}); continue }
    const r = await store.getWithMetadata(key, { type: 'json' })
    const d = r && r.data
    if (!d || verlopen(d)) continue
    if (d.verkocht === true) uit.verkocht.push(key)
    else if (typeof d.sessie === 'string') uit.gereserveerd.push(key)
  }
  return uit
}

/* Reserveert `slugs` voor `sessieId`. Geeft { ok, etags } of
   { ok: false, verkocht: [...], gereserveerd: [...] }. Lukt één stuk niet,
   dan worden de andere meteen weer losgelaten. Zonder slugs: niets doen. */
async function reserveer(event, slugs, sessieId) {
  if (!slugs.length) return { ok: true, etags: {} }
  let store
  try { store = maakStore(event) } catch (err) {
    console.error(err.message)
    // Veilige kant: niet verkopen als we het niet kunnen bewaken.
    return { ok: false, verkocht: [], gereserveerd: slugs, onbeschikbaar: true }
  }
  const etags = {}
  const geweigerd = { verkocht: [], gereserveerd: [] }
  const record = { sessie: sessieId, tot: Date.now() + RESERVERING_MS }

  for (const slug of slugs) {
    // 1. Nog geen record? Dan is dit de atomaire claim.
    const nieuw = await store.setJSON(slug, record, { onlyIfNew: true })
    if (nieuw.modified) { etags[slug] = nieuw.etag; continue }
    // 2. Er is een record. Verkocht, van een ander, of verlopen?
    const r = await store.getWithMetadata(slug, { type: 'json' })
    const d = r && r.data
    if (!d) { geweigerd.gereserveerd.push(slug); continue } // bestaat, maar (nog) niet leesbaar: niet gokken
    if (d.verkocht) { geweigerd.verkocht.push(slug); continue }
    if (d.sessie === sessieId || verlopen(d)) {
      // eigen reservering verlengen, of een verlopen reservering overnemen
      const w = await store.setJSON(slug, record, { onlyIfMatch: r.etag })
      if (w.modified) { etags[slug] = w.etag; continue }
    }
    geweigerd.gereserveerd.push(slug)
  }

  if (geweigerd.verkocht.length || geweigerd.gereserveerd.length) {
    for (const slug of Object.keys(etags)) await store.delete(slug).catch(() => {})
    return { ok: false, ...geweigerd }
  }
  return { ok: true, etags }
}

/* De checkout reserveert eerst onder een tijdelijk id (de Stripe-sessie
   bestaat dan nog niet) en zet de reservering daarna over op de echte
   sessie-id, zodat een verlopen sessie hem kan vrijgeven. Gebruikt de
   etags van de reservering zelf, dus geen lezing nodig. */
async function draagOver(event, etags, vanId, naarId) {
  const store = maakStore(event)
  const tot = Date.now() + RESERVERING_MS
  for (const [slug, etag] of Object.entries(etags)) {
    let w = await store.setJSON(slug, { sessie: naarId, tot }, { onlyIfMatch: etag })
    if (!w.modified) {
      // Etag verouderd (bv. eigen reservering intussen verlengd): opnieuw lezen
      // en alleen overzetten als het record nog van ons is.
      const r = await store.getWithMetadata(slug, { type: 'json' })
      if (r && r.data && r.data.sessie === vanId) w = await store.setJSON(slug, { sessie: naarId, tot }, { onlyIfMatch: r.etag })
    }
    if (!w.modified) console.error('voorraad: overdracht van reservering mislukt voor', slug)
  }
}

/* Betaald: definitief verkocht. De webhook is hier de baas, dus geen
   voorwaarden. */
async function markeerVerkocht(event, slugs, sessieId) {
  if (!slugs.length) return
  const store = maakStore(event)
  const wanneer = new Date().toISOString()
  for (const slug of slugs) await store.setJSON(slug, { verkocht: true, wanneer, sessie: sessieId })
}

/* Sessie verlopen zonder betaling: de stukken van die sessie weer vrij.
   Alleen als het record nog van die sessie is en niet verkocht. */
async function geefVrij(event, slugs, sessieId) {
  if (!slugs.length) return
  const store = maakStore(event)
  for (const slug of slugs) {
    const r = await store.getWithMetadata(slug, { type: 'json' })
    const d = r && r.data
    if (d && !d.verkocht && d.sessie === sessieId) await store.delete(slug)
  }
}

/* Alleen voor tests. */
function _reset() { geheugen = null }

module.exports = { stand, reserveer, draagOver, markeerVerkocht, geefVrij, RESERVERING_MS, _reset }
