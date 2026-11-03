import { Link as RRLink, NavLink as RRNavLink } from 'react-router-dom'
import { useTaal } from '../i18n.js'

/* Gewone Link/NavLink, maar op een Engelse pagina wijst to="/over" vanzelf
   naar /en/about (zie src/i18n.js). Schrijf links dus altijd in het Nederlands. */
export function Link({ to, ...rest }) {
  const { lp } = useTaal()
  return <RRLink to={lp(to)} {...rest} />
}

export function NavLink({ to, ...rest }) {
  const { lp } = useTaal()
  return <RRNavLink to={lp(to)} {...rest} />
}
