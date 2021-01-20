const moment = require('moment')
const { By } = require('selenium-webdriver')
const DriverHelper = require('./driver')
const { time } = require('../utils')
module.exports = new (class TicketHelper {
  /**
   * Search course
   * @param {Object} webDriver
   * @param {date: string - MM/DD/YYYY,
   *         course: string - Masters Course|Classic Course,
   *         session: string - 07:00,11:59|12:00,18:00,
   *         player: number - 2|3|4,
   *         hole: number - 9|18} listCriteria
   */
  async searchCourse({ webDriver, listCriteria }) {
    const { date, course, session, player, hole } = listCriteria

    // Find course select and set value
    await DriverHelper.clickWaitUntilElementByClassname({
      webDriver,
      name: 'ant-select-selection--single'
    })
    const optionUnSelectedCourse = await DriverHelper.findElementByXpathInContainerByClassName(
      {
        webDriver,
        name: {
          container: 'ant-select-dropdown--single',
          element  : 'li[@aria-selected="false"]'
        }
      }
    )
    if ((await optionUnSelectedCourse.getText()) === course) {
      await optionUnSelectedCourse.click()
    } else {
      await DriverHelper.clickElementByXpathInContainerByClassName({
        webDriver,
        name: {
          container: 'ant-select-dropdown--single',
          element  : 'li[@aria-selected="true"]'
        }
      })
    }

    // Find date input and set value
    await DriverHelper.clickWaitUntilElementByClassname({
      webDriver,
      name: 'ant-calendar-picker-input'
    })
    await DriverHelper.clickElementByXpath({
      webDriver,
      name: `td[@title="${moment(date).format('LL')}"]`
    })

    await webDriver.manage().setTimeouts({ implicit: 3000 })

    const listInputById = [
      { container: 'timeArr', element: `input[@value="${session}"]` },
      { container: 'Pax', element: `input[@value="${player}"]` },
      { container: 'holeno', element: `input[@value="${hole}"]` }
    ]

    let countInputDisabled = 0

    // Fill in value for session, player, hole
    for (let inputById of listInputById) {
      const elementInput = await DriverHelper.findElementByXpathInContainerById(
        {
          webDriver,
          name: {
            container: inputById.container,
            element  : inputById.element
          }
        }
      )
      if (await elementInput.getAttribute('disabled')) {
        countInputDisabled++
      } else {
        await elementInput.click()
      }
    }

    if (countInputDisabled === 0) {
      // Fire search button
      return await DriverHelper.clickElementByXpathInContainerByClassName({
        webDriver,
        name: {
          container: 'ant-form-horizontal',
          element  : 'button[@type="submit"]'
        }
      })
    } else {
      return false
    }
  }

  async findCourseByTeeTimeRange({ webDriver, teeTimeRange }) {
    const containerTeeTime = await DriverHelper.findElementWaitUntilByClassName(
      { webDriver, name: 'ant-table-tbody' }
    )

    await webDriver.manage().setTimeouts({ implicit: 5000 })

    let listElementCourseWithTeeTime = []

    const listItemPagination = await DriverHelper.findElementsByClassNameInContainerByClassName(
      {
        webDriver,
        name: {
          container: 'ant-table-pagination',
          element  : 'ant-pagination-item'
        }
      }
    )

    for (let itemPagination of listItemPagination) {
      await itemPagination.getText()
      await itemPagination.click()

      const listTeeTimeElementCurrent = await containerTeeTime.findElements(
        By.className('ant-table-row-level-0')
      )
      const { from: fromTeeTime, to: toTeeTime } = teeTimeRange

      for (let teeTime of listTeeTimeElementCurrent) {
        const teetimeText = await (
          await teeTime.findElement(
            By.className('ant-table-row-cell-break-word')
          )
        ).getText()

        const currentTeeTime = time.convertTeeTimeToMinute(teetimeText)
        if (
          Number(currentTeeTime) >=
            Number(time.convertTeeTimeToMinute(fromTeeTime)) &&
          Number(currentTeeTime) <=
            Number(time.convertTeeTimeToMinute(toTeeTime))
        )
          listElementCourseWithTeeTime.push({
            elementPage  : itemPagination,
            elementCourse: teeTime,
            index        : time.convertTeeTimeToMinute(teetimeText),
            teeTime      : teetimeText
          })
      }

      // Wait for nexting page
      await webDriver.manage().setTimeouts({ implicit: 10000 })
    }

    return listElementCourseWithTeeTime.sort((x, y) => x.index > y.index)[0]
  }

  async bookCourse({ webDriver, courseByTeeTimeRange }) {
    await courseByTeeTimeRange['elementPage'].click()
    await webDriver.manage().setTimeouts({ implicit: 5000 })

    const containerTeeTime = await DriverHelper.findElementWaitUntilByClassName(
      { webDriver, name: 'ant-table-tbody' }
    )

    const listTeeTimeElementCurrent = await containerTeeTime.findElements(
      By.className('ant-table-row-level-0')
    )

    for (let teeTime of listTeeTimeElementCurrent) {
      const teetimeText = await (
        await teeTime.findElement(By.className('ant-table-row-cell-break-word'))
      ).getText()

      if (teetimeText === courseByTeeTimeRange.teeTime) {
        const buttonBook = await await teeTime.findElement(
          By.className('ant-btn-primary')
        )
        await buttonBook.click()
      }
    }

    const footerModalBooking = await DriverHelper.findElementByClassNameInContainerByClassName(
      {
        webDriver,
        name: {
          container: 'ant-modal-content',
          element  : 'ant-modal-footer'
        }
      }
    )

    // click next invite
    await DriverHelper.clickElementByClassnameInContainer({
      container: footerModalBooking,
      name     : 'ant-btn-primary'
    })

    // click next info
    await DriverHelper.clickElementByClassnameInContainer({
      container: footerModalBooking,
      name     : 'ant-btn-primary'
    })

    const fn = async () => {
      // click confirm
      await DriverHelper.clickElementByClassnameInContainer({
        container: footerModalBooking,
        name     : 'ant-btn-primary'
      })

      // get status button on modal after booking
      const buttonStatus = await DriverHelper.findElementByClassNameInContainerByClassName(
        {
          webDriver,
          name: {
            container: 'ant-modal-content',
            element  : 'ant-btn-primary'
          }
        }
      )

      const textStatus = await buttonStatus.getText()

      if (textStatus === 'Done') {
        await buttonStatus.click()
      } else if (textStatus === 'Back') {
        await buttonStatus.click()
        await fn()
      }
    }

    fn()
  }
})()
