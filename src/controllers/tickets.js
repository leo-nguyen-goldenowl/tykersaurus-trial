// const moment = require('moment')
const { validationResult } = require('express-validator')
const moment = require('moment')
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
const { time } = require('../utils')
const Task = require('../models/Task')

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

      const todayMoment = moment()
      const maxDate = moment(todayMoment).add(
        moment(moment()).diff(
          moment(moment().format('MM/DD/YYYY 7:00'), 'MM-DD-YYYY hh:mm'),
          'seconds'
        ) > 0
          ? 7
          : 6,
        'days'
      )

      const isAccessBooking = time.accessBooking(date)

      if (!isAccessBooking) {
        console.log('cant book now')

        const task = new Task({
          date,
          course,
          session,
          player,
          hole,
          teeTimeRange
        })
        await task.save()
      } else {
        console.log('book now')
        receiptEventEmitter.emit(receipts.NEW_RECEIPT_CREATED, ticket)
      }
      console.log(isAccessBooking)
      console.log(moment(moment(maxDate).format('MM/DD/YYYY 00:00')))
      console.log(ticket)

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : "We're processing..."
      })
      return res.json(response)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        msg: 'Server error...'
      })
    }
  }
})()
