import { useState } from 'react'
import { Link } from '../components/TaalLink.jsx'
import useReveal from '../hooks/useReveal.js'
import useSeo, { SITE_URL } from '../hooks/useSeo.js'
import { useTaal } from '../i18n.js'
import { formatPrice } from '../data/products.js'
import { shop } from '../data/site.js'

/* Poefvulling-calculator: hoeveel liter vulling heeft een poef nodig?
   De verhouding komt uit onze eigen ervaring die ook in de gids en de FAQ
   staat: een poef van 60 × 60 × 20 cm (72 liter) vraagt ongeveer 100 liter
   losse vulling, omdat vulling inklinkt. 100 / 72 ≈ 1,4. */
const INKLINK = 100 / 72
const ZAK = 50 // liter per zak schuimvlokken of vulkorrels, een gangbare maat

function liters({ vorm, lengte, breedte, hoogte, diameter }) {
  const h = Number(hoogte) || 0
  const netto = vorm === 'rond'
    ? Math.PI * ((Number(diameter) || 0) / 2) ** 2 * h / 1000
    : (Number(lengte) || 0) * (Number(breedte) || 0) * h / 1000
  return { netto, vulling: netto * INKLINK }
}

export default function Vulcalculator() {
  useReveal()
  const { t, lp } = useTaal()
  const [maat, setMaat] = useState({ vorm: 'vierkant', lengte: 60, breedte: 60, hoogte: 20, diameter: 50 })
  const { netto, vulling } = liters(maat)
  const rond = (n) => Math.round(n)
  const zakken = Math.ceil(vulling / ZAK)
  const zet = (k) => (e) => setMaat((m) => ({ ...m, [k]: e.target.value }))

  useSeo({
    title: t('Poefvulling berekenen: hoeveel liter?', 'Pouf filling calculator: how many litres?'),
    description: t(
      'Bereken hoeveel liter vulling je poef nodig heeft. Vul de maten in: een poef van 60 × 60 × 20 cm vraagt ongeveer 100 liter vulling.',
      'Work out how many litres of filling your pouf needs. Enter its size: a 60 × 60 × 20 cm pouf takes about 100 litres of filling.',
    ),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t('Poefvulling-calculator', 'Pouf filling calculator'),
      url: SITE_URL + lp('/poefvulling-berekenen'),
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@id': `${SITE_URL}/#winkel` },
    },
  })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">{t('Calculator', 'Calculator')}</span>
        <h1 className="display reveal" data-delay="1">{t('Hoeveel vulling heb je nodig?', 'How much filling do you need?')}</h1>
        <p className="lead measure reveal" data-delay="2">
          {t(
            'Een poef van 60 × 60 × 20 cm heeft ongeveer 100 liter vulling nodig: meer dan zijn inhoud van 72 liter, omdat vulling inklinkt. Vul hieronder de maten van jouw poef in.',
            'A 60 × 60 × 20 cm pouf needs about 100 litres of filling: more than its 72-litre volume, because filling settles. Enter the size of your pouf below.',
          )}
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="vulcalc">
          <form className="vulcalc__form reveal" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="vorm">{t('Vorm', 'Shape')}</label>
              <select id="vorm" value={maat.vorm} onChange={zet('vorm')}>
                <option value="vierkant">{t('Vierkant of rechthoekig', 'Square or rectangular')}</option>
                <option value="rond">{t('Rond', 'Round')}</option>
              </select>
            </div>
            {maat.vorm === 'rond' ? (
              <div className="field">
                <label htmlFor="diameter">{t('Diameter (cm)', 'Diameter (cm)')}</label>
                <input id="diameter" type="number" min="1" inputMode="numeric" value={maat.diameter} onChange={zet('diameter')} />
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="lengte">{t('Lengte (cm)', 'Length (cm)')}</label>
                  <input id="lengte" type="number" min="1" inputMode="numeric" value={maat.lengte} onChange={zet('lengte')} />
                </div>
                <div className="field">
                  <label htmlFor="breedte">{t('Breedte (cm)', 'Width (cm)')}</label>
                  <input id="breedte" type="number" min="1" inputMode="numeric" value={maat.breedte} onChange={zet('breedte')} />
                </div>
              </>
            )}
            <div className="field">
              <label htmlFor="hoogte">{t('Hoogte (cm)', 'Height (cm)')}</label>
              <input id="hoogte" type="number" min="1" inputMode="numeric" value={maat.hoogte} onChange={zet('hoogte')} />
            </div>
          </form>

          <div className="vulcalc__uitkomst reveal" data-delay="1" aria-live="polite">
            <span className="eyebrow">{t('Je hebt nodig', 'You need')}</span>
            <p className="vulcalc__getal">± {rond(vulling)} {t('liter', 'litres')}</p>
            <p>{t(`Inhoud van de hoes: ${rond(netto)} liter. Losse vulling klinkt in, dus reken op ongeveer 40% meer.`, `Volume of the cover: ${rond(netto)} litres. Loose filling settles, so allow about 40% more.`)}</p>
            {zakken > 0 && <p>{t(`Koop je schuimvlokken of vulkorrels per zak van ${ZAK} liter, dan heb je er ${zakken} nodig.`, `Buying foam flakes or beads in ${ZAK}-litre bags? You need ${zakken}.`)}</p>}
          </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: '2.5rem' }}>
          <p className="notice reveal" style={{ maxWidth: 700 }}>
            {t('Welke vulling kies je, en hoe krijg je hem strak?', 'Which filling should you choose, and how do you get it firm?')}{' '}
            <Link to="/poef-vullen" className="link-underline">{t('Lees de gids over poef vullen', 'Read the guide to filling a pouf')}</Link>.{' '}
            {t(`Liever niet zelf vullen? Elke Berber poef in onze winkel kun je gevuld bestellen voor ${formatPrice(shop.vulPrijs)} extra.`, `Rather not fill it yourself? Every Berber pouf in our shop can be ordered filled for ${formatPrice(shop.vulPrijs)} extra.`)}{' '}
            <Link to="/poefs" className="link-underline">{t('Bekijk de Berber poefs', 'Browse the Berber poufs')}</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
