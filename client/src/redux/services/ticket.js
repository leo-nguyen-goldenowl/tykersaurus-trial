import {
  failBookCourse,
  requestBookCourse,
  bookCourse
} from '../actions/ticket'

import api from 'api'
import { isSuccessResponse, toastifyNotify } from 'helpers'

export const bookingCourse = ({ infoCourse }) => async (dispatch) => {
  dispatch(requestBookCourse())
  try {
    const { session, course, hole, player, date, teeTimeRange } = infoCourse
    const body = {
      session,
      course,
      hole,
      player,
      date,
      teeTimeRange
    }
    const res = await api.post('/tickets/default/book', body)

    if (isSuccessResponse(res)) {
      toastifyNotify(
        'warning',
        'Processing your request... Please wait one minute...',
        5000
      )
      dispatch(bookCourse())
    } else {
      dispatch(failBookCourse())
    }
  } catch (error) {
    dispatch(failBookCourse())
  }
}
