const { By, until } = require('selenium-webdriver')
const moment = require('moment')

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

    // Fire course select and set value
    await webDriver
      .wait(until.elementLocated(By.className('ant-select-selection--single')))
      .click()
    const containerCourse = await webDriver.wait(
      until.elementLocated(By.className('ant-select-dropdown--single'))
    )
    const elementCourseUnSelected = await containerCourse.findElement(
      By.xpath('//li[@aria-selected="false"]')
    )
    if ((await elementCourseUnSelected.getText()) === course) {
      await elementCourseUnSelected.click()
    } else {
      await containerCourse
        .findElement(By.xpath('//li[@aria-selected="true"]'))
        .click()
    }

    // Fire date input and set value
    await webDriver
      .wait(until.elementLocated(By.className('ant-calendar-picker-input')))
      .click()
    await webDriver
      .findElement(By.xpath(`//td[@title="${moment(date).format('LL')}"]`))
      .click()

    // Fire session input and set value
    const containerSession = await webDriver.wait(
      until.elementLocated(By.id('timeArr'))
    )
    await containerSession
      .findElement(By.xpath(`//input[@value="${session}"]`))
      .click()

    // Fire player input and set value
    const containerPlayer = await webDriver.wait(
      until.elementLocated(By.id('Pax'))
    )
    await containerPlayer
      .findElement(By.xpath(`//input[@value="${player}"]`))
      .click()

    // Fire hole input and set value
    const containerHole = await webDriver.wait(
      until.elementLocated(By.id('holeno'))
    )
    await containerHole
      .findElement(By.xpath(`//input[@value="${hole}"]`))
      .click()

    // Fire search button and set click
    const containerForm = await webDriver.wait(
      until.elementLocated(By.className('ant-form-horizontal'))
    )
    await containerForm
      .findElement(By.xpath('//button[@type="submit"]'))
      .click()
  }
})()
