import React from 'react'
import TimePicker from 'rc-time-picker'
import moment from 'moment'

import { Img } from 'reusable'

import ClockIcon from 'assets/images/icons/clock.svg'

import './style.scss'

const TimePickerCustom = ({ label, value }) => {
  return (
    <div className='timepicker-custom'>
      <p className='timepicker-custom__label'>{label}</p>
      <div className='timepicker-custom__container'>
        <div className='time'>
          <TimePicker
            defaultValue={moment(value.from)}
            showSecond={false}
            allowEmpty={false}
            name='from'
          />
          <Img src={ClockIcon} className='icon' effect='opacity' />
        </div>

        <span className='minus'>-</span>
        <div className='time'>
          <TimePicker
            defaultValue={moment(value.to)}
            showSecond={false}
            allowEmpty={false}
            name='to'
          />
          <Img src={ClockIcon} className='icon' effect='opacity' />
        </div>
      </div>
    </div>
  )
}

export default TimePickerCustom
