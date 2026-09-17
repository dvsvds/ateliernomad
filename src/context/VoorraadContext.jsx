import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Welke stukken zijn verkocht of gereserveerd. Komt van de server
 * (netlify/functions/voorraad) en verandert dus zonder nieuwe deploy.
 *
 * Wordt ververst bij elke paginawissel en als het tabblad weer actief
 * wordt. Lukt ophalen niet (bv. lokaal zonder functies), dan geldt alles
 * als beschikbaar — de checkout controleert het sowieso nog een keer.
 */
const VoorraadContext = createContext({ status: () => 'beschikbaar', ververs: () => {} })

export function VoorraadProvider({ children }) {
  const [stand, setStand] = useState({ verkocht: [], gereserveerd: [] })
  const { pathname } = useLocation()

  const ververs = useCallback(async () => {
    try {
      const res = await fetch('/.netlify/functions/voorraad', { cache: 'no-store' })
      if (!res.ok) return
      const d = await res.json()
      setStand({ verkocht: d.verkocht || [], gereserveerd: d.gereserveerd || [] })
    } catch {
      /* zie boven: dan blijft de laatste bekende stand staan */
    }
  }, [])

  useEffect(() => { ververs() }, [pathname, ververs])
  useEffect(() => {
    const onFocus = () => { if (document.visibilityState === 'visible') ververs() }
    document.addEventListener('visibilitychange', onFocus)
    return () => document.removeEventListener('visibilitychange', onFocus)
  }, [ververs])

  const value = useMemo(() => ({
    status: (slug) =>
      stand.verkocht.includes(slug) ? 'verkocht'
      : stand.gereserveerd.includes(slug) ? 'gereserveerd'
      : 'beschikbaar',
    ververs,
  }), [stand, ververs])

  return <VoorraadContext.Provider value={value}>{children}</VoorraadContext.Provider>
}

export const useVoorraad = () => useContext(VoorraadContext)

export const STATUS_TEKST = {
  verkocht: 'Verkocht',
  gereserveerd: 'Gereserveerd',
}
