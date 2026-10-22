import { useEffect, useState } from 'react'

let klaar = false

/**
 * false tijdens de allereerste render in de browser (die moet gelijk zijn
 * aan de vooraf gerenderde HTML), daarna altijd true — ook bij latere
 * navigaties binnen de site, zodat er dan niets knippert.
 */
export default function useGehydrateerd() {
  const [ok, setOk] = useState(klaar)
  useEffect(() => { klaar = true; setOk(true) }, [])
  return ok
}
