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

export default function Home() {
  useReveal()
  useSeo({
    title: 'Handcrafted Moroccan Living',
    description: 'Atelier Nomad — unieke vintage Marokkaanse vloerpoufs van gerecyclede Berberkleden, plus handgeweven wollen kussens en meubilair van laurierhout en doumtouw. Elk stuk bestaat maar één keer.',
  })

  return (
    <>
      <Hero />
      <FeaturedCollection />
      <AboutPreview />
      <CraftsmanshipSection />
      <Lifestyle />
      <Testimonials />
      <InstagramGallery />
      <section className="section section--alt">
        <Newsletter />
      </section>
    </>
  )
}
