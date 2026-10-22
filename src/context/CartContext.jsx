import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { verversWinkelwagen } from '../lib/cartSync.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'atelier-nomad-cart'
// useLayoutEffect geeft een waarschuwing bij het vooraf renderen op de server.
const useLaadEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      // Unieke stukken (elke pouf bestaat één keer) kunnen maar één keer
      // in de winkelwagen — nogmaals toevoegen verandert het aantal niet.
      const max = action.item.unique ? 1 : Infinity
      const found = state.find((i) => i.slug === action.item.slug)
      if (found) {
        return state.map((i) =>
          i.slug === action.item.slug
            ? { ...i, qty: Math.min(max, i.qty + (action.item.qty || 1)) }
            : i
        )
      }
      return [...state, { ...action.item, qty: Math.min(max, action.item.qty || 1) }]
    }
    case 'remove':
      return state.filter((i) => i.slug !== action.slug)
    case 'qty':
      return state
        .map((i) =>
          i.slug === action.slug
            ? { ...i, qty: Math.min(i.unique ? 1 : Infinity, Math.max(1, action.qty)) }
            : i
        )
        .filter((i) => i.qty > 0)
    case 'clear':
      return []
    case 'load':
      return action.items
    default:
      return state
  }
}

function laad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    // Nooit klakkeloos laden: verkochte stukken en oude prijzen eruit.
    return verversWinkelwagen(raw ? JSON.parse(raw) : [])
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  /* Begint leeg en laadt de bewaarde wagen pas na de eerste render: de
     pagina's worden vooraf als HTML gerenderd (zonder winkelwagen), en de
     eerste render in de browser moet daar exact mee overeenkomen. */
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setIsOpen] = useState(false)
  const geladen = useRef(false)

  // Layout-effect: loopt vóór de gewone effects van de pagina's, zodat
  // bv. het legen van de wagen op /bedankt ná het laden gebeurt.
  useLaadEffect(() => {
    dispatch({ type: 'load', items: laad() })
  }, [])

  useEffect(() => {
    // De eerste keer staat hier nog de lege beginwagen: niet over de bewaarde heen schrijven.
    if (!geladen.current) { geladen.current = true; return }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0)
    return {
      items, count, subtotal, isOpen,
      add: (item) => { dispatch({ type: 'add', item }); setIsOpen(true) },
      remove: (slug) => dispatch({ type: 'remove', slug }),
      setQty: (slug, qty) => dispatch({ type: 'qty', slug, qty }),
      clear: () => dispatch({ type: 'clear' }),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }
  }, [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart moet binnen <CartProvider> gebruikt worden')
  return ctx
}
