import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo, { SITE_URL } from '../hooks/useSeo.js'
import SmartImage from '../components/SmartImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Price from '../components/Price.jsx'
import PaymentMethods from '../components/PaymentMethods.jsx'
import { getProduct, products, formatPrice } from '../data/products.js'
import { shop } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'
import { useVoorraad, STATUS_TEKST, STATUS_TEKST_EN } from '../context/VoorraadContext.jsx'
import { useTaal, lokaal } from '../i18n.js'
import { vertaalProduct } from '../data/vertaal.js'

/* Zoektitel: wat mensen intypen ("marokkaanse poef", "berber kussen")
   plus de naam van het stuk. "Vloerpouf — Haze" → "Berber poef Haze". */
const kruimel = (product, en) =>
  product.type === 'poufs' ? { name: en ? 'Berber poufs' : 'Berber poefs', pad: '/poefs' }
  : product.type === 'kussens' ? { name: en ? 'Berber cushions' : 'Berber kussens', pad: '/kussens' }
  : { name: 'Shop', pad: '/shop' }

function seoTitel(product, en) {
  const naam = product.name.split('— ').pop()
  return product.type === 'poufs'
    ? (en ? `Berber pouf ${naam} · Moroccan pouf` : `Berber poef ${naam} · Marokkaanse poef`)
    : product.type === 'kussens'
      ? (en ? `Berber cushion ${naam} · Moroccan cushion` : `Berber kussen ${naam} · Marokkaans kussen`)
      : product.name
}

/* Structured data voor Google: product met prijs, beschikbaarheid,
   verzending en retour, plus het kruimelpad. */
function productLd(product, verkocht, taal) {
  const en = taal === 'en'
  const url = SITE_URL + lokaal(`/product/${product.slug}`, taal)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: (product.images || []).map((src) => SITE_URL + src),
      sku: product.slug,
      category: product.categoryLabel,
      ...(product.afmeting && { size: product.afmeting }),
      brand: { '@type': 'Brand', name: 'Atelier Nomàd' },
      offers: {
        '@type': 'Offer',
        url,
        price: product.price.toFixed(2),
        priceCurrency: 'EUR',
        availability: verkocht ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@id': `${SITE_URL}/#winkel` },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: shop.shippingCost.toFixed(2), currency: 'EUR' },
          shippingDestination: shop.verzendlanden.map((land) => ({ '@type': 'DefinedRegion', addressCountry: land })),
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 4, unitCode: 'DAY' },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: shop.verzendlanden,
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: shop.returnDays,
          returnMethod: 'https://schema.org/ReturnByMail',
          // De klant betaalt het terugsturen zelf (zie Verzending & retour).
          returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + lokaal('/', taal) },
        { '@type': 'ListItem', position: 2, name: kruimel(product, en).name, item: SITE_URL + lokaal(kruimel(product, en).pad, taal) },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    },
  ]
}

