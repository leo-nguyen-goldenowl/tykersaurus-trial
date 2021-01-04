const Receipt = require('../../models/Receipt')
const { driver } = require('../../constants')
const { ReceiptHelper, DriverHelper } = require('../../helpers')
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
    hole,
    created_at: new Date()
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
      receipt.message = 'Invalid time range'
      await ReceiptHelper.createReceiptWithStatus({
        ticket: receipt,
        status: false
      })
      await DriverHelper.quitBrowser({ webDriver })
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

      receipt.message = "Don't have any slots for booking!!!"
      await ReceiptHelper.createReceiptWithStatus({
        ticket: receipt,
        status: false
      })
      await DriverHelper.quitBrowser({ webDriver })
    }

    const courseByTeeTimeRange = await findCourseByTeeTimeRange({
      webDriver,
      teeTimeRange
    })

    if (!courseByTeeTimeRange) {
      await DriverHelper.quitBrowser({ webDriver })
      receipt.message = 'No slots available within time range!!!'
      await ReceiptHelper.createReceiptWithStatus({
        ticket: receipt,
        status: false
      })
      await DriverHelper.quitBrowser({ webDriver })
    } else {
      receipt.teeTime = courseByTeeTimeRange['teeTime']
      await bookCourse({ webDriver, courseByTeeTimeRange })
    }

    await DriverHelper.quitBrowser({ webDriver })

    await ReceiptHelper.createReceiptWithStatus({
      ticket: receipt,
      status: true
    })
  } catch (error) {
    console.log(error)

    if (
      error.name === 'NoSuchElementError' &&
      (error.message.includes('.ant-table-pagination') ||
        error.message.includes(`input[@value="${hole}"]`))
    ) {
      await DriverHelper.quitBrowser({ webDriver })

      receipt.message = "Don't have any slots for booking!!!"
    }

    await DriverHelper.quitBrowser({ webDriver })

    // receipt.message = 'Server error...'
    await ReceiptHelper.createReceiptWithStatus({
      ticket: receipt,
      status: false
    })
  }
}

module.exports = {
  createReceiptInBackgroundJob
}
