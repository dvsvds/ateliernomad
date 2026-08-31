/* ============================================================
   JURIDISCHE PAGINA'S — Atelier Nomad
   ------------------------------------------------------------
   ⚠️  VUL EERST `bedrijf` HIERONDER IN. Zolang een veld leeg is,
       toont de site op die plek zichtbaar "[vul in: …]" — dat is
       met opzet, zodat je het niet vergeet vóór je live gaat.

   ⚠️  Deze teksten zijn geschreven naar Belgisch recht (Boek VI
       Wetboek Economisch Recht) en de AVG/GDPR, en dekken de
       standaardsituatie van een webshop die aan consumenten
       verkoopt. Laat ze één keer nakijken door je boekhouder of
       een jurist voordat je echte betalingen aanzet — zeker als
       je ook buiten de EU gaat verkopen of zakelijk levert.

   Stripe controleert bij de activatie of deze pagina's bestaan
   en of ze vindbaar zijn vanaf de homepage.
   ============================================================ */

export const bedrijf = {
  handelsnaam: 'Atelier Nomad',
  rechtsvorm: '',        // bv. 'Eenmanszaak' of 'BV'
  kbo: '',               // ondernemingsnummer, bv. '0123.456.789'
  btw: '',               // btw-nummer, bv. 'BE 0123.456.789'
  straat: '',            // straat en huisnummer
  postcode: '',          // postcode en gemeente
  land: 'België',
  email: 'hello@ateliernomad.com',
  telefoon: '',          // je echte nummer
}

/* Toont de waarde, of een zichtbare herinnering als die nog leeg is. */
export const veld = (waarde, omschrijving) => waarde || `[vul in: ${omschrijving}]`

const ADRES = () =>
  `${veld(bedrijf.straat, 'straat en nummer')}, ${veld(bedrijf.postcode, 'postcode en gemeente')}, ${bedrijf.land}`

