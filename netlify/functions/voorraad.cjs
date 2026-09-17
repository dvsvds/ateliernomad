const { stand } = require('../lib/voorraad.cjs')

/* Publieke, alleen-lezen stand: welke stukken zijn verkocht of net
   gereserveerd. De site haalt dit op om "Verkocht" te tonen en de
   koopknop uit te zetten. Geen cache: een stuk dat net verkocht is,
   moet meteen zo staan. */
exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  try {
    const s = await stand(event)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(s),
    }
  } catch (err) {
    console.error('voorraad opvragen mislukt:', err.message)
    // Liever "alles beschikbaar" dan een kapotte shop; de checkout
    // controleert sowieso nog een keer.
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify({ verkocht: [], gereserveerd: [], fout: err.message }) }
  }
}
