const config = require('config')
const DriverHelper = require('./driver')

module.exports = new (class AuthHelper {
  /**
   * Login for booking
   * @param {Object} webDriver
   * @param {username: string, password: string} account
   */
  async login({ webDriver, account }) {
    const { username, password } = account
    const { url: urlWebsite } = config.get('app')

    await DriverHelper.connectWebsite({ webDriver, urlWebsite })

    const listField = [
      { name: 'username', value: username },
      { name: 'Password', value: password }
    ]

    for (const inputField of listField) {
      await DriverHelper.fillInElementById({
        webDriver,
        inputField
      })
    }

    await DriverHelper.clickElementByClassname({
      webDriver,
      name: 'antd-pro-login-submit'
    })
  }
})()
