/* ============================================================
   GUIDES (English) — Atelier Nomàd
   ------------------------------------------------------------
   English versions of ../gidsen.js. Same shape, plus `nl`: the
   slug of the Dutch original (for hreflang / language switch).
   Each guide gets its own page at /en/<slug>.
   ============================================================ */

export const gidsenEn = [
  {
    slug: 'how-to-fill-a-pouf',
    nl: 'poef-vullen',
    eyebrow: 'Guide',
    titel: 'Filling your pouf',
    seoTitel: 'How to fill a pouf: a step-by-step guide',
    description: 'Filling your Moroccan pouf yourself? How much filling you need (about 100 litres), which filling works best and how to get it firm and full.',
    intro: 'Our Moroccan poufs arrive unfilled, as a cover with a zip. Filling one takes about fifteen minutes — here is how to get it firm, sturdy and nicely in shape.',
    secties: [
      {
        h: 'Why we ship our poufs unfilled',
        p: ['A filled pouf is mostly air: big, light and expensive to ship. As a cover it fits in a small parcel, so shipping costs stay low and it reaches you faster. On top of that, you decide how firm it becomes — and you give things already lying around your home a second life.'],
      },
      {
        h: 'How much filling do you need?',
        p: ['Allow for about 100 litres per pouf. That is more than you might think: better to overfill than underfill. A firmly filled pouf keeps its shape, is sturdier to sit on and the wool pulls neatly taut over the edge.'],
      },
      {
        h: 'Which filling should you choose?',
        lijst: [
          'Fabric scraps and old clothes — free and heavy, so the pouf stands firmly. Ideal as a base at the bottom.',
          'Old pillows, duvets or throws — fill a lot of volume quickly and stay soft.',
          'Foam chips — light and springy, and they hold their shape well. Sold by the bag at upholstery and foam shops.',
          'Polystyrene beads (EPS beads) — very light and mouldable, like in a beanbag. Put them in an inner bag first, or you will never get them out of the wool again.',
          'A combination — for example fabric at the bottom for weight, and a softer layer on top to sit on.',
        ],
      },
      {
        h: 'How to fill your pouf, step by step',
        lijst: [
          'Turn the pouf upside down and open the zip all the way.',
          'Put the filling into one or more sturdy bags or old pillowcases first. That keeps everything neatly in place, and you can easily empty the cover later to air it.',
          'Push the filling well into the corners and along the edges first, then work towards the middle.',
          'Keep filling until the pouf is really firm — the zip should close with a bit of effort.',
          'Close the zip, stand the pouf upright and pat it into shape with your hands.',
        ],
      },
      {
        h: 'Topping up after a few weeks',
        p: ['Every filling settles a little in the first few weeks. If your pouf feels softer or loses its shape, open the zip and add some more. After that it will stay firm for a long time.'],
      },
      {
        h: 'Caring for your pouf',
        p: ['The wool of a Berber pouf needs very little: airing it and beating out the dust regularly is enough. Dab a stain locally with a damp cloth — do not rub, and do not put the cover in the washing machine. If you put the filling in bags, you can empty it in a few minutes and let the cover air outside.'],
      },
    ],
    slot: { tekst: "Don't have a pouf yet?", to: '/en/poufs', link: 'Browse our Moroccan Berber poufs' },
  },

  {
    slug: 'berber-pouf',
    nl: 'berber-poef',
    eyebrow: 'Guide',
    titel: 'Berber poufs: wool, boucherouite or kilim',
    seoTitel: 'Berber pouf: wool, boucherouite or kilim?',
    description: 'What is a Berber pouf, and how do poufs of high-pile Berber wool, boucherouite and kilim differ? A guide to material, feel and care.',
    intro: 'A Berber pouf is made from a vintage Moroccan rug. Which rug it was determines how it looks, how it feels and how you care for it. These are the three kinds you will find in our collection.',
    secties: [
      {
        h: 'What makes a pouf "Berber"?',
        p: [
          'The Amazigh — better known as Berbers — have been weaving rugs in the Atlas Mountains and on the plains of Morocco for centuries. Every village and every family had its own motifs, colours and techniques. A Berber pouf is sewn by hand from one of these rugs, after years of use.',
          'That makes every pouf unique: the pattern depends on which part of the rug the maker chose, and no two rugs are alike. Small irregularities, faded patches or a mended knot are part of it — that is the history of the rug.',
        ],
      },
      {
        h: 'High-pile Berber wool',
        p: [
          'A thick, knotted pile of sheep\'s wool, often undyed ecru with graphic lines in black or brown, or with blocks of warm colour instead. Rugs like these come from the Middle and High Atlas, where winters are cold and a thick rug means a warm floor.',
          'A high-pile wool pouf is soft and warm to sit on and feels the cosiest of all. The pile traps some dust, so regular beating and airing keeps it fresh.',
        ],
        link: { to: '/en/poufs', tekst: 'Browse the poufs' },
      },
      {
        h: 'Boucherouite',
        p: [
          'Boucherouite (or boucheroui) is a Moroccan rag rug: knotted from strips of recycled fabric rather than wool. The name comes from a Moroccan Arabic expression for a piece of torn, reused cloth.',
          'The result is exuberant: bright colours, free shapes and patterns you will not find anywhere else. A boucherouite pouf is a real eye-catcher — and one of the most sustainable pieces you can bring into your home, because the material already had a first life.',
        ],
      },
      {
        h: 'Kilim',
        p: [
          'A kilim is flat-woven, without a pile. The motifs — lozenges, diamonds, zigzags — are created in the weave itself. That makes a kilim pouf firmer and stiffer than a high-pile one, with a finer pattern you mostly see up close.',
          'Kilim is the practical choice: it holds little dust, it is easy to beat out and it suits a calmer, cleaner interior.',
        ],
        link: { to: '/en/shop?cat=geweven', tekst: 'Browse the woven poufs' },
      },
      {
        h: 'Which one suits you?',
        lijst: [
          'Want softness and warmth, or a pouf to really sit on by the fire: choose high-pile wool.',
          'Want colour and a piece that gets the conversation going: choose boucherouite.',
          'Want something calm that is easy to care for: choose kilim.',
        ],
        p: ['Torn between two pieces? Feel free to get in touch — we are happy to help you decide.'],
      },
    ],
    slot: { tekst: 'Every piece exists only once.', to: '/en/poufs', link: 'Browse all Berber poufs' },
  },

  {
    slug: 'berber-pouf-vs-leather-pouf',
    nl: 'berber-poef-of-leren-poef',
    eyebrow: 'Guide',
    titel: 'Berber pouf or leather pouf?',
    seoTitel: 'Leather pouf or Berber pouf? The difference',
    description: 'Torn between a Moroccan leather pouf and a Berber pouf made from a vintage rug? An honest comparison of feel, look, care and price.',
    intro: 'Both Moroccan, both handmade — but they are very different pieces. An honest comparison, so you can choose what suits your interior.',
    secties: [
      {
        h: 'The leather pouf',
        p: [
          'The classic Moroccan leather pouf comes from the tanneries of Fez and Marrakech, among other places. It is round, usually made of goat leather, and often hand-embroidered or stitched in an ornate pattern.',
          'Leather feels smooth and cool, is sturdy and easy to wipe clean with a damp cloth. Leather poufs are made in large numbers to set designs, so you can easily find two the same. Over the years the leather develops a beautiful patina.',
        ],
      },
      {
        h: 'The Berber pouf',
        p: [
          'A Berber pouf is sewn from a vintage Moroccan rug — high-pile wool, boucherouite or kilim. It feels soft and warm, and brings texture and colour to a room.',
          'Because every rug is different, every Berber pouf exists only once. What you see in the photo is exactly what you get. Caring for it is different from leather: airing, beating out the dust and dabbing stains locally.',
        ],
      },
      {
        h: 'Side by side',
        lijst: [
          'Feel — leather: smooth, cool and firm. Berber: soft, warm and textile.',
          'Look — leather: classic, refined and uniform. Berber: graphic, colourful or understated, always with character.',
          'Uniqueness — leather: often made in series. Berber: one piece per rug.',
          'Care — leather: wipe with a cloth, condition now and then. Berber: air, beat out, dab stains.',
          'Filling — both are often shipped unfilled and you fill them yourself.',
        ],
        link: { to: '/en/how-to-fill-a-pouf', tekst: 'How to fill a pouf' },
      },
      {
        h: 'Which should you choose?',
        p: [
          'If you are looking for a clean, classic accent that is easy to keep clean, leather is a good choice. If you want a piece that adds texture and warmth and that no one else has, choose a Berber pouf.',
          'At Atelier Nomàd we only sell Berber poufs: each one sewn from a vintage rug, and each available only once.',
        ],
      },
    ],
    slot: { tekst: 'Curious what they look like?', to: '/en/poufs', link: 'Browse the collection' },
  },
]

export const getGidsEn = (slug) => gidsenEn.find((g) => g.slug === slug)
