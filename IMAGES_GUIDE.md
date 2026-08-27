# Fotogids — Atelier Nomad

## Productfoto's

Alle 45 producten hebben hun packshot in `public/images/products/` staan, als
`<slug>.jpg` — bijvoorbeeld `pouf-cinnamon.jpg` of `stoel-laurel.jpg`. De
bestandsnaam volgt altijd de `slug` in `src/data/products.js`, dus die twee
moeten gelijk blijven.

Formaat: 1400 × 1750 px (4:5 staand), JPG, ±300 KB per stuk.

### Een product vervangen of toevoegen
1. Zet de foto neer als `public/images/products/<slug>.jpg`, 4:5 staand (1400×1750).
2. Voeg een `p(...)`-regel (pouf) of `q({...})`-blok (interieur) toe in
   `src/data/products.js`.
3. Draai `node scripts/sync-catalog.mjs` — die schrijft de serverprijslijsten
   (`api/_catalog.js` én de Netlify-functie) opnieuw. Sla je dit over, dan
   weigert de checkout het nieuwe product.

### Een tweede foto per product
`images` is een array. De productpagina toont het eerste beeld groot en de rest
als thumbnails eronder. Nu heeft elk product één beeld; een tweede toevoegen is
gewoon een extra pad in die array.

## Overige beelden

| Bestand | Waarvoor |
|---|---|
| `public/videos/hero.mp4` | hero-video op de homepage |
| `public/images/brand/hero-poster.jpg` | posterframe van die video |
| `public/images/lifestyle/inter-1..4.jpg` | sfeerbeelden in de "Leef met textuur"-sectie |
| `public/images/instagram/ig-1..6.jpg` | **ontbreken nog** — Instagram-galerij toont placeholders |
| `public/images/brand/og-image.jpg` | **ontbreekt nog** — social share-kaart, 1200×630 |

De zes oude producten staan weer in de collectie. Hun originele 3:4-bronfoto's
zijn verplaatst naar `/bronbeelden` (buiten de build); de site gebruikt de
genormaliseerde 4:5-versies: `pouf-bloom`, `pouf-kapsa`, `stoel-laurel`,
`krukje-laurel`, `lamp-doum` en `kussen-atlas`. Het krukje had geen eigen foto —
zijn packshot is met Higgsfield opgeschaald uit de uitsnede rechtsonder in de
oude lampfoto.

## Hoe de packshots gemaakt zijn

De bronfoto's zijn buiten geschoten tegen een grijze muur. Ze zijn met
Higgsfield (`nano_banana_pro`) omgezet naar de crème studio-look van de site.
Per pouf gingen álle beschikbare aanzichten samen als referentie mee, plus één
bestaande site-packshot voor hoek en licht — zo komt de zijkant uit een echte
foto in plaats van uit fantasie.

**Als je dit herhaalt:** leg elk resultaat naast zijn bronfoto voordat je het
plaatst. Bij drie van de 31 maakte het model er een ánder product van. Zie
`STATUS.md` in de scratchpad van die sessie voor de werkende prompt.
