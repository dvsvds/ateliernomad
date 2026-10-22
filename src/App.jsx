import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CookieBanner from './components/CookieBanner.jsx'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'
import Craftsmanship from './pages/Craftsmanship.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import Gids, { Gidsen } from './pages/Gids.jsx'
import { gidsen } from './data/gidsen.js'
import Success from './pages/Success.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

// Scroll naar boven bij navigatie
function ScrollToTop() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    if (!state?.behoudScroll) window.scrollTo({ top: 0, behavior: 'instant' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/poefs" element={<Shop soort="poufs" />} />
          <Route path="/kussens" element={<Shop soort="kussens" />} />
          <Route path="/gidsen" element={<Gidsen />} />
          {gidsen.map((g) => <Route key={g.slug} path={`/${g.slug}`} element={<Gids slug={g.slug} />} />)}
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/over" element={<About />} />
          <Route path="/ambacht" element={<Craftsmanship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/bedankt" element={<Success />} />
          <Route path="/voorwaarden" element={<Legal doc="voorwaarden" />} />
          <Route path="/privacy" element={<Legal doc="privacy" />} />
          <Route path="/verzending" element={<Legal doc="verzending" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
