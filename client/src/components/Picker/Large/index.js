import React from 'react'

import { Img } from 'reusable'

import CalendarIcon from 'assets/images/icons/calendar.svg'
import ClockIcon from 'assets/images/icons/clock.svg'

import './style.scss'

const Picker = ({ label, value, name, type }) => {
  const IconPicker = type === 'calendar' ? CalendarIcon : ClockIcon
  return (
    <div className='picker'>
      <p className='picker__label'>{label}</p>
      <div>
        <p className='picker__value' name={name}>
          {value}
        </p>
        <Img src={IconPicker} effect='opacity' />
      </div>
    </div>
  )
}

export default Picker
