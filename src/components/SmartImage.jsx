import { useState } from 'react'

/**
 * Toont je foto zodra die bestaat. Ontbreekt de foto, dan verschijnt
 * een nette, merkkleurige placeholder met de productnaam — zo ziet de
 * site er altijd af uit, ook voordat je je beelden hebt toegevoegd.
 */
export default function SmartImage({ src, alt = '', label, sublabel = 'Atelier Nomàd', loading = 'lazy' }) {
  const [failed, setFailed] = useState(!src)

  return (
    <span className="smart-img">
      {!failed && (
        <img src={src} alt={alt || label || ''} loading={loading} onError={() => setFailed(true)} />
      )}
      {failed && (
        <span className="smart-img__ph" aria-label={alt || label || 'afbeelding'}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          {label && <b>{label}</b>}
          <span>{sublabel}</span>
        </span>
      )}
    </span>
  )
}
