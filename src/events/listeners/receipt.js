const Receipt = require('../../models/Receipt')
const { driver } = require('../../constants')
const {
  ReceiptHelper,
  DriverHelper
  // generateResponse
} = require('../../helpers')
const {
  searchCourse,
  findCourseByTeeTimeRange,
  bookCourse
} = require('../../helpers/tickets')
const { convertTeeTimeToMinute } = require('../../utils/time')
const { loginWithDefaultAccount } = require('../../controllers/auth')

const createReceiptInBackgroundJob = async (ticket) => {
  const { date, session, course, player, hole, teeTimeRange } = ticket

  const webDriver = await DriverHelper.openBrowser({
    type: driver.browser.CHROME
  })

  const receipt = new Receipt({
    date,
    session,
    course,
    player,
    hole
  })

  try {
    const { from: fromTeeTime, to: toTeeTime } = teeTimeRange
    const partOfSession = session.split(',')

    const minuteFromSession = convertTeeTimeToMinute(partOfSession[0])
    const minuteToSession = convertTeeTimeToMinute(partOfSession[1])
    const minuteFromTeeTime = convertTeeTimeToMinute(fromTeeTime)
    const minuteToTeeTime = convertTeeTimeToMinute(toTeeTime)

    const checkPartOfTeeTime = (teeTime) => {
      return teeTime < minuteFromSession || teeTime > minuteToSession
    }

    const validTimeRange =
      minuteFromTeeTime > minuteToTeeTime &&
      checkPartOfTeeTime(minuteFromTeeTime) &&
      checkPartOfTeeTime(minuteToTeeTime)
    if (validTimeRange) {
      // return res.status(400).send({ errors: [{ msg: 'Invalid time range' }] })
    }

    const dateISOString = new Date(date)

    await loginWithDefaultAccount(webDriver)

    const checkSearch = await searchCourse({
      webDriver,
      listCriteria: {
        date: dateISOString,
        course,
        session,
        player,
        hole
      }
    })

    if (checkSearch === false) {
      await DriverHelper.quitBrowser({ webDriver })

      // const response = generateResponse({
      //   statusSuccess: false,
      //   statusCode   : 200,
      //   message      : "Don't have any slots for booking!!!"
      // })
      // return res.json(response)
    }

    const courseByTeeTimeRange = await findCourseByTeeTimeRange({
      webDriver,
      teeTimeRange
    })

    if (!courseByTeeTimeRange) {
      await DriverHelper.quitBrowser({ webDriver })

      // const response = generateResponse({
      //   statusSuccess: false,
      //   statusCode   : 200,
      //   message      : 'No slots available within time range!!!'
      // })
      // return res.json(response)
    } else {
      await bookCourse({ webDriver, courseByTeeTimeRange })
    }

    await DriverHelper.quitBrowser({ webDriver })

    await ReceiptHelper.createReceiptWithStatus({
      ticket: receipt,
      status: true
    })
  } catch (error) {
    console.log(error)
    await ReceiptHelper.createReceiptWithStatus({
      ticket: receipt,
      status: false
    })

    if (
      error.name === 'NoSuchElementError' &&
      (error.message.includes('.ant-table-pagination') ||
        error.message.includes(`input[@value="${hole}"]`))
    ) {
      await DriverHelper.quitBrowser({ webDriver })

      // const response = generateResponse({
      //   statusSuccess: false,
      //   statusCode   : 200,
      //   message      : "Don't have any slots for booking!!!"
      // })
      // return res.json(response)
    }

    await DriverHelper.quitBrowser({ webDriver })
    // res.status(500).json({
    //   msg: 'Server error...'
    // })
  }
}

module.exports = {
  createReceiptInBackgroundJob
}
