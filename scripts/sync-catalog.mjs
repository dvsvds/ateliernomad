/* ============================================================
   sync-catalog — genereert de serverprijslijsten uit productdata
   ------------------------------------------------------------
   Draai dit na ELKE wijziging aan src/data/products.js:

       node scripts/sync-catalog.mjs

   Het schrijft twee bestanden opnieuw:
     • api/_catalog.js                          (Vercel)
     • netlify/functions/create-checkout-session.cjs
       — alleen het blok tussen de CATALOG-markers

   Waarom: de browser stuurt bij het afrekenen alleen slugs mee,
   nooit prijzen. De server zoekt de prijs hier op. Loopt deze
   lijst achter, dan weigert de checkout producten die wél op de
   site staan — precies wat er gebeurde toen de collectie van 6
   naar 37 stuks ging en alleen Vercel was bijgewerkt.
   ============================================================ */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { alleProducten as products } from '../src/data/products.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const breedte = Math.max(...products.map((p) => p.slug.length)) + 3
const regels = products
  .map((p) => `  ${`'${p.slug}':`.padEnd(breedte)} { name: ${JSON.stringify(p.name)}, price: ${p.price}, max: ${p.unique ? 1 : 20} },`)
  .join('\n')

const kop = `// Serverprijslijst — DE BRON VAN WAARHEID voor betalingen.
// GEGENEREERD door scripts/sync-catalog.mjs — niet met de hand aanpassen.
// Wijzig src/data/products.js en draai het script opnieuw.
// ${products.length} producten.`

await writeFile(
  join(root, 'api/_catalog.js'),
  `${kop}\nexport const CATALOG = {\n${regels}\n}\n`,
  'utf8'
)

const nfPad = join(root, 'netlify/functions/create-checkout-session.cjs')
let nf = await readFile(nfPad, 'utf8')
const start = '// <catalog: gegenereerd door scripts/sync-catalog.mjs — niet met de hand aanpassen>'
const eind = '// </catalog>'
const i = nf.indexOf(start)
const j = nf.indexOf(eind)
if (i === -1 || j === -1) {
  console.error(`✗ Markers niet gevonden in ${nfPad}. Zet ${start} en ${eind} om het CATALOG-blok.`)
  process.exit(1)
}
nf = `${nf.slice(0, i)}${start}\nconst CATALOG = {\n${regels}\n}\n${nf.slice(j)}`
await writeFile(nfPad, nf, 'utf8')

console.log(`✓ ${products.length} producten weggeschreven naar api/_catalog.js en de Netlify-functie`)
