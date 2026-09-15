/**
 * Verstuurt een formulier naar Netlify Forms.
 *
 * Netlify herkent formulieren door bij het deployen de statische HTML te
 * lezen. Deze site rendert zijn formulieren met React, dus in index.html
 * staat per formulier een verborgen kopie met dezelfde veldnamen. Voeg je
 * hier een veld toe, zet het daar dan ook bij — anders gooit Netlify het weg.
 *
 * Inzendingen staan in Netlify onder Forms en worden per mail doorgestuurd
 * naar het adres dat daar als melding is ingesteld.
 *
 * Geeft true terug bij succes, false bij elke fout — de aanroeper toont dan
 * een foutmelding in plaats van ten onrechte "verzonden".
 */
export async function verstuurFormulier(naam, velden) {
  const data = velden instanceof FormData ? Object.fromEntries(velden) : velden
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': naam, ...data }).toString(),
    })
    return res.ok
  } catch {
    return false
  }
}
