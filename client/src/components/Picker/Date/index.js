import React from 'react'
import DatePicker from 'react-datepicker'
import { Img } from 'reusable'

import CalendarIcon from 'assets/images/icons/calendar.svg'

import './style.scss'

const DatePickerCustom = ({ label, value, name,onChange }) => {
  const IconPicker = CalendarIcon
  console.log(value)
  return (
    <div className='datepicker-custom'>
      <p className='datepicker-custom__label'>{label}</p>
      <div className='datepicker-custom__container'>
        <div className='datepicker'>
          <DatePicker
            selected={new Date(value)}
            onChange={(date) => onChange(date)}
            minDate={new Date()}
            // maxDate={new Date()}
            showDisabledMonthNavigation
          />
        </div>

        <p className='datepicker-custom__value' name={name}>
          {value}
        </p>
        <Img src={IconPicker} effect='opacity' className='datepicker-custom__icon' />
      </div>
    </div>
  )
}

export default DatePickerCustom
