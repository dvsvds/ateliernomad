import { useEffect } from 'react'

const SITE = 'Atelier Nomàd'

/** Lichtgewicht SEO-hook: zet title + meta description per pagina (geen extra dependency). */
export default function useSeo({ title, description } = {}) {
  useEffect(() => {
    if (title) document.title = `${title} — ${SITE}`
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    // Geen eigen omschrijving? Dan de standaard uit index.html, niet die van
    // de vorige pagina.
    if (!tag.dataset.standaard) tag.dataset.standaard = tag.getAttribute('content') || ''
    tag.setAttribute('content', description || tag.dataset.standaard)
  }, [title, description])
}
