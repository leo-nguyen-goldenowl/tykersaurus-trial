// const moment = require('moment')
const { validationResult } = require('express-validator')
const { driver } = require('../constants')
const { DriverHelper, generateResponse } = require('../helpers')
const {
  searchCourse,
  findCourseByTeeTimeRange,
  bookCourse
} = require('../helpers/tickets')
const { convertTeeTimeToMinute } = require('../utils/time')
const { loginWithDefaultAccount } = require('./auth')

module.exports = new (class TicketController {
  /**
   * Booking with default account
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async bookingWithDefaultAccount(req, res) {
    const { date, course, session, player, hole, teeTimeRange } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(errors)
      }

      const { from: fromTeeTime, to: toTeeTime } = teeTimeRange
      if (
        convertTeeTimeToMinute(fromTeeTime) > convertTeeTimeToMinute(toTeeTime)
      ) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Invalid time range' }] })
      }

      const dateISOString = new Date(date)
      // const dayOfDate = dateISOString.getDay()
      // const { listValidListCriteria } = tickets
      // const optionListCriteria =
      //   dayOfDate > 0 && dayOfDate < 5
      //     ? 'head'
      //     : dayOfDate === 5
      //       ? 'middle'
      //       : 'tail'

      // const checkListCritera =
      //   listValidListCriteria[optionListCriteria][session]
      // const isValidPlayerAndHole =
      //   checkListCritera['player'][player] && checkListCritera['hole'][hole]
      // console.log(isValidPlayerAndHole)
      /**
       * TODO: check valid date
       */
      // const today = moment().format('L')
      // const todaySevenAM = new Date(`${today} 07:00`)
      // const diffMinutes = moment().diff(moment(todaySevenAM), 'minutes') < 0

      // if (!isValidPlayerAndHole) {
      //   return res.status(400).send({ errors: [{ msg: 'Invalid criteria' }] })
      // }

      const webDriver = await DriverHelper.openBrowser({
        type: driver.browser.CHROME
      })

      await loginWithDefaultAccount(webDriver)

      await searchCourse({
        webDriver,
        listCriteria: {
          date: dateISOString,
          course,
          session,
          player,
          hole
        }
      })

      const courseByTeeTimeRange = await findCourseByTeeTimeRange({
        webDriver,
        teeTimeRange
      })

      if (!courseByTeeTimeRange) {
        const response = generateResponse({
          statusSuccess: false,
          statusCode   : 200,
          message      : 'No slots available within time range!!!'
        })
        return res.json(response)
      } else {
        await bookCourse({ webDriver, courseByTeeTimeRange })
      }

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : 'Ready to book now!!!'
      })
      return res.json(response)
    } catch (error) {
      console.log(error)

      if (
        error.name === 'NoSuchElementError' &&
        error.message ===
          'no such element: Unable to locate element: {"method":"css selector","selector":".ant-table-pagination"}\n  (Session info: chrome=87.0.4280.88)'
      ) {
        const response = generateResponse({
          statusSuccess: true,
          statusCode   : 200,
          message      : "Don't have any slots for booking!!!"
        })
        return res.json(response)
      }
      res.status(500).json({
        msg: 'Server error...'
      })
    }
  }
})()
