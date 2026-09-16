import { getProduct } from '../data/products.js'

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
  for (const i of items) {
    if (!i || typeof i.slug !== 'string') continue
    perSlug.set(i.slug, (perSlug.get(i.slug) || 0) + (Math.max(0, parseInt(i.qty, 10)) || 0))
  }
  return [...perSlug].flatMap(([slug, aantal]) => {
    const p = getProduct(slug)
    if (!p) return []
    const max = p.unique ? 1 : 20 // zelfde grens als de serverprijslijst
    const qty = Math.min(max, Math.max(1, aantal))
    return [{ slug: p.slug, name: p.name, price: p.price, image: p.images?.[0], unique: !!p.unique, qty }]
  })
}
