import { getProduct } from '../data/products.js'
import { shop } from '../data/site.js'

/**
 * Ververst een opgeslagen winkelwagen aan de hand van de actuele collectie.
 *
 * De wagen staat in localStorage en kan dagen oud zijn: een stuk dat
 * intussen verkocht is, een prijs die veranderd is. De server rekent altijd
 * met de actuele catalogus en laat onbekende stukken stilletjes vallen. De
 * wagen moet dus hetzelfde tonen — anders ziet de klant een ander bedrag
 * dan wat er afgerekend wordt, of denkt hij een stuk te kopen dat er niet
 * meer is.
 *
 * Geeft alleen bestaande stukken terug, met naam, prijs, beeld en `unique`
 * uit products.js, en het aantal binnen de grenzen.
 */
export function verversWinkelwagen(items) {
  if (!Array.isArray(items)) return []
  // Zelfde artikel twee keer in de opslag? Samenvoegen, dan pas begrenzen.
  const perSlug = new Map()
  const gevuld = new Set()
  for (const i of items) {
    if (!i || typeof i.slug !== 'string') continue
    perSlug.set(i.slug, (perSlug.get(i.slug) || 0) + (Math.max(0, parseInt(i.qty, 10)) || 0))
    if (i.gevuld) gevuld.add(i.slug)
  }
  return [...perSlug].flatMap(([slug, aantal]) => {
    const p = getProduct(slug)
    if (!p) return []
    const max = p.unique ? 1 : 20 // zelfde grens als de serverprijslijst
    const qty = Math.min(max, Math.max(1, aantal))
    // Gevuld kan alleen bij poefs, en kost shop.vulPrijs extra (gelijk aan de server).
    const vol = !!p.vulbaar && gevuld.has(slug)
    return [{ slug: p.slug, name: p.name, price: p.price + (vol ? shop.vulPrijs : 0), image: p.images?.[0], unique: !!p.unique, qty, gevuld: vol }]
  })
}
