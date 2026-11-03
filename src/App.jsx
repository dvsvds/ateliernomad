import { Routes, Route, useLocation } from 'react-router-dom'
import { lokaal } from './i18n.js'
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

const PAGINAS = [
  ['/', <Home />],
  ['/shop', <Shop />],
  ['/poefs', <Shop soort="poufs" />],
  ['/kussens', <Shop soort="kussens" />],
  ['/gidsen', <Gidsen />],
  ...gidsen.map((g) => [`/${g.slug}`, <Gids slug={g.slug} />]),
  ['/product/:slug', <Product />],
  ['/over', <About />],
  ['/ambacht', <Craftsmanship />],
  ['/contact', <Contact />],
  ['/faq', <FAQ />],
  ['/bedankt', <Success />],
  ['/voorwaarden', <Legal doc="voorwaarden" />],
  ['/privacy', <Legal doc="privacy" />],
  ['/verzending', <Legal doc="verzending" />],
]

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          {/* Elke pagina twee keer: Nederlands, en Engels onder /en (zie src/i18n.js). */}
          {PAGINAS.flatMap(([pad, element]) => [
            <Route key={pad} path={pad} element={element} />,
            <Route key={`en${pad}`} path={lokaal(pad, 'en')} element={element} />,
          ])}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
