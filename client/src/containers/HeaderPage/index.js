import React from 'react'

import LogoPage from 'components/Logo'

import './style.scss'

const HeaderPage = () => {
  return (
    <div className='header-page'>
      <LogoPage />
      <p className='header-page__hello'>
        Hey Terence! Ready to book your <br />
        <span>Course?</span>
      </p>
    </div>
  )
}

export default HeaderPage
