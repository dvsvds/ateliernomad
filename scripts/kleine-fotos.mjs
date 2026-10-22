/* ============================================================
   KLEINE FOTO'S — draait na `vite build` (zie package.json)
   ------------------------------------------------------------
   Maakt van elke productfoto een versie van 700 px breed in
   dist/images/products/klein/. De shop en de kaartjes laden die
   (via srcset in SmartImage); de productpagina gebruikt waar nodig
   nog het origineel. Een nieuw product krijgt zo vanzelf ook een
   kleine versie — je hoeft niets apart te maken.
   ============================================================ */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bron = path.join(root, 'dist/images/products')
const doel = path.join(bron, 'klein')
fs.mkdirSync(doel, { recursive: true })

const fotos = fs.readdirSync(bron).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
await Promise.all(fotos.map((f) => {
  const beeld = sharp(path.join(bron, f)).resize({ width: 700, withoutEnlargement: true })
  const uit = path.join(doel, f)
  return /\.png$/i.test(f) ? beeld.png({ compressionLevel: 9 }).toFile(uit)
    : /\.webp$/i.test(f) ? beeld.webp({ quality: 78 }).toFile(uit)
    : beeld.jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(uit)
}))
console.log(`kleine foto's: ${fotos.length}`)
