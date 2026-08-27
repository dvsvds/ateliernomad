import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'atelier-nomad-cart'

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      // Unieke stukken (elke pouf bestaat één keer) kunnen maar één keer
      // in de mand — nogmaals toevoegen verandert het aantal niet.
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
    default:
      return state
  }
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, init)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
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
