/* ============================================================
   PRODUCTDATA — Atelier Nomad
   ------------------------------------------------------------
   44 stuks: 33 vintage Marokkaanse vloerpoufs, acht handgeweven
   kussens, en drie interieurstukken (stoel, krukje, kapstok).
   Elke pouf is uniek — geknoopt uit een vintage Berberkleed,
   dus geen twee zijn gelijk.

   ⚠️  Prijs gewijzigd of product toegevoegd?
       Draai `node scripts/sync-catalog.mjs` — die genereert
       api/_catalog.js opnieuw. Dat is de serverbron waarmee
       Stripe rekent; de front-end kan geen prijs verzinnen.

   ⚠️  AFMETINGEN ONTBREKEN met opzet. Zodra de stukken opgemeten
       zijn, voeg per product een regel ['Afmeting', '...'] toe
       aan `details`. Liever geen maat dan een gegokte maat.

   Alle poufs worden ONGEVULD verstuurd (hoes zonder vulling).
   Prijstiers pouf: €125 eenvoudig / €145 kleur / €165 zeldzaam.
   ------------------------------------------------------------
   Twee filterassen op de shoppagina:
     type   — poufs / kussens / interieur   (waar het om gaat)
     stijl  — authentiek / modern / geweven (hoe het oogt en gemaakt is)
   Elk product heeft er allebei één.

   Over de stijlas: `geweven` gaat over de techniek — vlakgeweven werk
   tegenover dikke geknoopte pool. Wat overblijft valt uiteen in
   `authentiek` (ongeverfde wol, Berbertekens, houtwerk) en `modern`
   (strakke kleurvlakken en blokken). Een stuk hoort bij precies één.
   ============================================================ */

/* De hele voorraad is in één keer ingekocht en vormt samen één drop.
   Komt er later een tweede, geef producten dan een `collectie`-veld en
   filter hierop; nu hoort alles bij deze ene. */
export const collectie = {
  nummer: '01',
  naam: 'De eerste collectie',
  regel: 'In één keer geselecteerd in Marokko. Elk stuk bestaat maar één keer — is het weg, dan komt het niet terug.',
}

export const categories = [
  { id: 'all',       label: 'Alles',     as: 'type' },
  { id: 'poufs',     label: 'Poufs',     as: 'type' },
  { id: 'kussens',   label: 'Kussens',   as: 'type' },
  { id: 'interieur', label: 'Interieur', as: 'type' },
  { id: 'authentiek', label: 'Authentiek', as: 'stijl' },
  { id: 'modern',     label: 'Modern',     as: 'stijl' },
  { id: 'geweven',    label: 'Geweven',    as: 'stijl' },
]

/* Gedeelde specificaties — elke pouf is hetzelfde soort object,
   alleen het kleed waar hij van gemaakt is verschilt. */
const DETAILS = (materiaal, herkomst) => [
  ['Materiaal', materiaal],
  ['Levering', 'Ongevuld, als hoes'],
  ['Herkomst', herkomst],
  ['Uniek', 'Eén exemplaar — wat je ziet, ontvang je'],
]

const p = (slug, name, category, price, tag, short, description, materiaal, herkomst) => ({
  slug,
  name,
  type: 'poufs',
  unique: true, // er bestaat precies één exemplaar — max 1 in de winkelmand
  category,
  categoryLabel: 'Vloerpouf',
  price,
  tag,
  short,
  description,
  details: DETAILS(materiaal, herkomst),
  images: [`/images/products/${slug}.jpg`],
})

/* Alles wat geen pouf is: andere specs, eigen label. Kussens vormen
   een eigen filtersoort; stoel, krukje en kapstok vallen onder interieur.
   Ze delen wel de kleurfilters, zodat de shop één logica houdt. */
const q = ({ slug, name, label, type = 'interieur', category, price, tag, short, description, details, images }) => ({
  slug,
  name,
  type,
  category,
  categoryLabel: label,
  price,
  tag,
  short,
  description,
  details,
  // meerdere beelden alleen waar het iets toevoegt, zoals een tweezijdig kussen
  images: images || [`/images/products/${slug}.jpg`],
})

