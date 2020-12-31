import React from 'react'

import HeaderPage from 'containers/HeaderPage'
import FormBooking from './FormBooking'
import MyBooking from './MyBooking'

import './style.scss'

const DashboardPage = () => {
  return (
    <div className='dashboard-page'>
      <HeaderPage />
      <div className='dashboard-page__book-course'>
        <div className='dashboard-page__book-course__form'>
          <FormBooking />
        </div>
      </div>
      <MyBooking />
    </div>
  )
}

export default DashboardPage
