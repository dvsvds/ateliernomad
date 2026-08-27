/** Wrapper die zijn kinderen zacht laat infaden bij het scrollen. */
export default function Reveal({ as: Tag = 'div', delay, className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`} data-delay={delay} {...rest}>
      {children}
    </Tag>
  )
}
