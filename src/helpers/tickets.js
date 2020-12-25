const moment = require('moment')
const DriverHelper = require('./driver')
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

    const listInputById = [
      { container: 'timeArr', element: `input[@value="${session}"]` },
      { container: 'Pax', element: `input[@value="${player}"]` },
      { container: 'holeno', element: `input[@value="${hole}"]` }
    ]

    // Fill in value for session, player, hole
    for (let inputById of listInputById) {
      await DriverHelper.clickElementByXpathInContainerById({
        webDriver,
        name: {
          container: inputById.container,
          element  : inputById.element
        }
      })
    }

    // Fire search button
    await DriverHelper.clickElementByXpathInContainerByClassName({
      webDriver,
      name: {
        container: 'ant-form-horizontal',
        element  : 'button[@type="submit"]'
      }
    })
  }
})()
