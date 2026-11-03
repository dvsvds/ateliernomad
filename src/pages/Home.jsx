import useReveal from '../hooks/useReveal.js'
import useSeo from '../hooks/useSeo.js'
import Hero from '../sections/Hero.jsx'
import FeaturedCollection from '../sections/FeaturedCollection.jsx'
import AboutPreview from '../sections/AboutPreview.jsx'
import CraftsmanshipSection from '../sections/CraftsmanshipSection.jsx'
import Lifestyle from '../sections/Lifestyle.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import InstagramGallery from '../sections/InstagramGallery.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { testimonials, instagram } from '../data/site.js'
import { useTaal } from '../i18n.js'

export default function Home() {
  useReveal()
  const { t } = useTaal()
  useSeo({
    title: t('Marokkaanse poefs & Berber kussens', 'Moroccan poufs & Berber cushions'),
    description: t('Unieke vintage Marokkaanse poefs, met de hand geknoopt uit Berberkleden, en handgeweven Berber kussens. Elk stuk bestaat maar één keer.',
      'Unique vintage Moroccan poufs, hand-knotted from Berber rugs, and hand-woven Berber cushions. Every piece exists only once. Shipping across the EU.'),
  })

  return (
    <>
      <Hero />
      <FeaturedCollection />
      <AboutPreview />
      <CraftsmanshipSection />
      <Lifestyle />
      {testimonials.length > 0 && <Testimonials />}
      {instagram.length > 0 && <InstagramGallery />}
      <section className="section section--alt">
        <Newsletter />
      </section>
    </>
  )
}
