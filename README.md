# Atelier Nomad — Webshop

Een premium webshop voor unieke vintage Marokkaanse vloerpoufs.
Gebouwd met **React + Vite**, met een volledige winkelmand en **Stripe Checkout**.
Stijl: Mediterranean–Scandinavian luxury · warme aardetinten · serif + sans · rustige animaties.

---

## ⚡️ Snel starten

```bash
npm install
npm run dev
```

De site draait dan op http://localhost:5173

> De winkelmand werkt meteen. Echt afrekenen werkt zodra je Stripe instelt (zie hieronder).

---

## 🖼️ Je foto's toevoegen

Leg je productfoto's in `public/images/...`.
**Zie `IMAGES_GUIDE.md`** voor de exacte bestandsnamen — inclusief waar je
7 geüploade foto's horen. Zolang een foto ontbreekt, toont de site
automatisch een nette placeholder, dus de site ziet er altijd af uit.

---

## 💳 Stripe-betalingen instellen

1. Maak een gratis account op [stripe.com](https://stripe.com) en pak je API-sleutels.
2. Kopieer `.env.example` naar `.env` en vul in:
   - `VITE_STRIPE_PUBLISHABLE_KEY` → je publieke sleutel (`pk_...`)
   - `STRIPE_SECRET_KEY` → je geheime sleutel (`sk_...`) *(alleen op de server)*
   - `SITE_URL` → je site-URL (lokaal: `http://localhost:5173`)
3. De serverless functie staat klaar voor **Vercel** (`/api`) en **Netlify** (`/netlify/functions`).

### Lokaal afrekenen testen
- **Vercel:** `npm i -g vercel` → `vercel dev`
- **Netlify:** `npm i -g netlify-cli` → `netlify dev`

Zet `VITE_CHECKOUT_ENDPOINT` in `.env` op het juiste pad
(`/api/create-checkout-session` voor Vercel, `/.netlify/functions/create-checkout-session` voor Netlify).

> 🔒 Veiligheid: prijzen worden **op de server** berekend uit `api/_catalog.js`.
> De front-end kan dus nooit een prijs vervalsen.

---

## 🚀 Publiceren (deploy)

### Vercel (aanbevolen)
1. Push deze map naar GitHub.
2. Importeer het project op [vercel.com](https://vercel.com).
3. Zet de env-variabelen (`STRIPE_SECRET_KEY`, `SITE_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_CHECKOUT_ENDPOINT=/api/create-checkout-session`).
4. Deploy. De `/api`-functie werkt automatisch.

### Netlify
1. Push naar GitHub, koppel op [netlify.com](https://netlify.com).
2. Build command `npm run build`, publish `dist` (staat al in `netlify.toml`).
3. Zet dezelfde env-variabelen, met `VITE_CHECKOUT_ENDPOINT=/.netlify/functions/create-checkout-session`.

---

## 🗂️ Projectstructuur

```
atelier-nomad/
├─ index.html              # Basis-SEO, fonts, JSON-LD
├─ src/
│  ├─ main.jsx             # Entrypoint + providers
│  ├─ App.jsx              # Routing
│  ├─ styles/index.css     # Volledig design-systeem (tokens, componenten)
│  ├─ data/
│  │  ├─ products.js       # ⭐ 44 producten: naam, prijs, tekst, beeld
│  │  └─ site.js           # Teksten, testimonials, FAQ, lifestyle
│  ├─ context/CartContext.jsx
│  ├─ lib/checkout.js      # Stripe-koppeling (front-end)
│  ├─ hooks/               # useReveal (scroll-animatie), useSeo
│  ├─ components/          # Navbar, Footer, ProductCard, CartDrawer, SmartImage, Newsletter, Reveal
│  ├─ sections/            # Homepage-secties (Hero, Featured, About, Craft, Lifestyle, Testimonials, Instagram)
│  └─ pages/               # Home, Shop, Product, About, Craftsmanship, Contact, FAQ, Success, NotFound
├─ api/                    # Vercel serverless functie + veilige prijslijst
├─ netlify/functions/      # Netlify variant
└─ public/images/          # Jouw foto's (zie IMAGES_GUIDE.md)
```

## ✏️ Veelvoorkomende aanpassingen
- **Product toevoegen/wijzigen:** `src/data/products.js` — **en de prijs ook in `api/_catalog.js`**, anders weigert de checkout het.
- **Kleuren & fonts:** bovenin `src/styles/index.css` (`:root`-variabelen).
- **Teksten/FAQ/reviews:** `src/data/site.js`.
- **Nieuwsbrief koppelen:** `src/components/Newsletter.jsx` (TODO-markering).
- **Contactformulier koppelen:** `src/pages/Contact.jsx` (TODO-markering).

---

## ⚠️ Nog open

- **Afmetingen ontbreken.** De producten zijn nog niet opgemeten, dus er staat
  bewust geen maat op de productpagina's. Zodra je gemeten hebt: voeg per product
  een `['Afmeting', '...']`-regel toe in `src/data/products.js` en draai
  `node scripts/sync-catalog.mjs`.
- **Telefoonnummer is nep.** `src/data/site.js` staat op +31 (0)20 123 4567 —
  een Amsterdams voorbeeldnummer. Vervang door het echte nummer.
- **Social share-beeld** (`og-image.jpg`) is nu een uitsnede uit het herobeeld;
  vervang gerust door iets beters van 1200×630.
- **Nieuwsbrief en contactformulier doen niets.** Beide zijn stubs zonder backend
  — zie de TODO-markering in `src/components/Newsletter.jsx` en `src/pages/Contact.jsx`.
- **Stripe is niet ingesteld.** Zonder `.env` met je sleutels werkt afrekenen niet.
- **Instagram-galerij** toont placeholders tot je `public/images/instagram/ig-1..6.jpg` vult.
- **Geen versiebeheer.** Deze map staat niet in git. Overweeg `git init`.

---

Met de hand gemaakt voor Atelier Nomad ✦
