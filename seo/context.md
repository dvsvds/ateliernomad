# Context — Atelier Nomàd (ateliernomad.eu)

Bijgewerkt: 2026-11-09. Elk feit met zijn bron (bestand in deze repo of URL).

## Product
- Unieke vintage Marokkaanse Berber poefs en handgeweven Berber kussens; elk stuk bestaat één keer. — `src/data/products.js` (`unique: true`)
- 29 poefs, 8 kussens (37 stukken, "de eerste collectie"). — `src/data/products.js`
- Poefs: geknoopt uit vintage Berberwol, boucherouite of kelim; herkomst Midden-/Hoge Atlas, Marokko. — `src/data/products.js`
- Kussens: handgeweven schapenwol uit de Atlas. — `src/data/products.js`
- Afmetingen: poefs 60 × 60 × 20 cm, kussens 50 × 40 cm. — `src/data/products.js` (`afmeting`), bron: Instagram-posts van de eigenaar
- Vestiging: Antwerpen, België. KBO 1035.137.874. Straat/postcode nog niet ingevuld. — `src/data/legal.js`

## Prijzen (incl. 21% btw)
- Poefs: € 120 (2 stuks), € 130 (16), € 140 (11). — `src/data/products.js`
- Kussens: € 75 (8). — `src/data/products.js`
- Poef gevuld leveren: + € 9. Standaard ongevuld, als hoes met rits. — `src/data/site.js` (`shop.vulPrijs`)

## Verzending & retour
- € 9,95 per bestelling binnen 13 EU-landen (NL, BE, DE, FR, LU, AT, ES, IT, PT, DK, SE, FI, IE). — `src/data/site.js`, `netlify/functions/create-checkout-session.cjs`
- Gratis levering in de provincie Antwerpen (postcode 2000–2999). — idem
- Levertijd 2–4 werkdagen; 14 dagen bedenktijd, retourkosten voor de klant. — `src/data/site.js`, `src/data/legal.js`
- Betalen via Stripe: Bancontact, Visa, Mastercard, Apple Pay, Google Pay. — `src/data/site.js`

## Conversie
Een afgeronde bestelling (Stripe Checkout → `/bedankt` of `/en/thank-you`). GA4: G-54077HDHHF (na cookie-toestemming). — `src/data/site.js`

## Koper
Interieurliefhebbers in België en Nederland (Nederlandstalig) en de rest van de EU (Engelstalig, `/en`) die een uniek, handgemaakt Marokkaans stuk zoeken. Zoekgedrag: "poef" (4.400/mnd BE), "marokkaanse poef", "berber poef", "poef vullen". — OpenSEO, Google BE nl, okt–nov 2026

## Site (techniek)
- React + Vite, elke pagina vooraf gerenderd (`scripts/prerender.mjs`); titels/meta/canonical/hreflang via `src/hooks/useSeo.js`; structured data per pagina; sitemap bij de build; robots.txt in `public/`.
- Nieuwe gids: object toevoegen in `src/data/gidsen.js` (+ Engelse versie in `src/data/en/gidsen.js`); route en sitemap volgen vanzelf.
- Twee talen: NL (standaard) en EN onder `/en` (`src/i18n.js`).
- Google Shopping-feeds: `/google-shopping.xml` (NL: BE, NL) en `/google-shopping-en.xml` (EN: overige EU). Merchant Center account 5899847064.
- Netlify publiceert master automatisch.

## Concurrenten (bevestigd met Google BE nl, OpenSEO, 3 en 9 nov 2026)
- neda-artisanat.com — Berber poefs uit oude kleden; staat op "marokkaanse poef" (#3, 3 nov). Sitemap: 2.877 URL's, 28 blogs.
- poufspillows.nl — sterk in content: #1 "poef vullen" (3 nov), #2 "marokkaanse kussens". Sitemap: 997 URL's.
- trendcarpet.vlaanderen — #1 en #2 "marokkaanse poef" (leren poefs). Geen openbare sitemap gevonden.
- authentiekevloerkleden.nl — "alle marokkaanse poefs" (#7). Sitemap: 303 URL's.
- Ook op de zoekwoorden: thesouks.nl, sedasmiracle.com, marocstore.be, marokkaansepoefs.nl, darbeldi.nl, micasahomeandliving.nl, 2dehands.be, kwantum.be, bol.com.
- Merknaam: "atelier nomad" wordt gedeeld met ateliernomad.be (juwelen), atelier-nomad.be (studio, Luik, met kennisvenster) en ateliernomad.com.