export default function Product() {
  const { slug } = useParams()
  const { taal, en, t } = useTaal()
  const origineel = getProduct(slug)
  const product = vertaalProduct(origineel, taal)
  const { add, items, open } = useCart()
  const { status } = useVoorraad()
  const [qty, setQty] = useState(1)
  const [gevuld, setGevuld] = useState(false)
  const [beeld, setBeeld] = useState(0)
  // De component wordt hergebruikt tussen producten: aantal en gekozen foto
  // mogen niet meereizen naar het volgende product.
  useEffect(() => { setQty(1); setBeeld(0); setGevuld(false) }, [slug])
  const ctaRef = useRef(null)
  const [showSticky, setShowSticky] = useState(false)
  useReveal([slug])

  /* Sticky knop op mobiel: verschijnt zodra de gewone knop uit beeld is,
     en verdwijnt weer bij de footer zodat die niet bedekt wordt. */
  useEffect(() => {
    const cta = ctaRef.current
    const footer = document.querySelector('.footer')
    if (!cta || !('IntersectionObserver' in window)) return
    const seen = { cta: true, footer: false }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { seen[e.target === cta ? 'cta' : 'footer'] = e.isIntersecting })
      setShowSticky(!seen.cta && !seen.footer)
    })
    io.observe(cta)
    if (footer) io.observe(footer)
    return () => { io.disconnect(); setShowSticky(false) }
  }, [slug])
  const verkocht = product?.unique && status(product.slug) === 'verkocht'
  useSeo(product ? {
    title: seoTitel(product, en),
    description: en
      ? `${product.short} ${product.categoryLabel}, handmade in Morocco. One of a kind, ${formatPrice(product.price)}. Ships across the EU in 2–4 working days.`
      : `${product.short} ${product.categoryLabel}, met de hand gemaakt in Marokko. Uniek, ${formatPrice(product.price)}. Verzending in België en de EU in ${shop.deliveryTime}.`,
    image: product.images?.[0],
    type: 'product',
    jsonLd: productLd(product, verkocht, taal),
  } : { title: t('Product niet gevonden', 'Product not found'), noindex: true })

  if (!product) {
    return (
      <section className="section container center">
        <h1 className="h2">{t('Product niet gevonden', 'Product not found')}</h1>
        <p><Link to="/shop" className="btn btn--ghost">{t('Terug naar de shop', 'Back to the shop')} <span className="btn__icon">→</span></Link></p>
      </section>
    )
  }

  /* Een uniek stuk dat al in de winkelwagen zit, kan er niet nog eens in:
     de knop opent dan de winkelwagen in plaats van niets te doen. */
  const inCart = product.unique && items.some((i) => i.slug === product.slug)
  const stand = product.unique ? status(product.slug) : 'beschikbaar'
  const weg = stand !== 'beschikbaar'
  // Poefs: ongevuld (standaard) of gevuld tegen shop.vulPrijs extra.
  const vol = !!product.vulbaar && gevuld
  const prijs = product.price + (vol ? shop.vulPrijs : 0)
  const addToCart = () =>
    inCart
      ? open()
      : add({ slug: product.slug, name: origineel.name, price: prijs, image: product.images?.[0], unique: product.unique, qty: product.unique ? 1 : qty, gevuld: vol })
  const ctaLabel = inCart ? t('Bekijk winkelwagen', 'View cart') : t('In winkelwagen', 'Add to cart')

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)
  const more = related.length ? related : products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
          <Link to="/">Home</Link> &nbsp;/&nbsp; <Link to={kruimel(product, en).pad}>{kruimel(product, en).name}</Link> &nbsp;/&nbsp; <span>{product.name}</span>
        </p>
      </div>

      <section className="section container" style={{ paddingTop: '1.5rem' }}>
        <div className="pdp">
          <div className="pdp__gallery reveal">
            <div className="main">
              <SmartImage key={product.images?.[beeld]} src={product.images?.[beeld]} alt={product.name} label={product.name} loading="eager" sizes="(max-width: 860px) 100vw, 640px" />
            </div>
            {(product.images || []).length > 1 && product.images.map((src, i) => (
              <button
                type="button"
                className={`thumb ${i === beeld ? 'is-active' : ''}`}
                key={src}
                onClick={() => setBeeld(i)}
                aria-label={i === 0 ? t('Voorkant tonen', 'Show front') : t('Achterkant tonen', 'Show back')}
                aria-pressed={i === beeld}
              >
                <SmartImage src={src} alt={`${product.name} — ${t('foto', 'photo')} ${i + 1}`} label="" sublabel="" sizes="(max-width: 860px) 50vw, 320px" />
              </button>
            ))}
          </div>

          <div className="pdp__info reveal" data-delay="1">
            <span className="card__cat">{product.categoryLabel}</span>
            <h1 className="h2" style={{ marginTop: '0.4rem' }}>{product.name}</h1>
            <Price value={prijs} className="pdp__price" />
            <p className="lead">{product.short}</p>
            <p>{product.description}</p>

            <ul className="pdp__list">
              {product.details.map(([k, v]) => (
                <li key={k}><span>{k}</span><span style={{ marginLeft: 'auto', textAlign: 'right' }}>{v}</span></li>
              ))}
            </ul>
            {product.type === 'poufs' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                {t('Hoe vul je een poef?', 'How do you fill a pouf?')} <Link to="/poef-vullen" className="link-underline">{t('Lees onze stap-voor-stap uitleg', 'Read our step-by-step guide')}</Link>.
              </p>
            )}

            {product.vulbaar && !weg && !inCart && (
              <fieldset className="vulkeuze">
                <legend>{t('Levering', 'Delivery')}</legend>
                <label className={!gevuld ? 'is-actief' : ''}>
                  <input type="radio" name="vulling" checked={!gevuld} onChange={() => setGevuld(false)} />
                  <span>{t('Ongevuld, als hoes', 'Unfilled, as a cover')}</span>
                </label>
                <label className={gevuld ? 'is-actief' : ''}>
                  <input type="radio" name="vulling" checked={gevuld} onChange={() => setGevuld(true)} />
                  <span>{t('Gevuld', 'Filled')} <small>+ {formatPrice(shop.vulPrijs)}</small></span>
                </label>
              </fieldset>
            )}

            <div className="pdp__cta" ref={ctaRef}>
              {weg && (
                <p className="pdp__weg" role="status">
                  <strong>{(en ? STATUS_TEKST_EN : STATUS_TEKST)[stand]}.</strong>{' '}
                  {stand === 'verkocht'
                    ? t('Dit stuk heeft een nieuwe eigenaar. Er is er maar één van, dus hij komt niet terug.', 'This piece has a new owner. There is only one, so it won’t be back.')
                    : t('Iemand anders is dit stuk op dit moment aan het afrekenen. Rondt die het niet af, dan komt het binnen een half uur weer vrij.', 'Someone else is checking out this piece right now. If they don’t complete the purchase, it becomes available again within half an hour.')}
                </p>
              )}
              {/* Unieke stukken bestaan één keer — dan is een aantal-keuze onzin */}
              {!product.unique && !weg && (
                <div className="qty" style={{ border: '1px solid var(--line)', borderRadius: 100, padding: '0.4rem 0.6rem' }}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t('Minder', 'Less')}>−</button>
                  <span style={{ minWidth: 24, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label={t('Meer', 'More')}>+</button>
                </div>
              )}
              {weg
                ? <Link to="/shop" className="btn btn--ghost">{t('Bekijk de andere stukken', 'See the other pieces')} <span className="btn__icon" aria-hidden>→</span></Link>
                : <button className="btn btn--terracotta" onClick={addToCart}>
                    {ctaLabel} <span className="btn__icon" aria-hidden>{inCart ? '→' : '+'}</span>
                  </button>}
            </div>
            {product.unique && !weg && (
              <p className="pdp__stock">{t('Uniek stuk — er is er maar één van', 'Unique piece — there is only one')}</p>
            )}

            {/* Vertrouwen vlak bij de knop: alles hieronder moet kloppen
                met src/data/site.js (shop) en de pagina Verzending & retour. */}
            <ul className="trust">
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>{t(`Verzonden binnen ${shop.deliveryTime}`, 'Ships within 2–4 working days')}</b>{t(', met track & trace', ', with tracking')}</span></li>
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>{formatPrice(shop.shippingCost)} {t('verzending', 'shipping')}</b> {t('binnen de EU, per bestelling', 'within the EU, per order')}{shop.gratisAntwerpen && t(' — gratis in de provincie Antwerpen', ' — free in Antwerp province')}</span></li>
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>{shop.returnDays} {t('dagen bedenktijd', 'days to return')}</b> — <Link to="/verzending" className="trust__link">{t('zo werkt retour', 'how returns work')}</Link></span></li>
              <li><span className="trust__icon" aria-hidden>✦</span><span><b>{t('Veilig betalen', 'Secure payment')}</b> {t('via Stripe', 'via Stripe')}</span></li>
            </ul>
            <PaymentMethods className="pdp__pay" />
          </div>
        </div>
      </section>

      <div className={`sticky-cta ${showSticky ? 'is-visible' : ''}`} aria-hidden={!showSticky}>
        <div className="sticky-cta__info">
          <span className="sticky-cta__name">{product.name}</span>
          <Price value={prijs} className="sticky-cta__price" />
        </div>
        <button className="btn btn--terracotta" onClick={addToCart} tabIndex={showSticky ? 0 : -1}>
          {ctaLabel}
        </button>
      </div>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">{t('Misschien ook iets voor jou', 'You might also like')}</span><h2 className="h2">{t('Verder ontdekken', 'Keep exploring')}</h2></div>
          <div className="product-grid">
            {more.map((p, i) => <ProductCard key={p.slug} product={p} delay={(i % 3) + 1} />)}
          </div>
        </div>
      </section>
    </>
  )
}
