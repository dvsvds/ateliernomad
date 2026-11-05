import { bedrijf, veld, heeftAdres } from '../legal.js'
import { analytics } from '../site.js'

/* ============================================================
   LEGAL PAGES (English) — Atelier Nomàd
   ------------------------------------------------------------
   English translation of `documenten` in ../legal.js. Company
   details come from `bedrijf` in that file, so fill them in there.
   Keep the structure and conditions in step with the Dutch: if you
   change an obligation there, change it here too.

   Written under Belgian law (Book VI of the Belgian Code of
   Economic Law) and the GDPR. The Dutch version prevails in case
   of doubt.
   ============================================================ */

/* Dutch place/country names from `bedrijf` → English. Anything not
   listed is shown as entered. */
const EN_NAMEN = { 'België': 'Belgium', Antwerpen: 'Antwerp' }
const en = (naam) => EN_NAMEN[naam] || naam

const ADRES = () => `${bedrijf.straat}, ${bedrijf.postcode}, ${en(bedrijf.land)}`

const ZETEL = () =>
  heeftAdres()
    ? `, with its registered office at ${ADRES()}`
    : bedrijf.gemeente ? `, based in ${en(bedrijf.gemeente)}, ${en(bedrijf.land)}` : ''

export const documentenEn = {
  voorwaarden: {
    eyebrow: 'Legal',
    titel: 'Terms and conditions',
    intro:
      'These terms apply to every order you place with Atelier Nomàd. By ordering, you agree to them. We have kept them as short and readable as we can.',
    secties: [
      {
        h: '1. Who we are',
        p: [
          `${bedrijf.handelsnaam}${bedrijf.rechtsvorm ? `, ${bedrijf.rechtsvorm}` : ''}${ZETEL()}, registered with the Crossroads Bank for Enterprises (KBO/BCE).`,
          ...(heeftAdres()
            ? []
            : ['Our business address can be looked up in the Crossroads Bank for Enterprises under company number 1035.137.874, or requested from us by email.']),
        ],
        lijst: [
          `Company number: ${veld(bedrijf.kbo, 'company number')}`,
          `VAT number: ${veld(bedrijf.btw, 'VAT number')}`,
          `Email: ${bedrijf.email}`,
          ...(bedrijf.telefoon ? [`Phone: ${bedrijf.telefoon}`] : []),
        ],
      },
      {
        h: '2. Our pieces',
        p: [
          'Every piece in the collection is handmade and exists only once. The photo on the product page shows the exact piece you will receive.',
          'Because these are handmade from vintage textiles, colour, dimensions and pattern may differ slightly from what you see on your screen. Such differences are inherent to the product and do not count as a defect.',
          'Poufs are shipped unfilled by default, as a cover with a zip; you fill them yourself (allow for about 100 litres per pouf). If you choose filled on the product page, we deliver it filled for € 9 extra.',
        ],
      },
      {
        h: '3. Prices',
        p: [
          'All prices are in euros and include VAT. Shipping costs are added at checkout and shown separately before you pay.',
          'We may change our prices, but never after your order has been confirmed.',
        ],
      },
      {
        h: '4. Your order',
        p: [
          'The contract is formed as soon as you complete your order and we send you our confirmation by email.',
          'Because every piece is unique, an item may just have sold. If we cannot deliver, we will let you know as soon as possible and refund you in full.',
        ],
      },
      {
        h: '5. Payment',
        p: [
          'Payments are handled by Stripe, a secure payment service. Your card or bank details never reach our servers and we never see them.',
          'Your order is only processed once payment has been confirmed.',
        ],
      },
      {
        h: '6. Delivery',
        p: [
          'We ship within the EU. Shipping costs and expected delivery times are listed on the Shipping & returns page.',
          'We deliver within 30 days of your order at the latest. If we cannot, you may cancel your order and receive a full refund.',
          'Risk passes to you when you, or someone you designate, takes receipt of the parcel.',
        ],
      },
      {
        h: '7. Right of withdrawal',
        p: [
          'As a consumer, you have fourteen calendar days from receipt to withdraw from your purchase without giving any reason. How to do so is explained on the Shipping & returns page.',
          'The right of withdrawal does not apply to pieces made or altered to measure at your express request.',
        ],
      },
      {
        h: '8. Guarantee',
        p: [
          'Everything we sell is covered by the two-year legal guarantee against lack of conformity. Wear and tear from normal use and the natural ageing of wool and wood are not covered.',
          'Think something is wrong? Email us a photo and we will find a solution.',
        ],
      },
      {
        h: '9. Complaints and disputes',
        p: [
          `If you have a complaint, please let us know first at ${bedrijf.email}. We respond within seven working days.`,
          'If we cannot resolve it together, you can turn to the Belgian Consumer Ombudsman Service (consumentenombudsdienst.be) or the European ODR platform (ec.europa.eu/consumers/odr).',
          'This contract is governed by Belgian law.',
        ],
      },
    ],
  },

  privacy: {
    eyebrow: 'Legal',
    titel: 'Privacy policy',
    intro:
      'We ask for as little data as possible, use it only for the purpose you give it for, and sell it to no one. Below is exactly what we do.',
    secties: [
      {
        h: 'Who processes your data',
        p: [
          `${bedrijf.handelsnaam}${ZETEL()}, company number ${veld(bedrijf.kbo, 'company number')}, is the data controller. Questions? Email ${bedrijf.email}.`,
        ],
      },
      {
        h: 'What we keep, and why',
        lijst: [
          'Orders: name, email address, delivery and billing address. Needed to fulfil your order and to meet our accounting obligations.',
          'Contact form: name, email address and your message. Only to answer your question.',
          'Newsletter: your email address, and only if you sign up yourself. You can unsubscribe from any email.',
          'Payment details: these go directly to Stripe. We do not see or store your card number.',
        ],
      },
      {
        h: 'On what legal basis',
        p: [
          'For orders: the performance of the contract. For the newsletter: your consent. For our accounts: a legal obligation.',
        ],
      },
      {
        h: 'Who we share it with',
        lijst: [
          'Stripe — payment processing.',
          'Our carrier — to deliver your parcel.',
          'Netlify — hosting of this website, storage of contact form messages and newsletter sign-ups, and a copy of your order for our order notification.',
          'Google (Gmail) — to send your order confirmation.',
          ...(analytics.ga4Id ? ['Google (Analytics) — anonymous visitor statistics, only if you accept cookies.'] : []),
          'Our accountant — for the mandatory bookkeeping.',
        ],
        p: ['No one else. We do not sell data and we do not build advertising profiles.'],
      },
      {
        h: 'How long',
        p: [
          'We keep order and invoice data for seven years, as required by law. Contact form messages are deleted after two years. You are removed from the newsletter as soon as you unsubscribe.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'You may ask which data we hold about you, have it corrected or erased, and object to its processing. A single email is enough and we respond within thirty days.',
          'If you are not satisfied with how we handle your data, you can lodge a complaint with the Belgian Data Protection Authority (dataprotectionauthority.be).',
        ],
      },
      {
        h: 'Cookies',
        p: [
          analytics.ga4Id
            ? 'We use Google Analytics to see how visitors use the site (which pages, where they come from), so we can improve it. This only happens if you click "Accept" in the cookie banner; your IP address is not stored, the data is kept for a maximum of 14 months and we do not use it for advertising. If you decline, nothing is measured. You can change your choice at any time via "Cookie settings" at the bottom of every page.'
            : 'This site sets no tracking cookies and uses no advertising networks.',
          'Your shopping basket and your cookie choice are stored locally in your own browser, so they are still there when you come back. That data never leaves your device.',
        ],
      },
    ],
  },

  verzending: {
    eyebrow: 'Practical',
    titel: 'Shipping & returns',
    intro:
      'How your order reaches you, and what you can do if it turns out not to be what you were looking for.',
    secties: [
      {
        h: 'Shipping costs',
        p: [
          'Shipping within the EU costs € 9.95 per order, however many pieces you order. You will see the exact amount at checkout before you pay.',
          'Delivery within the province of Antwerp (postcodes 2000–2999) is free. Choose "Free delivery — Antwerp province only" at checkout. If your address is outside the province, we will contact you.',
        ],
      },
      {
        h: 'Where we deliver',
        p: [
          'Belgium, the Netherlands, Luxembourg, Germany, France, Austria, Spain, Italy, Portugal, Denmark, Sweden, Finland and Ireland.',
          'Live elsewhere? Email us and we will see what is possible.',
        ],
      },
      {
        h: 'Delivery time',
        p: [
          'Everything is in stock, so we ship within two to four working days. You will receive a tracking link as soon as your parcel is on its way.',
          'Poufs leave us unfilled by default. That saves a lot of volume, so delivery is quick across Europe too. Filled is also possible, for € 9 extra; shipping costs stay the same.',
        ],
      },
      {
        h: 'Returns within 14 days',
        p: [
          'You have fourteen calendar days from receipt to let us know you are withdrawing from your purchase. After that, you have another fourteen days to send the piece back.',
          `Send an email to ${bedrijf.email} with your order number. You do not have to give a reason. We will send you the return instructions.`,
        ],
      },
      {
        h: 'Condition',
        p: [
          'The piece must be unused and in its original packaging. You are of course welcome to unpack it and look at it — just as you would in a shop. If it has clearly been used or has been damaged, we may deduct the loss in value.',
        ],
      },
      {
        h: 'Costs and refund',
        p: [
          'The cost of sending the piece back is yours. We refund the purchase price and the original standard shipping costs within fourteen days of receiving your return, using the same payment method you paid with.',
        ],
      },
      {
        h: 'Arrived damaged',
        p: [
          'Let us know within seven days, with a photo of the piece and of the packaging. We will then send a replacement if one is available, or refund you in full — with return costs at our expense.',
        ],
      },
    ],
  },
}
