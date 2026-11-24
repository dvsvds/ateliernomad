/**
 * De laatste Stripe-sessie die DEZE browser startte.
 *
 * Wie op "Afrekenen" klikt, reserveert unieke stukken voor een half uur.
 * Breekt de klant de betaling af (terugknop, tabblad dicht), dan stond het
 * stuk ook voor die klant zelf op "Gereserveerd" en kon die niet opnieuw
 * afrekenen. Daarom onthouden we hier welke sessie van ons is:
 *  - de site toont eigen reserveringen gewoon als beschikbaar;
 *  - bij een nieuwe poging stuurt de checkout de oude sessie-id mee, en
 *    de server sluit die sessie en geeft de stukken vrij.
 * De sessie-id staat ook in de Stripe-URL; wie hem heeft, is de klant.
 */
const KEY = 'atelier-nomad-checkout'

export function eigenCheckout() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!d || typeof d.id !== 'string' || !Array.isArray(d.slugs)) return null
    if (typeof d.tot === 'number' && d.tot < Date.now()) { vergeetCheckout(); return null }
    return d
  } catch { return null }
}

export function onthoudCheckout(id, slugs, tot) {
  try { localStorage.setItem(KEY, JSON.stringify({ id, slugs, tot })) } catch {}
}

export function vergeetCheckout() {
  try { localStorage.removeItem(KEY) } catch {}
}
