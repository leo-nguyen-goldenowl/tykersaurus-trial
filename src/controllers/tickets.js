// const moment = require('moment')
const { validationResult } = require('express-validator')
const {
  // driver,
  receipts
} = require('../constants')
const {
  // DriverHelper,
  generateResponse
} = require('../helpers')
// const {
//   searchCourse,
//   findCourseByTeeTimeRange,
//   bookCourse
// } = require('../helpers/tickets')
// const { convertTeeTimeToMinute } = require('../utils/time')
// const { loginWithDefaultAccount } = require('./auth')

const { receiptEventEmitter } = require('../events/dispatchers/receipt')

module.exports = new (class TicketController {
  /**
   * Booking with default account
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async bookingWithDefaultAccount(req, res) {
    const { date, course, session, player, hole, teeTimeRange } = req.body
    // const webDriver = await DriverHelper.openBrowser({
    //   type: driver.browser.CHROME
    // })

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(errors)
      }

      // const { from: fromTeeTime, to: toTeeTime } = teeTimeRange
      // const partOfSession = session.split(',')

      // const minuteFromSession = convertTeeTimeToMinute(partOfSession[0])
      // const minuteToSession = convertTeeTimeToMinute(partOfSession[1])
      // const minuteFromTeeTime = convertTeeTimeToMinute(fromTeeTime)
      // const minuteToTeeTime = convertTeeTimeToMinute(toTeeTime)

      // const checkPartOfTeeTime = (teeTime) => {
      //   return teeTime < minuteFromSession || teeTime > minuteToSession
      // }

      // const validTimeRange =
      //   minuteFromTeeTime > minuteToTeeTime &&
      //   checkPartOfTeeTime(minuteFromTeeTime) &&
      //   checkPartOfTeeTime(minuteToTeeTime)
      // if (validTimeRange) {
      //   return res
      //     .status(400)
      //     .send({ errors: [{ msg: 'Invalid time range' }] })
      // }

      // const dateISOString = new Date(date)

      // await loginWithDefaultAccount(webDriver)

      // const checkSearch = await searchCourse({
      //   webDriver,
      //   listCriteria: {
      //     date: dateISOString,
      //     course,
      //     session,
      //     player,
      //     hole
      //   }
      // })

      // if (checkSearch === false) {
      //   await DriverHelper.quitBrowser({ webDriver })

      //   const response = generateResponse({
      //     statusSuccess: false,
      //     statusCode   : 200,
      //     message      : "Don't have any slots for booking!!!"
      //   })
      //   return res.json(response)
      // }

      // const courseByTeeTimeRange = await findCourseByTeeTimeRange({
      //   webDriver,
      //   teeTimeRange
      // })

      // if (!courseByTeeTimeRange) {
      //   await DriverHelper.quitBrowser({ webDriver })

      //   const response = generateResponse({
      //     statusSuccess: false,
      //     statusCode   : 200,
      //     message      : 'No slots available within time range!!!'
      //   })
      //   return res.json(response)
      // } else {
      //   await bookCourse({ webDriver, courseByTeeTimeRange })
      // }

      // await DriverHelper.quitBrowser({ webDriver })

      const ticket = {
        date,
        course,
        session,
        player,
        hole,
        teeTimeRange
      }
      receiptEventEmitter.emit(receipts.NEW_RECEIPT_CREATED, ticket)

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : "We're processing..."
      })
      return res.json(response)
    } catch (error) {
      console.log(error)
      // if (
      //   error.name === 'NoSuchElementError' &&
      //   (error.message.includes('.ant-table-pagination') ||
      //     error.message.includes(`input[@value="${hole}"]`))
      // ) {
      //   await DriverHelper.quitBrowser({ webDriver })

      //   const response = generateResponse({
      //     statusSuccess: false,
      //     statusCode   : 200,
      //     message      : "Don't have any slots for booking!!!"
      //   })
      //   return res.json(response)
      // }

      // await DriverHelper.quitBrowser({ webDriver })
      res.status(500).json({
        msg: 'Server error...'
      })
    }
  }
})()
