const { until, By } = require('selenium-webdriver')
const { driver } = require('../constants')
const { DriverHelper, generateResponse } = require('../helpers')
const { loginWithDefaultAccount } = require('./auth')

module.exports = new (class TicketController {
  /**
   * Booking with default account
   * @param {Object} req
   * @param {Object} res
   */
  async bookingWithDefaultAccount(req, res) {
    const webDriver = await DriverHelper.openBrowser({
      type: driver.browser.CHROME
    })
    try {
      await loginWithDefaultAccount(webDriver)
      const elementCalendar = await webDriver.wait(
        until.elementLocated(By.className('ant-calendar-picker-input'))
      )
      // .click()
      // await webDriver
      //   .findElement(By.xpath("//td[@title='December 25, 2020']"))
      //   .click()
      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : 'Login Successfully!!!',
        result       : {
          elementCalendar
        }
      })
      return res.json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Server error...' })
    }
  }
})()
