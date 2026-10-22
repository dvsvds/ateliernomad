/* ============================================================
   GIDSEN — Atelier Nomàd
   ------------------------------------------------------------
   Artikels die antwoord geven op wat mensen in Google intypen
   ("poef vullen", "berber poef", "leren poef"…) en doorlinken
   naar de collectie. Elke gids krijgt een eigen pagina op /<slug>.

   Nieuwe gids? Voeg hier een object toe. De pagina, de sitemap en
   het overzicht op /gidsen volgen vanzelf.
   Houd het eerlijk: alleen wat klopt voor onze eigen stukken.

   Vorm van een sectie:
     { h: 'Kop', p: ['alinea', ...], lijst: ['punt', ...],
       link: { to: '/poefs', tekst: 'Bekijk de poefs' } }
   ============================================================ */

export const gidsen = [
  {
    slug: 'poef-vullen',
    eyebrow: 'Gids',
    titel: 'Je poef vullen',
    seoTitel: 'Poef vullen: zo doe je dat, stap voor stap',
    description: 'Je Marokkaanse poef zelf vullen? Hoeveel vulling je nodig hebt (ongeveer 100 liter), welke vulling het best werkt en hoe je hem strak en stevig krijgt.',
    intro: 'Onze Marokkaanse poefs komen ongevuld bij je aan, als hoes met rits. Vullen is in een kwartier gebeurd — zo krijg je hem strak, stevig en mooi in vorm.',
    secties: [
      {
        h: 'Waarom we poefs ongevuld versturen',
        p: ['Een gevulde poef is vooral lucht: groot, licht en duur om te verzenden. Als hoes past hij in een klein pakket, dus de verzendkosten blijven laag en het pakket is sneller bij je. Bovendien bepaal je zelf hoe stevig hij wordt — en je geeft spullen die al in huis liggen een tweede leven.'],
      },
      {
        h: 'Hoeveel vulling heb je nodig?',
        p: ['Reken op ongeveer 100 liter per poef. Dat is meer dan je denkt: vul liever iets te veel dan te weinig. Een poef die strak gevuld is, houdt zijn vorm, zit steviger en de wol trekt mooier strak over de rand.'],
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
        p: ['Elke vulling zakt in de eerste weken wat in. Voelt je poef zachter of verliest hij zijn vorm, open dan de rits en vul wat bij. Daarna blijft hij lang stevig.'],
      },
      {
        h: 'Je poef onderhouden',
        p: ['De wol van een Berber poef heeft weinig nodig: geregeld luchten en uitkloppen is genoeg. Een vlek dep je plaatselijk met een vochtige doek — niet wrijven, en de hoes niet in de wasmachine. Heb je de vulling in zakken gedaan, dan haal je hem in een paar minuten leeg om de hoes buiten te laten luchten.'],
      },
    ],
    slot: { tekst: 'Nog geen poef?', to: '/poefs', link: 'Bekijk onze Marokkaanse Berber poefs' },
  },

  {
    slug: 'berber-poef',
    eyebrow: 'Gids',
    titel: 'Berber poefs: wol, boucherouite of kelim',
    seoTitel: 'Berber poef: boucherouite, kelim of wol — het verschil',
    description: 'Wat is een Berber poef, en wat is het verschil tussen een poef van hoogpolige Berberwol, boucherouite en kelim? Uitleg over materiaal, gevoel en onderhoud.',
    intro: 'Een Berber poef is gemaakt van een vintage Marokkaans kleed. Welk kleed dat was, bepaalt hoe hij eruitziet, hoe hij aanvoelt en hoe je hem onderhoudt. Dit zijn de drie soorten die je in onze collectie vindt.',
    secties: [
      {
        h: 'Wat maakt een poef "Berber"?',
        p: [
          'De Amazigh — beter bekend als Berbers — weven al eeuwenlang kleden in het Atlasgebergte en op de vlaktes van Marokko. Elk dorp en elke familie had eigen motieven, kleuren en technieken. Een Berber poef wordt met de hand genaaid uit zo\'n kleed dat al jaren gebruikt is.',
          'Daardoor is elke poef uniek: het patroon hangt af van welk stuk kleed de maker uitkoos, en geen twee kleden zijn gelijk. Kleine onregelmatigheden, verkleurde plekken of een herstelde knoop horen erbij — dat is de geschiedenis van het kleed.',
        ],
      },
      {
        h: 'Hoogpolige Berberwol',
        p: [
          'Dikke, geknoopte pool van schapenwol, vaak ongeverfd ecru met grafische lijnen in zwart of bruin, of juist met vlakken in warme kleuren. Dit soort kleden komt uit de Midden- en Hoge Atlas, waar de winters koud zijn en een dik kleed een warme vloer betekent.',
          'Een poef van hoogpolige wol is zacht en warm om op te zitten en voelt het meest "knus". De pool vangt wat stof, dus geregeld uitkloppen en luchten houdt hem fris.',
        ],
        link: { to: '/poefs', tekst: 'Bekijk de poefs' },
      },
      {
        h: 'Boucherouite',
        p: [
          'Boucherouite (of boucheroui) is een Marokkaans lappenkleed: geknoopt uit repen gerecycleerd textiel in plaats van uit wol. De naam komt van een Marokkaans-Arabische uitdrukking voor een stuk gescheurde, hergebruikte stof.',
          'Het resultaat is uitbundig: felle kleuren, vrije vormen en patronen die nergens anders voorkomen. Een boucherouite poef is een echte blikvanger — en een van de duurzaamste stukken die je in huis kunt halen, want het materiaal had al een eerste leven.',
        ],
      },
      {
        h: 'Kelim',
        p: [
          'Een kelim is vlak geweven, zonder pool. De motieven — ruiten, diamanten, zigzags — worden in het weefsel zelf gemaakt. Daardoor is een kelim poef strakker en stugger dan een hoogpolige, met een fijnere tekening die je vooral van dichtbij ziet.',
          'Kelim is de praktische keuze: er blijft weinig stof in hangen, hij is makkelijk uit te kloppen en hij past goed in een rustiger, strakker interieur.',
        ],
        link: { to: '/shop?cat=geweven', tekst: 'Bekijk de geweven poefs' },
      },
      {
        h: 'Welke past bij jou?',
        lijst: [
          'Wil je zachtheid en warmte, of een poef om echt op te zitten bij de haard: kies hoogpolige wol.',
          'Wil je kleur en een stuk dat het gesprek op gang brengt: kies boucherouite.',
          'Wil je iets rustigs dat makkelijk te onderhouden is: kies kelim.',
        ],
        p: ['Twijfel je tussen twee stukken? Neem gerust contact op — we denken graag mee.'],
      },
    ],
    slot: { tekst: 'Elk stuk bestaat maar één keer.', to: '/poefs', link: 'Bekijk alle Berber poefs' },
  },

  {
    slug: 'berber-poef-of-leren-poef',
    eyebrow: 'Gids',
    titel: 'Berber poef of leren poef?',
    seoTitel: 'Leren poef of Berber poef? Het verschil uitgelegd',
    description: 'Twijfel je tussen een Marokkaanse leren poef en een Berber poef van een vintage kleed? Een eerlijke vergelijking van gevoel, uitstraling, onderhoud en prijs.',
    intro: 'Allebei Marokkaans, allebei met de hand gemaakt — maar het zijn heel verschillende stukken. Een eerlijke vergelijking, zodat je kiest wat bij je interieur past.',
    secties: [
      {
        h: 'De leren poef',
        p: [
          'De klassieke Marokkaanse leren poef komt uit de leerlooierijen van onder meer Fez en Marrakech. Hij is rond, meestal van geitenleer, en vaak met de hand geborduurd of gestikt in een sierlijk patroon.',
          'Leer voelt glad en koel aan, is stevig en makkelijk af te nemen met een vochtige doek. Leren poefs worden in grote aantallen gemaakt in vaste ontwerpen: je kunt er dus makkelijk twee dezelfde vinden. Met de jaren krijgt het leer een mooi patina.',
        ],
      },
      {
        h: 'De Berber poef',
        p: [
          'Een Berber poef wordt genaaid uit een vintage Marokkaans kleed — van hoogpolige wol, boucherouite of kelim. Hij voelt zacht en warm aan, en brengt textuur en kleur in een kamer.',
          'Omdat elk kleed anders is, bestaat elke Berber poef maar één keer. Wat je op de foto ziet, is precies wat je krijgt. Het onderhoud is anders dan bij leer: luchten, uitkloppen en vlekken plaatselijk deppen.',
        ],
      },
      {
        h: 'Naast elkaar',
        lijst: [
          'Gevoel — leer: glad, koel en stevig. Berber: zacht, warm en textiel.',
          'Uitstraling — leer: klassiek, verfijnd en gelijkmatig. Berber: grafisch, kleurrijk of juist ingetogen, altijd met karakter.',
          'Uniek — leer: vaak in series gemaakt. Berber: één exemplaar per kleed.',
          'Onderhoud — leer: afnemen met een doek, af en toe voeden. Berber: luchten, uitkloppen, vlekken deppen.',
          'Vullen — beide worden vaak ongevuld verstuurd en vul je zelf.',
        ],
        link: { to: '/poef-vullen', tekst: 'Zo vul je een poef' },
      },
      {
        h: 'Wat kies je?',
        p: [
          'Zoek je een strak, klassiek accent dat makkelijk schoon te houden is, dan is leer een goede keuze. Wil je een stuk dat textuur en warmte toevoegt en dat niemand anders heeft, kies dan een Berber poef.',
          'Bij Atelier Nomàd verkopen we alleen Berber poefs: elk genaaid uit een vintage kleed, en elk maar één keer verkrijgbaar.',
        ],
      },
    ],
    slot: { tekst: 'Benieuwd hoe ze eruitzien?', to: '/poefs', link: 'Bekijk de collectie' },
  },
]

export const getGids = (slug) => gidsen.find((g) => g.slug === slug)
