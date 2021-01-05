import { Course } from 'constants/actionTypes'

const initailState = {
  loadingBookCourse: false
}

const ticket = (state = initailState, action) => {
  switch (action.type) {
    case Course.REQUEST_BOOK_COURSE:
      return { ...state, loadingBookCourse: true }
    case Course.FAIL_REQUEST_COURSE:
      return { ...state, loadingBookCourse: false }
    case Course.BOOK_COURSE:
      return { ...state, loadingBookCourse: false }
    default:
      return state
  }
}

export default ticket
