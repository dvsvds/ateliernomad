/* ============================================================
   SITE-CONTENT — Atelier Nomàd
   ============================================================ */

export const brand = {
  name: 'Atelier Nomàd',
  tagline: 'Handcrafted Moroccan Living',
  email: 'ateliernomad01@gmail.com',
  phone: '',   // leeg = nergens getoond. Wettelijk niet verplicht zolang
               // e-mail en het contactformulier er zijn.
  instagram: 'https://www.instagram.com/ateliernomad__/',
  instagramHandle: '@ateliernomad__',
  city: 'België · Marrakech',
}

/* Winkelinfo die op productpagina, winkelwagen en footer terugkomt.
   Moet kloppen met netlify/functions/create-checkout-session.cjs
   (verzendkosten) en met de pagina Verzending & retour (legal.js). */
export const shop = {
  shippingCost: 9.95,          // per bestelling, binnen de EU
  btwTarief: 0.21,             // Belgisch standaardtarief; prijzen zijn inclusief btw
  deliveryTime: '2–4 werkdagen',
  returnDays: 14,
}

/* Betaalmethodes onderaan de site en bij het afrekenen.
   ⚠️ Toon ALLEEN wat aanstaat in Stripe: Dashboard → Instellingen →
   Betalingen → Betaalmethodes. Staat iets niet aan, haal het hier weg.
   Officieel logo? Zet het bestand in public/images/payments/ en vul
   `logo` in (bv. '/images/payments/bancontact.svg'); zonder logo
   verschijnt de naam als nette badge. */
export const paymentMethods = [
  { name: 'Bancontact', logo: '' },
  { name: 'Visa', logo: '' },
  { name: 'Mastercard', logo: '' },
  { name: 'Apple Pay', logo: '' },
  { name: 'Google Pay', logo: '' },
]

export const heroImages = {
  main: '/images/brand/hero.jpg',          // jouw merkbeeld (interieur met poufs)
  sub: '/images/products/pouf-cinnamon.jpg', // los productbeeld als accent
}

/* Klantreviews. Bewust leeg: zet hier alleen ECHTE reacties, met
   toestemming van de klant. Verzonnen reviews zijn sinds de Omnibus-
   richtlijn (2022) verboden. Zolang de lijst leeg is, toont de homepage
   de sectie niet. Vorm: { quote: '...', by: 'Voornaam · Stad' } */
export const testimonials = []

export const lifestyle = [
  { src: '/images/lifestyle/inter-1.jpg', label: 'Loungehoek met poufs' },
  { src: '/images/lifestyle/inter-3.jpg', label: 'Woonkamer met bogen' },
  { src: '/images/lifestyle/inter-2.jpg', label: 'Slaapkamer met zicht' },
  { src: '/images/lifestyle/inter-4.jpg', label: 'Poufs in een kleurrijk interieur' },
]

/* Foto's voor de Instagram-galerij op de homepage. Leeg = de sectie wordt
   niet getoond. Zet hier paden als '/images/instagram/ig-1.jpg' zodra de
   foto's in public/images/instagram staan. */
export const instagram = []

export const faqs = [
  { q: 'Zijn alle stukken echt handgemaakt?', a: 'Ja. Elk stuk wordt met de hand vervaardigd door ambachtslieden in Marokko, volgens technieken die generaties lang zijn doorgegeven. Daardoor is geen enkel exemplaar exact hetzelfde — kleine variaties horen bij het ambacht.' },
  { q: 'Zijn de vloerpoufs uniek?', a: 'Onze boucherouite- en kapsa-poufs worden gemaakt van vintage Berberkleden. Elk patroon en kleurenspel is daardoor eenmalig — wat je op de foto ziet, is precies het stuk dat je ontvangt.' },
  { q: 'Hoe lang duurt de levering?', a: 'Omdat elke pouf al op voorraad ligt, versturen we binnen 2–4 werkdagen. Je ontvangt altijd een track & trace. Ongevuld verzenden houdt het pakket klein, dus ook binnen Europa gaat het snel.' },
  { q: 'Verzenden jullie internationaal?', a: 'We verzenden binnen heel Europa. Verzending binnen de EU kost € 9,95 per bestelling, hoeveel stukken je ook bestelt. Voor bestemmingen buiten de EU kun je contact met ons opnemen.' },
  { q: 'Worden de poufs gevuld geleverd?', a: 'Nee, je ontvangt de pouf als hoes, zonder vulling. Dat houdt de verzendkosten laag — een gevulde pouf is vooral lucht. Vullen doe je zelf met bijvoorbeeld textielresten, oude kussens of vulkorrels; reken op ongeveer 100 liter per pouf. De hoes sluit met een rits.' },
  { q: 'Wat is jullie retourbeleid?', a: 'Niet helemaal tevreden? Je hebt 14 dagen bedenktijd na ontvangst, ook op unieke stukken. Mail ons met je bestelnummer en stuur het stuk ongebruikt en in de originele verpakking terug; alleen maatwerk op jouw vraag is uitgesloten.' },
]

export const craftSteps = [
  { num: '01', title: 'Selecteren', text: 'We reizen naar coöperatieven en familieateliers in Marrakech en het Atlasgebergte om materialen en makers persoonlijk te kiezen.' },
  { num: '02', title: 'Vervaardigen', text: 'Wol wordt met de hand geknoopt, hout gevormd en touw gevlochten — volledig ambachtelijk, zonder haast.' },
  { num: '03', title: 'Controleren & verzenden', text: 'Elk stuk wordt op kwaliteit gecontroleerd, zorgvuldig verpakt en met liefde naar jouw interieur verzonden.' },
]
