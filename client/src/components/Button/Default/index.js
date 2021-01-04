import React from 'react'

import './style.scss'

const ButtonDefault = ({ children, type, onClick, ...rest }) => {
  return (
    <button className='button-default' type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default ButtonDefault
