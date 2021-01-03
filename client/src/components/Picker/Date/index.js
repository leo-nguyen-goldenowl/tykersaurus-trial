import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { Img } from 'reusable'

import CalendarIcon from 'assets/images/icons/calendar.svg'

import './style.scss'

const DatePickerCustom = ({ label, value, name, onChange }) => {
  const IconPicker = CalendarIcon

  const todayMoment = moment()
  const today = new Date()
  const maxDate = moment(todayMoment).add(
    moment(moment()).diff(
      moment(moment().format('MM/DD/YYYY 7:00'), 'MM-DD-YYYY hh:mm'),
      'seconds'
    ) > 0
      ? 7
      : 6,
    'days'
  )

  return (
    <div className='datepicker-custom'>
      <p className='datepicker-custom__label'>{label}</p>
      <div className='datepicker-custom__container'>
        <div className='datepicker'>
          <DatePicker
            selected={new Date(value)}
            onChange={(date) => onChange(date)}
            minDate={today}
            maxDate={new Date(maxDate)}
            showDisabledMonthNavigation
          />
        </div>

        <p className='datepicker-custom__value' name={name}>
          {value}
        </p>
        <Img
          src={IconPicker}
          effect='opacity'
          className='datepicker-custom__icon'
        />
      </div>
    </div>
  )
}

export default DatePickerCustom
