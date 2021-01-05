import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useMergeState } from 'hooks'

import { bookingCourse } from 'redux/services/ticket'

import ButtonDefault from 'components/Button/Default'
import SelectMini from 'components/Select/Mini'
import SelectLarge from 'components/Select/Large'
import DatePicker from 'components/Picker/Date'
import TimePicker from 'components/Picker/Time'

import './style.scss'
import { toastifyNotify } from 'helpers'

const FormBooking = () => {
  const dispatch = useDispatch()

  const listSelectTop = [
    {
      label   : 'Session',
      name    : 'session',
      listItem: [
        { name: 'Morning', value: '07:00,11:59' },
        { name: 'Afternoon', value: '12:00,18:00' }
      ]
    },
    {
      label   : 'Hole',
      name    : 'hole',
      listItem: [
        { name: '9 Holes', value: 9 },
        { name: '18 Holes', value: 18 }
      ]
    },
    {
      label   : 'Quantity of Players',
      name    : 'player',
      listItem: [
        { name: '2 Players', value: 2 },
        { name: '3 Players', value: 3 },
        { name: '4 Players', value: 4 }
      ]
    }
  ]

  const [dataBooking, setDataBooking] = useMergeState({
    session     : '07:00,11:59',
    hole        : 9,
    player      : 2,
    course      : 'Classic Course',
    date        : moment().format('ddd, MMM DD YYYY'),
    teeTimeRange: {
      from: moment(),
      to  : moment()
    }
  })

  const handleChangeDate = (value) => {
    setDataBooking({ ['date']: moment(value).format('ddd, MMM DD YYYY') })
  }

  const handleChangeSelect = (e) => {
    const { name, value } = e.target
    setDataBooking({ [name]: value })
  }

  const handleChangeTime = (value, type) => {
    setDataBooking({
      teeTimeRange: {
        ...dataBooking.teeTimeRange,
        [type]: value
      }
    })
  }

  const handleValidDataBooking = () => {
    const { from: fromTeeTime, to: toTeetime } = dataBooking.teeTimeRange

    return (
      moment(moment(toTeetime)).diff(moment(moment(fromTeeTime)), 'minutes') >=
      0
    )
  }

  const handleSubmit = () => {
    if (handleValidDataBooking()) {
      const { session, hole, player, course, date, teeTimeRange } = dataBooking

      const infoCourse = {
        session,
        hole        : Number(hole),
        player      : Number(player),
        course,
        date        : moment(date).format('MM/DD/YYYY'),
        teeTimeRange: {
          from: moment(teeTimeRange.from).format('HH:mm'),
          to  : moment(teeTimeRange.to).format('HH:mm')
        }
      }
      console.log(infoCourse)
      dispatch(bookingCourse({ infoCourse }))
    } else {
      toastifyNotify('error', 'Please choose valid time!!!', 5000)
    }
  }

  return (
    <div className='form-booking'>
      <div className='form-booking__top'>
        {listSelectTop.map((select, idx) => (
          <div className='form-booking__top__item' key={idx}>
            <SelectMini
              label={select.label}
              name={select.name}
              value={dataBooking[select.name]}
              listItem={select.listItem}
              onChange={handleChangeSelect}
            />
          </div>
        ))}
      </div>
      <div className='form-booking__bottom'>
        <div className='form-booking__bottom__item'>
          <SelectLarge
            label='Course'
            name='course'
            value={dataBooking.course}
            onChange={handleChangeSelect}
            listItem={[
              { name: 'Classic Course', value: 'Classic Course' },
              {
                name : 'Masters Course',
                value: 'Masters Course'
              }
            ]}
          />
        </div>
        <div className='form-booking__bottom__item'>
          <DatePicker
            label='Calendar'
            name='calendar'
            value={dataBooking.date}
            type='calendar'
            onChange={handleChangeDate}
          />
        </div>
        <div className='form-booking__bottom__item'>
          <TimePicker
            value={dataBooking.teeTimeRange}
            label='Time'
            onChange={handleChangeTime}
          />
        </div>
      </div>
      <p className='form-booking__description'>
        <span>Description:</span> Lorem ipsum dolor sit amet, modus inimicus eum
        no <span>7AM</span> at nam modus <span>1 week</span> consul. Mucius
        oportere vel id. Ut solum malorum conclusionemque qui. Mea te graeci
        eruditi honestatis. Ne iisque placerat est, mel in dicunt invenire. Te
        his delenit eloquentiam.
      </p>
      <div className='form-booking__btn-submit'>
        <ButtonDefault type='button' onClick={handleSubmit}>
          Book Now
        </ButtonDefault>
      </div>
    </div>
  )
}

export default FormBooking
