import { productenEn, categorieenEn, collectieEn } from './en/producten.js'
import { categories, collectie } from './products.js'

/* Producten in de taal van de pagina. De Nederlandse data in products.js
   blijft de bron (prijs, foto's, slug); de Engelse teksten staan in
   en/producten.js. Ontbreekt een vertaling, dan blijft het Nederlands. */

const SOORT_EN = { poufs: 'Berber pouf', kussens: 'Berber cushion' }

export function productNaam(product, taal) {
  if (taal !== 'en' || !SOORT_EN[product.type]) return product.name
  return `${SOORT_EN[product.type]} — ${product.name.split('— ').pop()}`
}

export function vertaalProduct(product, taal) {
  if (taal !== 'en' || !product) return product
  const en = productenEn[product.slug]
  if (!en) return product
  return {
    ...product,
    ...en,
    name: productNaam(product, taal),
    categoryLabel: SOORT_EN[product.type] || product.categoryLabel,
    tag: product.tag ? en.tag || product.tag : null,
  }
}

export const categorieLabel = (c, taal) => (taal === 'en' ? categorieenEn[c.id] || c.label : c.label)
export const collectieVoor = (taal) => (taal === 'en' ? { ...collectie, ...collectieEn } : collectie)
export { categories }
