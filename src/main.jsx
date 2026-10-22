import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { VoorraadProvider } from './context/VoorraadContext.jsx'
import { startAnalytics } from './lib/analytics.js'
import './styles/index.css'

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <VoorraadProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </VoorraadProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Vooraf gerenderde pagina (zie scripts/prerender.mjs)? Dan de bestaande
// HTML overnemen; anders (lokaal met `npm run dev`) gewoon opbouwen.
const root = document.getElementById('root')
if (root.firstElementChild) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)

startAnalytics()
