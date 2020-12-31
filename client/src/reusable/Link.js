import React from 'react'

const Link = ({ href, target, className, children, ...rest }) => {
  return (
    <a
      className={className}
      href={href}
      target={target}
      rel='noreferrer noopener'
      {...rest}
    >
      {children}
    </a>
  )
}

export default Link
