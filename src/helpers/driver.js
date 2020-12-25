const { Builder, By } = require('selenium-webdriver')
const { driver: DriverConstant } = require('../constants')
const chrome = require('selenium-webdriver/chrome')
module.exports = new (class DriverHelper {
  /**
   * Open browser (Chrome, Firefox)
   * @param {string} type - default to Chrome Browser, options chrome/firefox
   */
  async openBrowser({ type = DriverConstant.browser.CHROME }) {
    let options, serviceBuilder
    let webDriver

    if (type === DriverConstant.browser.CHROME) {
      options = new chrome.Options()
      options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH)
      serviceBuilder = new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH)

      if (process.env.NODE_ENV === 'production') {
        options.addArguments('--headless')
        options.addArguments('--disable-gpu')
        options.addArguments('--no-sandbox')
      }

      webDriver = await new Builder()
        .forBrowser(type)
        .setChromeOptions(options)
        .setChromeService(serviceBuilder)
        .build()
    }

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
