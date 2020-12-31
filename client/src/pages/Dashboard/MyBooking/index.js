import React from 'react'

import './style.scss'

const MyBooking = () => {
  return (
    <div className='my-booking'>
      <p className='my-booking__title'>My booking</p>
      <table>
        <thead>
          <tr>
            <th className='my-booking__date'>Date</th>
            <th className='my-booking__tee-time'>Tee time</th>
            <th className='my-booking__player'>Quantity of Players</th>
            <th className='my-booking__start'>Start Tee</th>
            <th className='my-booking__course'>Golf Course</th>
          </tr>
        </thead>
      </table>
      <div className='my-booking__container'>
        <table className='main'>
          <thead className=''>
            <tr>
              <th className='my-booking__date'>Date</th>
              <th className='my-booking__tee-time'>Tee time</th>
              <th className='my-booking__player'>Quantity of Players</th>
              <th className='my-booking__start'>Start Tee</th>
              <th className='my-booking__course'>Golf Course</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
            <tr>
              <td>29 December 2020</td>
              <td>17:43</td>
              <td>4</td>
              <td>
                1<sup>st</sup>
              </td>
              <td>Classic course</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBooking
