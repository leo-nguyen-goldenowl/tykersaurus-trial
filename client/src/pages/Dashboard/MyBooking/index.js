import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchListReceiptIfNeedeed } from 'redux/services/receipt'

import './style.scss'

const MyBooking = () => {
  const dispatch = useDispatch()
  const listReceipt = useSelector((state) => state.receipt.listReceipt)

  useEffect(() => {
    dispatch(fetchListReceiptIfNeedeed())
  }, [])

  const listReceiptSuccess = Object.values(listReceipt).filter(
    (receipt) => receipt.status === true
  )

  return (
    <div className='my-booking'>
      <p className='my-booking__title'>My booking</p>
      <table>
        <thead>
          <tr>
            <th className='my-booking__date'>Date</th>
            <th className='my-booking__tee-time'>Tee time</th>
            <th className='my-booking__player'>Quantity of Players</th>
            {/* <th className='my-booking__start'>Start Tee</th> */}
            <th className='my-booking__course'>Golf Course</th>
          </tr>
        </thead>
      </table>
      <div className='my-booking__container'>
        <table className='main'>
          <thead className='hide'>
            <tr>
              <th className='my-booking__date'>Date</th>
              <th className='my-booking__tee-time'>Tee time</th>
              <th className='my-booking__player'>Quantity of Players</th>
              {/* <th className='my-booking__start'>Start Tee</th> */}
              <th className='my-booking__course'>Golf Course</th>
            </tr>
          </thead>
          <tbody>
            {listReceiptSuccess.map((receipt) => (
              <tr key={receipt._id}>
                <td>{receipt.date}</td>
                <td>{receipt.teeTime}</td>
                <td>{receipt.player}</td>
                {/* <td>
                  1<sup>st</sup>
                </td> */}
                <td>{receipt.hole}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {listReceiptSuccess.length === 0 && (
          <p>Do not have any booking course</p>
        )}
      </div>
    </div>
  )
}

export default MyBooking
