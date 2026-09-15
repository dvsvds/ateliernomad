/* ============================================================
   SITE-CONTENT — Atelier Nomàd
   ============================================================ */

export const brand = {
  name: 'Atelier Nomàd',
  tagline: 'Handcrafted Moroccan Living',
  email: 'ateliernomad01@gmail.com',
  phone: '',   // leeg = nergens getoond. Wettelijk niet verplicht zolang
               // e-mail en het contactformulier er zijn.
  instagram: 'https://www.instagram.com/ateliernomad',
  instagramHandle: '@ateliernomad',
  city: 'België · Marrakech',
}

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
  { q: 'Verzenden jullie internationaal?', a: 'We verzenden binnen heel Europa. Verzendkosten worden bij het afrekenen automatisch berekend op basis van bestemming en gewicht. Voor bestemmingen buiten de EU kun je contact met ons opnemen.' },
  { q: 'Worden de poufs gevuld geleverd?', a: 'Nee, je ontvangt de pouf als hoes, zonder vulling. Dat houdt de verzendkosten laag — een gevulde pouf is vooral lucht. Vullen doe je zelf met bijvoorbeeld textielresten, oude kussens of vulkorrels; reken op ongeveer 100 liter per pouf. De hoes sluit met een rits.' },
  { q: 'Wat is jullie retourbeleid?', a: 'Niet helemaal tevreden? Voorraadartikelen kun je binnen 14 dagen retourneren in originele staat. Unieke vintage stukken en maatwerk zijn uitgesloten van retour.' },
]

export const craftSteps = [
  { num: '01', title: 'Selecteren', text: 'We reizen naar coöperatieven en familieateliers in Marrakech en het Atlasgebergte om materialen en makers persoonlijk te kiezen.' },
  { num: '02', title: 'Vervaardigen', text: 'Wol wordt met de hand geknoopt, hout gevormd en touw gevlochten — volledig ambachtelijk, zonder haast.' },
  { num: '03', title: 'Controleren & verzenden', text: 'Elk stuk wordt op kwaliteit gecontroleerd, zorgvuldig verpakt en met liefde naar jouw interieur verzonden.' },
]
