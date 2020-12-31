import React from 'react'

const MyBooking = () => {
  return (
    <div className='my-booking'>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tee time</th>
            <th>Quantity of Players</th>
            <th>Start Tee</th>
            <th>Golf Course</th>
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
        </tbody>
      </table>
    </div>
  )
}

export default MyBooking