export const products = [
  p('pouf-haze', 'Vloerpouf — Haze', 'modern', 145, 'Bestseller',
    'Rookblauw vlak op ongeverfde ecru wol.',
    'Een rustig stuk: een breed rookblauw vlak dat overloopt in ongeverfde, hoogpolige schapenwol. De kleur is zacht en ingehouden, alsof je er door een ochtendmist naar kijkt. Past in interieurs waar je niet nóg een felle kleur wil.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-poppy', 'Vloerpouf — Poppy', 'modern', 145, null,
    'Fel rood met zwarte baan en gele hoek.',
    'Weinig subtiliteit, en dat is precies de bedoeling. Een diep klaproosrood beslaat het grootste deel van het vlak, doorsneden door een zwarte baan en afgesloten met een gele hoek. Het rood is met de hand geverfd, waardoor de tint over het vlak subtiel verspringt — dieper waar de pool dichter geknoopt zit.',
    'Vintage boucherouite, handgeknoopt', 'Marokko'),

  p('pouf-heather', 'Vloerpouf — Heather', 'authentiek', 145, null,
    'Zacht paarsroze met gele driehoeken.',
    'Het paarsroze van bloeiende heide, gebroken door twee gele driehoeken en een enkele zwarte lijn. Langs de randen loopt de hoogpolige wol iets lichter van tint, wat het stuk een zachte, ingetogen uitstraling geeft.',
    'Vintage Berberwol, handgeknoopt', 'Hoge Atlas, Marokko'),

  p('pouf-saffron', 'Vloerpouf — Saffron', 'authentiek', 145, null,
    'Okergeel met grijs en een roze accent.',
    'Okergeel als saffraan, met een grijs vlak dat de warmte in balans houdt en een klein roze accent langs de rand. Een van de zachtste poufs uit de collectie — dik en losjes geknoopt.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-clay', 'Vloerpouf — Clay', 'geweven', 165, null,
    'Koraalrode kelim met fijn zigzagmotief.',
    'Dicht geweven vintage kelimwerk in koraal en gebrande aarde, met een fijn zigzagpatroon dat over het hele vlak doorloopt. Zwaarder en compacter dan de hoogpolige poufs, in de warme aardetinten die alleen handgeverfde wol krijgt.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-drift', 'Vloerpouf — Drift', 'authentiek', 145, null,
    'Ecru met smalle strepen in inkt, oker en zwart.',
    'Ongeverfde wol als basis, met een band van smalle strepen in inktblauw, oker en zwart langs één zijde. Ingetogen genoeg voor een rustige kamer, met net genoeg lijnenspel om niet saai te worden.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-indigo', 'Vloerpouf — Indigo', 'authentiek', 145, null,
    'Ivoor met kobaltblauw vlak en groene tekens.',
    'Een helder kobaltblauw vlak op ivoren wol, met twee kleine groene tekens die als vlinders op het vlak zitten en een streep roestrood langs de rand. Grafisch en licht — het blauw haalt de warmte uit een kamer vol aardetinten.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-peach', 'Vloerpouf — Peach', 'authentiek', 145, null,
    'Roze en gele ruiten met zwarte krullijn.',
    'Roze en dooiergele ruiten op ivoor, losjes doorsneden door een zwarte krullijn die met de hand is meegeweven. Speels zonder kinderlijk te worden — het gedempte roze houdt het volwassen.',
    'Vintage Berberwol, handgeknoopt', 'Hoge Atlas, Marokko'),

  p('pouf-chalk', 'Vloerpouf — Chalk', 'modern', 125, null,
    'Ongeverfd ivoor met één zwarte kruisstreek.',
    'De soberste pouf uit de collectie: ongeverfde, hoogpolige schapenwol met één zwarte kruisstreek. Verder niets. Voor wie textuur wil zonder kleur — de wol doet al het werk.',
    '100% ongeverfde schapenwol', 'Midden-Atlas, Marokko'),

  p('pouf-tide', 'Vloerpouf — Tide', 'modern', 145, null,
    'Banen in blauw, geel, wit en zwart.',
    'Brede banen die als eb en vloed over het vlak lopen: kobalt, dooiergeel, wit en zwart naast elkaar. Uit een kleed met een uitgesproken streepdessin, waardoor deze pouf van elke kant anders oogt.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-blush', 'Vloerpouf — Blush', 'authentiek', 165, 'Zeldzaam',
    'Verwassen roze ruitjes over het hele vlak.',
    'Een fijn ruitjespatroon in verwassen roze en room, over het volledige vlak doorgeweven. De tint zit precies tussen oudroze en poeder in — met de hand geverfd, en daardoor niet exact na te maken.',
    'Vintage boucherouite, handgeknoopt', 'Marokko'),

  p('pouf-cinnamon', 'Vloerpouf — Cinnamon', 'modern', 145, 'Bestseller',
    'Oker en ivoor in een groot dambordpatroon.',
    'Een groot dambordpatroon in kaneeloker en ivoor op het bovenvlak, met een grof gevlochten ivoren zijband eromheen. Het patroon is met de hand geknoopt, dus de vakjes lopen niet strak in de pas — dat is precies het verschil met machinewerk.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-dune', 'Vloerpouf — Dune', 'geweven', 165, null,
    'Zandkleurig met fijn geweven ruitmotieven.',
    'Zandtinten van ecru tot licht taupe, met fijne geweven ruit- en diamantmotieven die je pas van dichtbij goed ziet. Vlakker geweven dan de hoogpolige poufs, met de zachte glans die oude wol krijgt.',
    'Vintage kelim, dicht geweven', 'Midden-Atlas, Marokko'),

  p('pouf-rust', 'Vloerpouf — Rust', 'geweven', 165, null,
    'Verweerd oranje met groene Berbertekens.',
    'Roestoranje dat over het vlak van toon verspringt, met kleine groene Berbertekens langs de randen. Een van de meest karaktervolle stukken uit de collectie — als je van warme, levende kleur houdt, is dit hem.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-pebble', 'Vloerpouf — Pebble', 'authentiek', 145, null,
    'Grijs en ecru met kleine donkere spikkels.',
    'Kiezelgrijs naast ongeverfd ecru, met kleine donkere spikkels die door de wol heen zijn meegeweven. Rustig, neutraal en makkelijk te combineren — het soort stuk dat overal past.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-solstice', 'Vloerpouf — Solstice', 'modern', 145, null,
    'Zonnegeel vlak met uitwaaierende lijnen.',
    'Een breed zonnegeel vlak met lichte lijnen die vanuit het midden uitwaaieren als stralen. Het geel is warm en niet schel — dichter bij korenveld dan bij citroen.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-shoal', 'Vloerpouf — Shoal', 'modern', 145, null,
    'Grijsblauw vlak op zandkleurige wol.',
    'Een grijsblauw vlak dat als een ondiepte in zandkleurige wol ligt. Dezelfde rustige familie als Haze, maar met het blauw dichter naar het midden en een koelere ondertoon.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-ember', 'Vloerpouf — Ember', 'modern', 145, null,
    'Ivoor met roestrode en diepblauwe vlakken.',
    'Op romige, hoogpolige wol liggen een roestrood en een diepblauw vlak naast elkaar, met een dunne zwarte lijn ertussen. De combinatie van die twee kleuren op ivoor maakt dit een van de grafischste stukken uit de collectie.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-meadow', 'Vloerpouf — Meadow', 'geweven', 165, null,
    'Ivoren kelim bezaaid met kleine gekleurde tekens.',
    'Plat geweven ivoren kelim, bezaaid met kleine met de hand geborduurde tekens in groen, rood, blauw en roze — pijlen, kruisjes, ruitjes. Elk teken is apart aangebracht. Van een afstand rustig ivoor, van dichtbij een klein archief.',
    'Vintage kelim met handborduursel', 'Hoge Atlas, Marokko'),

  p('pouf-quill', 'Vloerpouf — Quill', 'geweven', 125, null,
    'Ivoor met zwarte pentekening-motieven.',
    'Ivoren kelim met zwarte motieven die eruitzien alsof ze met een pen zijn getekend: zigzags, ruiten en kleine kruizen. Alleen zwart op ivoor, verder geen kleur — de zuinigste en misschien wel strakste pouf van de collectie.',
    'Vintage kelim, plat geweven', 'Hoge Atlas, Marokko'),

  p('pouf-thistle', 'Vloerpouf — Thistle', 'geweven', 165, null,
    'Ivoor met fijne gekleurde stekelmotieven.',
    'Fijne, stekelige motieven in paars, groen en rood op een ivoren kelimondergrond, dichter bij elkaar geborduurd dan bij Meadow. Het resultaat leest bijna als een patroon in plaats van losse tekens.',
    'Vintage kelim met handborduursel', 'Hoge Atlas, Marokko'),

  p('pouf-marigold', 'Vloerpouf — Marigold', 'geweven', 165, null,
    'Koraaloranje met roze en groene tekens.',
    'Warm koraaloranje met roze en groene motieven die er los overheen zijn geweven. Dicht geknoopt en zwaar, met de ongelijkmatige kleuropname die je alleen bij plantaardig geverfde wol ziet.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-signal', 'Vloerpouf — Signal', 'modern', 165, 'Zeldzaam',
    'Grijs veld met één rood blok en geel accent.',
    'Een rustig duifgrijs veld, gebroken door één fel rood blok, een zwarte grafische vorm en een klein mosterdgeel accent. Veel leegte, weinig ingrepen — het minst drukke en tegelijk het meest uitgesproken stuk uit de collectie.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-basalt', 'Vloerpouf — Basalt', 'modern', 165, null,
    'Zwart, rood en room in strakke blokken.',
    'Zwarte, rode en roomkleurige blokken, strak naast elkaar. De donkerste pouf uit de collectie en daardoor de meest grafische — mooi tegen een lichte muur of op een naturel vloerkleed.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-ash', 'Vloerpouf — Ash', 'authentiek', 145, null,
    'Roomwit met roze en zwart, en franjes.',
    'Roomwitte wol met een roze en een zwart vlak, afgezet met korte zwarte franjes langs de rand. Die franjes komen uit het oorspronkelijke kleed en zijn bewust bewaard gebleven.',
    'Vintage Berberwol, handgeknoopt', 'Marokko'),

  p('pouf-mist', 'Vloerpouf — Mist', 'modern', 145, null,
    'Ecru met een brede stoffige blauwe band.',
    'Ongeverfde ecru wol met een brede, stoffig blauwe band over de onderste helft. De eenvoud van twee kleuren, meer is het niet — en precies daarom werkt het.',
    'Vintage Berberwol, handgeknoopt', 'Midden-Atlas, Marokko'),

  p('pouf-sorrel', 'Vloerpouf — Sorrel', 'geweven', 165, 'Zeldzaam',
    'Diep rood, dicht geweven en gevlekt.',
    'Diep zuringrood over het hele vlak, met donkerder en lichter gevlekte zones waar de handgeverfde wol de kleur ongelijk heeft opgenomen. Dicht geweven, zwaar en vol — de meest verzadigde kleur van de collectie.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-coral', 'Vloerpouf — Coral', 'geweven', 165, null,
    'Koraalroze met zachtgroene motieven.',
    'Koraalroze met verweerde zachtgroene motieven die door het vlak lopen. Beide kleuren zijn zacht van toon, waardoor ze elkaar niet bijten maar in elkaar overlopen.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-foxglove', 'Vloerpouf — Foxglove', 'geweven', 165, 'Zeldzaam',
    'Magenta en zalm met een zwarte ster.',
    'Fel magenta naast zalmroze, met een grote zwarte ster en groene tekens op het vlak. De meest uitbundige pouf van allemaal — koop hem als je iets wil dat de kamer overneemt, niet als je iets zoekt dat meebeweegt.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-apricot', 'Vloerpouf — Apricot', 'geweven', 165, null,
    'Zalmoranje met kleine groene Berbertekens.',
    'Zalmoranje wol met kleine groene Berbertekens langs de randen en een ivoren zijband. Zachter van toon dan Rust en Marigold, en daardoor makkelijker te combineren met naturel textiel.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-garnet', 'Vloerpouf — Garnet', 'geweven', 165, null,
    'Granaatrood met roze en een geblokte hoek.',
    'Granaatrood met roze doorschijnend, en één hoek met een klein geblokt motief in gedempte tinten. Het rood is dieper en bruiner dan bij Sorrel — dichter bij wijn dan bij tomaat.',
    'Vintage kelim, dicht geweven', 'Zuid-Marokko'),

  p('pouf-bloom', 'Vloerpouf — Bloom', 'authentiek', 145, null,
    'Magenta en groen op koraalroze zijkanten.',
    'Een boucherouite in volle bloei: magenta, grasgroen en zacht roze door elkaar op het bovenvlak, met zijkanten in koraalroze en zwart. Boucherouite wordt met de hand geknoopt uit uiteenlopende garens, dus elke lus heeft een eigen kleur en glans — mat katoen naast dichte wol. Vrolijk zonder kinderlijk te worden.',
    'Vintage boucherouite, handgeknoopt', 'Marokko'),

  p('pouf-kapsa', 'Vloerpouf — Kapsa', 'authentiek', 145, null,
    'Kobaltblauw hart met rode en gele zigzags.',
    'Een kobaltblauw vlak in het midden, omringd door zigzags in rood, geel en groen op een ecru ondergrond. Van alle poufs is dit de meest grafische: het patroon loopt netjes door over de rand, zodat de zijkant net zo interessant is als de bovenkant.',
    'Vintage boucherouite, handgeknoopt', 'Marokko'),

  q({
    slug: 'stoel-laurel',
    name: 'Stoel — Laurel',
    label: 'Stoel',
    category: 'authentiek',
    price: 165,
    tag: null,
    short: 'Laurierhout met handgevlochten doumzitting.',
    description:
      'Een lage Marokkaanse stoel van ongeschild laurierhout, met zitting en rugleuning van gevlochten doumtouw. De takken zijn niet recht geschaafd maar gebruikt zoals ze gegroeid zijn — daardoor staat geen enkele stoel er precies hetzelfde bij. De prijs geldt per stoel; op de foto staan er twee om te laten zien hoe ze samen ogen.',
    details: [
      ['Materiaal', 'Ongeschild laurierhout'],
      ['Zitting', 'Handgevlochten doumtouw'],
      ['Herkomst', 'Marrakech-regio, Marokko'],
      ['Handgemaakt', 'Kleine verschillen in vorm en kleur horen erbij'],
    ],
  }),

  q({
    slug: 'krukje-laurel',
    name: 'Krukje — Laurel',
    label: 'Krukje',
    category: 'authentiek',
    price: 95,
    tag: null,
    short: 'Klein vierkant krukje, zelfde hand als de stoel.',
    description:
      'Hetzelfde ambacht als de Laurel-stoel, maar dan klein: een vierkant krukje van laurierhout met een strak gevlochten zitting van doumtouw. Werkt als zitplek, als bijzettafeltje naast de bank of als plek om een plant op te zetten.',
    details: [
      ['Materiaal', 'Ongeschild laurierhout'],
      ['Zitting', 'Handgevlochten doumtouw'],
      ['Herkomst', 'Marrakech-regio, Marokko'],
      ['Handgemaakt', 'Kleine verschillen in vorm en kleur horen erbij'],
    ],
  }),

  q({
    slug: 'kapstok-doum',
    name: 'Kapstok — Doum',
    label: 'Kapstok',
    category: 'authentiek',
    price: 285,
    tag: 'Zeldzaam',
    short: 'Staande kapstok op driepoot, met gevlochten haken.',
    description:
      'Een staande kapstok van laurierhout op een driepoot, met twee zwaar omwikkelde haken van doumtouw die als kelken uit de stam steken. Breed genoeg voor een jas, een tas of een hoed, en stevig genoeg om daar niet van om te vallen. De losse vezels aan de onderrand zijn met opzet blijven zitten — dat geeft het touwwerk zijn ruige, levende rand. Een stuk dat een lege hoek in zijn eentje kan dragen.',
    details: [
      ['Materiaal', 'Laurierhout en doumtouw'],
      ['Haken', 'Twee, met de hand omwikkeld en vastgezet'],
      ['Voet', 'Driepoot, staat los op de vloer'],
      ['Herkomst', 'Marrakech-regio, Marokko'],
      ['Handgemaakt', 'Kleine verschillen in vorm en kleur horen erbij'],
    ],
  }),

  q({
    slug: 'kussen-atlas',
    name: 'Kussen — Atlas',
    label: 'Kussen',
    type: 'kussens',
    category: 'authentiek',
    price: 75,
    tag: null,
    short: 'Dikke ecru wol met turkooise en zwarte strepen.',
    description:
      'Hoogpolige, ongeverfde schapenwol met verticale strepen in turkoois en zwart, en een dichte zwarte franjerand langs boven en onder. Geweven op een smal weefgetouw in de Atlas, waar dit soort dekens al generaties op dezelfde manier gemaakt wordt. Zwaar en warm in de hand.',
    details: [
      ['Materiaal', 'Ongeverfde schapenwol, hoogpolig'],
      ['Weefsel', 'Handgeweven, dichte franjerand'],
      ['Herkomst', 'Hoge Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-fern',
    name: 'Kussen — Fern',
    label: 'Kussen',
    type: 'kussens',
    category: 'geweven',
    price: 75,
    tag: null,
    short: 'Ecru vlakweefsel met brede smaragdgroene banen.',
    description:
      'Plat geweven, ongeverfde wol in ecru, met aan weerszijden een groep smaragdgroene banen: links één brede baan met een smalle ecru lijn erdoor, rechts twee smallere. Daartussen blijft het weefsel leeg, zodat het groen alle aandacht krijgt. Het groen is dieper en matter dan op een scherm te vangen is — echte geverfde wol, geen kleurstof die glimt.',
    details: [
      ['Materiaal', 'Ongeverfde schapenwol met geverfde wollen banen'],
      ['Weefsel', 'Handgeweven vlakweefsel, licht onregelmatig'],
      ['Herkomst', 'Midden-Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-cobalt',
    name: 'Kussen — Cobalt',
    label: 'Kussen',
    type: 'kussens',
    category: 'geweven',
    price: 75,
    tag: null,
    short: 'Ecru met twee kobaltblauwe strepen in het midden.',
    description:
      'Twee kobaltblauwe strepen naast elkaar in het midden van het vlak, en langs beide randen een groepje smalle strepen die om de zijkant heen doorlopen. Verder alleen ongeverfde wol. Het strakste kussen van de vier — de soort eenvoud die overal bij past zonder saai te zijn.',
    details: [
      ['Materiaal', 'Ongeverfde schapenwol met geverfde wollen strepen'],
      ['Weefsel', 'Handgeweven vlakweefsel, licht onregelmatig'],
      ['Herkomst', 'Midden-Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-sienna',
    name: 'Kussen — Sienna',
    label: 'Kussen',
    type: 'kussens',
    category: 'geweven',
    price: 75,
    tag: null,
    short: 'Ecru met dunne strepen in kobalt en roestbruin.',
    description:
      'Dunne strepen in kobaltblauw en roestbruin, onregelmatig over het vlak verdeeld: één blauwe links, een blauwe en een roestbruine samen in het midden, en nog een paar tegen de rechterrand. Die ongelijke maatvoering is geen fout maar het handwerk zelf — er lag geen patroon naast het weefgetouw.',
    details: [
      ['Materiaal', 'Ongeverfde schapenwol met geverfde wollen strepen'],
      ['Weefsel', 'Handgeweven vlakweefsel, licht onregelmatig'],
      ['Herkomst', 'Midden-Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-cipher',
    name: 'Kussen — Cipher',
    label: 'Kussen',
    type: 'kussens',
    category: 'geweven',
    price: 75,
    tag: null,
    short: 'Ecru met verspreide Berbertekens in vijf kleuren.',
    description:
      'Over het ecru vlak liggen losse Berbertekens verspreid: een groepje paarse en magenta streepjes, een groene zigzagrij, een bruine getrapte ruit, een rode golflijn en een paar kleine kruisjes. Ze staan ver uit elkaar, met veel lege wol ertussen — precies wat het rustig houdt ondanks het aantal kleuren. Zulke tekens zijn geen decoratie maar een taal; elk teken had oorspronkelijk een betekenis.',
    details: [
      ['Materiaal', 'Ongeverfde schapenwol met geborduurde motieven'],
      ['Weefsel', 'Handgeweven vlakweefsel, licht onregelmatig'],
      ['Herkomst', 'Midden-Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-prism',
    name: 'Kussen — Prism',
    label: 'Kussen',
    type: 'kussens',
    category: 'modern',
    price: 75,
    tag: null,
    short: 'Hoogpolige banden in kobalt, saliegroen en geel.',
    description:
      'Brede verticale banden over de volle hoogte, in crème, kobaltblauw, saliegroen en goudgeel, elk gescheiden door een smalle zwarte baan. De pool is dik en zacht — je zakt er met je hand in weg. Het meest uitgesproken kussen van de reeks: leg hem op een effen bank en de hoek is meteen af.',
    details: [
      ['Materiaal', 'Geverfde schapenwol, hoogpolig'],
      ['Weefsel', 'Handgeknoopt, dikke pool'],
      ['Herkomst', 'Midden-Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-umber',
    name: 'Kussen — Umber',
    label: 'Kussen',
    type: 'kussens',
    category: 'geweven',
    price: 75,
    tag: null,
    short: 'Warmbruine wol met kobalt en roze strepen.',
    description:
      'Warmbruine wol, de kleur van koffie met melk, gevlekt doordat lichtere en donkerdere draden door elkaar geweven zijn. In het midden een brede kobaltblauwe baan met een felroze streep ernaast, en langs beide randen dezelfde combinatie in het klein. Het enige kussen met een gekleurde ondergrond in plaats van ecru — dat maakt hem warmer en zwaarder van toon.',
    details: [
      ['Materiaal', 'Geverfde schapenwol'],
      ['Weefsel', 'Handgeweven vlakweefsel, gevlekt van kleur'],
      ['Herkomst', 'Midden-Atlas, Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

  q({
    slug: 'kussen-flare',
    name: 'Kussen — Flare',
    label: 'Kussen',
    type: 'kussens',
    category: 'geweven',
    price: 75,
    tag: null,
    short: 'Fel oranje, met twee verschillende kanten.',
    images: [
      '/images/products/kussen-flare.jpg',
      '/images/products/kussen-flare-achterkant.jpg',
    ],
    description:
      'Fel oranje, grof geweven uit gemêleerd garen — daardoor zit het vlak vol kleine witte en lichtoranje spikkels in plaats van één egale kleur. De twee kanten zijn niet gelijk: op de voorkant loopt een breed gestreept paneel van kobaltblauw met grasgroene strepen ertegenaan en nog twee groene lijnen erbuiten; de achterkant houdt het bij één blauwe baan met een dunne groene lijn aan elke kant. Draai hem om en je hebt een ander kussen. Vierkanter dan de rest en het felste van allemaal — dit is er een die je bewust neerlegt.',
    details: [
      ['Materiaal', 'Handgeweven wol en katoen, grof van draad'],
      ['Weefsel', 'Handgeweven, gespikkeld van kleur'],
      ['Twee kanten', 'Voor- en achterkant hebben een ander streepbeeld'],
      ['Herkomst', 'Marokko'],
      ['Onderhoud', 'Luchten en uitkloppen; vlekken plaatselijk deppen'],
    ],
  }),

]

export const getProduct = (slug) => products.find((x) => x.slug === slug)

export const featured = ['pouf-cinnamon', 'pouf-foxglove', 'kapstok-doum', 'stoel-laurel']
  .map(getProduct)
  .filter(Boolean)

export const formatPrice = (n) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n)
