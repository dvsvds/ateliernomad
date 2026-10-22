import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import useSeo, { SITE_URL } from '../hooks/useSeo.js'

/* Gids: de poefs worden ongevuld verstuurd, en "poef vullen" is een
   zoekterm waar mensen echt naar zoeken. Houd de tekst praktisch en
   in lijn met de FAQ (ongeveer 100 liter, rits). */
const secties = [
  {
    h: 'Waarom we poefs ongevuld versturen',
    p: [
      'Een gevulde poef is vooral lucht: groot, licht en duur om te verzenden. Als hoes past hij in een klein pakket, dus de verzendkosten blijven laag en het pakket is sneller bij je. Bovendien bepaal je zelf hoe stevig hij wordt — en je geeft spullen die al in huis liggen een tweede leven.',
    ],
  },
  {
    h: 'Hoeveel vulling heb je nodig?',
    p: [
      'Reken op ongeveer 100 liter per poef. Dat is meer dan je denkt: vul liever iets te veel dan te weinig. Een poef die strak gevuld is, houdt zijn vorm, zit steviger en de wol trekt mooier strak over de rand.',
    ],
  },
  {
    h: 'Welke vulling kies je?',
    lijst: [
      'Textielresten en oude kleding — gratis en zwaar, dus de poef staat stevig. Ideaal als basis onderin.',
      'Oude kussens, dekbedden of plaids — vullen snel veel volume en blijven zacht.',
      'Schuimvlokken — licht en veerkrachtig, en houden goed hun vorm. Te koop per zak bij stoffeer- en schuimwinkels.',
      'Vulkorrels (EPS-parels) — heel licht en vormbaar, zoals in een zitzak. Doe ze eerst in een binnenzak, anders krijg je ze nooit meer uit de wol.',
      'Een combinatie — bijvoorbeeld textiel onderin voor gewicht, en een zachter laagje bovenaan om op te zitten.',
    ],
  },
  {
    h: 'Zo vul je je poef, stap voor stap',
    lijst: [
      'Leg de poef op zijn kop en open de rits volledig.',
      'Doe de vulling eerst in een of meer stevige zakken of oude kussenslopen. Zo blijft alles netjes op zijn plek en kun je de hoes later makkelijk weer leeghalen om hem te luchten.',
      'Duw de vulling eerst goed in de hoeken en langs de randen, en werk dan naar het midden toe.',
      'Blijf vullen tot de poef echt strak staat — de rits moet met wat moeite dichtgaan.',
      'Sluit de rits, zet de poef rechtop en klop hem met je handen in vorm.',
    ],
  },
  {
    h: 'Na een paar weken bijvullen',
    p: [
      'Elke vulling zakt in de eerste weken wat in. Voelt je poef zachter of verliest hij zijn vorm, open dan de rits en vul wat bij. Daarna blijft hij lang stevig.',
    ],
  },
  {
    h: 'Je poef onderhouden',
    p: [
      'De wol van een Berber poef heeft weinig nodig: geregeld luchten en uitkloppen is genoeg. Een vlek dep je plaatselijk met een vochtige doek — niet wrijven, en de hoes niet in de wasmachine. Heb je de vulling in zakken gedaan, dan haal je hem in een paar minuten leeg om de hoes buiten te laten luchten.',
    ],
  },
]

export default function PoefVullen() {
  useReveal()
  useSeo({
    title: 'Poef vullen: zo doe je dat, stap voor stap',
    description: 'Je Marokkaanse poef zelf vullen? Hoeveel vulling je nodig hebt (ongeveer 100 liter), welke vulling het best werkt en hoe je hem strak en stevig krijgt.',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Poef vullen: zo doe je dat, stap voor stap',
      inLanguage: 'nl-BE',
      mainEntityOfPage: `${SITE_URL}/poef-vullen`,
      author: { '@id': `${SITE_URL}/#winkel` },
      publisher: { '@id': `${SITE_URL}/#winkel` },
      image: `${SITE_URL}/images/brand/og-image.jpg`,
    },
  })

  return (
    <>
      <section className="page-hero container">
        <span className="eyebrow reveal">Gids</span>
        <h1 className="display reveal" data-delay="1">Je poef vullen</h1>
        <p className="lead measure reveal" data-delay="2">
          Onze Marokkaanse poefs komen ongevuld bij je aan, als hoes met rits.
          Vullen is in een kwartier gebeurd — zo krijg je hem strak, stevig en mooi in vorm.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {secties.map((s, i) => (
            <div className="legal-block reveal" key={s.h} data-delay={(i % 3) + 1}>
              <h2 className="h3">{s.h}</h2>
              {(s.p || []).map((t) => <p key={t}>{t}</p>)}
              {s.lijst && (
                <ul className="legal-list">
                  {s.lijst.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
            </div>
          ))}

          <p className="notice reveal" style={{ marginTop: '2.5rem' }}>
            Nog geen poef? <Link to="/poefs" className="link-underline">Bekijk onze Marokkaanse Berber poefs</Link> —
            elk stuk bestaat maar één keer.
          </p>
        </div>
      </section>
    </>
  )
}
