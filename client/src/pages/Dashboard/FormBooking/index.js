import React from 'react'

import ButtonDefault from 'components/Button/Default'
import SelectMini from 'components/Select/Mini'
import SelectLarge from 'components/Select/Large'
import Picker from 'components/Picker/Large'
import './style.scss'

const FormBooking = () => {
  return (
    <div className='form-booking'>
      <div className='form-booking__top'>
        <div className='form-booking__top__item'>
          <SelectMini
            label='Session'
            name='session'
            listItem={[
              { name: 'Morning', value: '07:00,11:59' },
              { name: 'Afternoon', value: '12:00,18:00' }
            ]}
          />
        </div>
        <div className='form-booking__top__item'>
          <SelectMini
            label='Hole'
            name='hole'
            listItem={[
              { name: '9 Holes', value: 9 },
              { name: '18 Holes', value: 18 }
            ]}
          />
        </div>
        <div className='form-booking__top__item'>
          <SelectMini
            label='Quantity of Players'
            name='quantityOfPlayers'
            listItem={[
              { name: '2 Players', value: 2 },
              { name: '3 Players', value: 3 },
              { name: '4 Players', value: 4 }
            ]}
          />
        </div>
      </div>
      <div className='form-booking__bottom'>
        <div className='form-booking__bottom__item'>
          <SelectLarge
            label='Course'
            name='course'
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
          <Picker
            label='Calendar'
            name='calendar'
            value='01/01/2021'
            type='calendar'
          />
        </div>
        <div className='form-booking__bottom__item'>
          <Picker label='Time' name='time' type='clock' value='17:18 - 17:30' />
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
        <ButtonDefault type='button'>Book Now</ButtonDefault>
      </div>
    </div>
  )
}

export default FormBooking
