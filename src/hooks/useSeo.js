import { useEffect } from 'react'

const SITE = 'Atelier Nomàd'

/** Lichtgewicht SEO-hook: zet title + meta description per pagina (geen extra dependency). */
export default function useSeo({ title, description } = {}) {
  useEffect(() => {
    if (title) document.title = `${title} — ${SITE}`
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
