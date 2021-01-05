import { Course } from 'constants/actionTypes'

export const failBookCourse = () => ({
  type: Course.FAIL_REQUEST_COURSE
})

export const requestBookCourse = () => ({
  type: Course.REQUEST_BOOK_COURSE
})

export const bookCourse = ({ infoCourse }) => ({
  type   : Course.BOOK_COURSE,
  payload: { infoCourse }
})
