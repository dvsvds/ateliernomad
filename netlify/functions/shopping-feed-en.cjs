const { handler } = require('./shopping-feed.cjs')

/* Engelse Shopping-feed — /google-shopping-en.xml (zie public/_redirects).
   Een eigen functie, omdat Netlify een ?query in het doel van een
   doorverwijzing niet aan de functie doorgeeft. */
exports.handler = (event) =>
  handler({ ...event, queryStringParameters: { ...(event.queryStringParameters || {}), taal: 'en' } })
