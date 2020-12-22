const config = require('config')
const { AuthHelper } = require('../helpers')

module.exports = new (class AuthController {
  /**
   * Login with default account
   * @param {Object} webDriver
   */
  async loginWithDefaultAccount(webDriver) {
    const { defaultAccount } = config.get('app')

    return AuthHelper.login({ webDriver, account: defaultAccount })
  }
})()
