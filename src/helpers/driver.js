const { Builder, By } = require('selenium-webdriver')
const { driver: DriverConstant } = require('../constants')

module.exports = new (class DriverHelper {
  /**
   * Open browser (Chrome, Firefox)
   * @param {string} type - default to Chrome Browser, options chrome/firefox
   */
  async openBrowser({ type = DriverConstant.browser.CHROME }) {
    const webDriver = await new Builder().forBrowser(type).build()
    // await webDriver.manage().window().setRect({ x: -100000, y: 100000 })

    return webDriver
  }

  /**
   * Access website
   * @param {Object} webDriver
   * @param {string} urlWebsite
   */
  async connectWebsite({ webDriver, urlWebsite }) {
    await webDriver.get(urlWebsite)
  }

  /**
   * Fill in a input which was find by Id
   * @param {Object} webDriver
   * @param {{ name: string, value: string}} inputField
   */
  async fillInInputById({ webDriver, inputField }) {
    const { name, value } = inputField
    await webDriver.findElement(By.id(name)).sendKeys(value)
  }

  /**
   * Click a element which was find by Classname
   * @param {Object} webDriver
   * @param {string} urlWebsite
   */
  async clickInputByClassname({ webDriver, name }) {
    await webDriver.findElement(By.className(name)).click()
  }
})()
