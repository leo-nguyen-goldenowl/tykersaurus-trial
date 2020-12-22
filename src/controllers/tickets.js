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

      const response = generateResponse({
        success   : true,
        statusCode: 200,
        message   : 'Login Successfully!!!'
      })
      return res.json(response)
    } catch (error) {
      res.status(500).json({ msg: 'Server error...' })
    }
  }
})()