export const documenten = {
  voorwaarden: {
    eyebrow: 'Juridisch',
    titel: 'Algemene voorwaarden',
    intro:
      'Deze voorwaarden gelden voor elke bestelling die je bij Atelier Nomad plaatst. Door te bestellen ga je ermee akkoord. We hebben ze zo kort en leesbaar gehouden als kan.',
    secties: [
      {
        h: '1. Wie wij zijn',
        p: [
          `${bedrijf.handelsnaam}${bedrijf.rechtsvorm ? `, ${bedrijf.rechtsvorm}` : ''}, met maatschappelijke zetel te ${ADRES()}.`,
        ],
        lijst: [
          `Ondernemingsnummer: ${veld(bedrijf.kbo, 'KBO-nummer')}`,
          `Btw-nummer: ${veld(bedrijf.btw, 'btw-nummer')}`,
          `E-mail: ${bedrijf.email}`,
          `Telefoon: ${veld(bedrijf.telefoon, 'telefoonnummer')}`,
        ],
      },
      {
        h: '2. Onze stukken',
        p: [
          'Elk stuk in de collectie is met de hand gemaakt en bestaat maar één keer. De foto op de productpagina toont het exemplaar dat je ontvangt.',
          'Omdat het om handwerk uit vintage textiel gaat, kunnen kleur, maatvoering en patroon licht afwijken van wat je op je scherm ziet. Die verschillen zijn eigen aan het product en gelden niet als gebrek.',
          'Vloerpoufs worden ongevuld verstuurd, als hoes met rits. Vullen doe je zelf; reken op ongeveer 100 liter per pouf.',
        ],
      },
      {
        h: '3. Prijzen',
        p: [
          'Alle prijzen staan in euro en zijn inclusief btw. Verzendkosten komen er bij het afrekenen bij en worden apart getoond voordat je betaalt.',
          'We mogen prijzen aanpassen, maar nooit nadat je bestelling bevestigd is.',
        ],
      },
      {
        h: '4. Je bestelling',
        p: [
          'De overeenkomst komt tot stand zodra je de bestelling afrondt en wij je bevestiging per e-mail sturen.',
          'Omdat elk stuk uniek is, kan het gebeuren dat een artikel net verkocht is. Kunnen we niet leveren, dan laten we dat zo snel mogelijk weten en betalen we volledig terug.',
        ],
      },
      {
        h: '5. Betalen',
        p: [
          'Betalingen verlopen via Stripe, een beveiligde betaaldienst. Je kaart- of bankgegevens komen nooit op onze servers terecht en wij zien ze niet.',
          'De bestelling wordt pas verwerkt nadat de betaling is bevestigd.',
        ],
      },
      {
        h: '6. Levering',
        p: [
          'We versturen binnen de EU. Verzendkosten en verwachte levertijd zie je op de pagina Verzending & retour.',
          'We leveren uiterlijk binnen 30 dagen na je bestelling. Lukt dat niet, dan mag je de bestelling annuleren en krijg je alles terug.',
          'Het risico gaat over op het moment dat jij of iemand die jij aanwijst het pakket in ontvangst neemt.',
        ],
      },
      {
        h: '7. Herroepingsrecht',
        p: [
          'Als consument heb je veertien kalenderdagen na ontvangst om zonder opgave van reden af te zien van je aankoop. Hoe je dat doet, staat op de pagina Verzending & retour.',
          'Het herroepingsrecht geldt niet voor stukken die op jouw uitdrukkelijke vraag op maat zijn gemaakt of aangepast.',
        ],
      },
      {
        h: '8. Garantie',
        p: [
          'Op alles wat we verkopen geldt de wettelijke garantie van twee jaar op conformiteitsgebreken. Slijtage door normaal gebruik en de natuurlijke veroudering van wol en hout vallen daar niet onder.',
          'Denk je dat er iets mis is? Mail ons met een foto, dan zoeken we een oplossing.',
        ],
      },
      {
        h: '9. Klachten en geschillen',
        p: [
          `Heb je een klacht, laat het ons eerst weten via ${bedrijf.email}. We reageren binnen zeven werkdagen.`,
          'Komen we er samen niet uit, dan kun je terecht bij de Consumentenombudsdienst (consumentenombudsdienst.be) of bij het Europese ODR-platform (ec.europa.eu/consumers/odr).',
          'Op deze overeenkomst is het Belgische recht van toepassing.',
        ],
      },
    ],
  },

  privacy: {
    eyebrow: 'Juridisch',
    titel: 'Privacybeleid',
    intro:
      'We vragen zo weinig mogelijk gegevens, gebruiken ze alleen waarvoor je ze geeft, en verkopen ze aan niemand. Hieronder staat precies wat we doen.',
    secties: [
      {
        h: 'Wie verwerkt je gegevens',
        p: [
          `${bedrijf.handelsnaam}, ${ADRES()}, ondernemingsnummer ${veld(bedrijf.kbo, 'KBO-nummer')}, is verantwoordelijk voor de verwerking. Vragen? Mail ${bedrijf.email}.`,
        ],
      },
      {
        h: 'Wat we bijhouden, en waarom',
        lijst: [
          'Bestelling: naam, e-mailadres, lever- en factuuradres. Nodig om je bestelling te kunnen uitvoeren en om aan onze boekhoudplicht te voldoen.',
          'Contactformulier: naam, e-mailadres en je bericht. Alleen om je vraag te beantwoorden.',
          'Nieuwsbrief: je e-mailadres, en alleen als je je zelf inschrijft. Uitschrijven kan in elke mail.',
          'Betaalgegevens: die gaan rechtstreeks naar Stripe. Wij zien en bewaren je kaartnummer niet.',
        ],
      },
      {
        h: 'Op welke grond',
        p: [
          'Voor bestellingen: de uitvoering van de overeenkomst. Voor de nieuwsbrief: jouw toestemming. Voor de boekhouding: een wettelijke verplichting.',
        ],
      },
      {
        h: 'Met wie we ze delen',
        lijst: [
          'Stripe — betalingsverwerking.',
          'Onze vervoerder — om het pakket te bezorgen.',
          'Netlify — de hosting van deze website.',
          'Onze boekhouder — voor de verplichte administratie.',
        ],
        p: ['Verder niemand. We verkopen geen gegevens en doen niet aan advertentieprofielen.'],
      },
      {
        h: 'Hoe lang',
        p: [
          'Bestel- en factuurgegevens houden we zeven jaar bij, zoals de wet voorschrijft. Berichten uit het contactformulier gooien we na twee jaar weg. Uit de nieuwsbrief verdwijn je meteen bij uitschrijving.',
        ],
      },
      {
        h: 'Je rechten',
        p: [
          'Je mag opvragen welke gegevens we van je hebben, ze laten verbeteren of laten wissen, en bezwaar maken tegen de verwerking. Eén mail volstaat en we reageren binnen dertig dagen.',
          'Ben je niet tevreden over hoe we ermee omgaan, dan kun je klacht indienen bij de Gegevensbeschermingsautoriteit (gegevensbeschermingsautoriteit.be).',
        ],
      },
      {
        h: 'Cookies',
        p: [
          'Deze site zet geen trackingcookies en gebruikt geen advertentienetwerken. Je winkelmand wordt lokaal in je eigen browser bewaard, zodat die er nog is als je terugkomt. Die gegevens verlaten je toestel niet.',
        ],
      },
    ],
  },

  verzending: {
    eyebrow: 'Praktisch',
    titel: 'Verzending & retour',
    intro:
      'Hoe je bestelling bij je komt, en wat je kunt doen als het toch niet is wat je zocht.',
    secties: [
      {
        h: 'Verzendkosten',
        p: [
          'Verzending binnen de EU kost € 9,95 per bestelling, ongeacht hoeveel stukken je bestelt. Het exacte bedrag zie je bij het afrekenen voordat je betaalt.',
        ],
      },
      {
        h: 'Waar we leveren',
        p: [
          'België, Nederland, Luxemburg, Duitsland, Frankrijk, Oostenrijk, Spanje, Italië, Portugal, Denemarken, Zweden, Finland en Ierland.',
          'Woon je daarbuiten? Mail ons, dan bekijken we wat mogelijk is.',
        ],
      },
      {
        h: 'Levertijd',
        p: [
          'Alles ligt op voorraad, dus we versturen binnen twee tot vier werkdagen. Je krijgt een track & trace zodra het pakket onderweg is.',
          'Poufs gaan ongevuld de deur uit. Dat scheelt fors in volume, dus ook binnen Europa gaat het snel en blijft de verzending betaalbaar.',
        ],
      },
      {
        h: 'Retour binnen 14 dagen',
        p: [
          'Je hebt veertien kalenderdagen na ontvangst om te laten weten dat je afziet van je aankoop. Daarna heb je nog eens veertien dagen om het stuk terug te sturen.',
          `Stuur een mail naar ${bedrijf.email} met je bestelnummer. Je hoeft geen reden op te geven. Wij sturen je de retourinstructies.`,
        ],
      },
      {
        h: 'In welke staat',
        p: [
          'Het stuk moet ongebruikt zijn en in de originele verpakking. Uitpakken en bekijken mag natuurlijk — net zoals in een winkel. Is het duidelijk gebruikt of beschadigd geraakt, dan mogen we de waardevermindering verrekenen.',
        ],
      },
      {
        h: 'Kosten en terugbetaling',
        p: [
          'De kosten van het terugsturen zijn voor jou. Wij betalen het aankoopbedrag en de oorspronkelijke standaard verzendkosten terug binnen veertien dagen nadat je retour bij ons is, via hetzelfde betaalmiddel als waarmee je betaalde.',
        ],
      },
      {
        h: 'Beschadigd aangekomen',
        p: [
          'Meld het binnen zeven dagen met een foto van het stuk en van de verpakking. Dan sturen we een vervangend stuk als dat er is, of betalen we volledig terug — retourkosten voor onze rekening.',
        ],
      },
    ],
  },
}
