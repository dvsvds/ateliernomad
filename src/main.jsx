import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { VoorraadProvider } from './context/VoorraadContext.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VoorraadProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </VoorraadProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
