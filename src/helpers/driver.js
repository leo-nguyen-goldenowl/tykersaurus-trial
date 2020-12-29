const { Builder, By, until } = require('selenium-webdriver')
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

    webDriver.manage().setTimeouts({ script: 600000 })

    return webDriver
  }

  /**
   * Quit browser (Chrome, Firefox)
   */
  async quitBrowser({ webDriver }) {
    return webDriver.quit()
  }

  /**
   * Access website
   * @param {Object} webDriver
   * @param {string} urlWebsite
   */
  async connectWebsite({ webDriver, urlWebsite }) {
    return webDriver.get(urlWebsite)
  }

  /**
   * Find a element wait..until... by Classname
   * @param {Object} webDriver
   * @param {string} urlWebsite
   */
  async findElementWaitUntilByClassName({ webDriver, name }) {
    return webDriver.wait(until.elementLocated(By.className(name)))
  }

  /**
   * Find elements in container which was find by Classname(container), Classname(element)
   * @param {Object} webDriver
   * @param {container: string, element: string} name
   */
  async findElementsByClassNameInContainerByClassName({ webDriver, name }) {
    const { container: containerName, element: elementName } = name
    const container = await webDriver.findElement(By.className(containerName))

    return container.findElements(By.className(elementName))
  }

  /**
   * Find a element in container which was find by Classname(container), Classname(element)
   * @param {Object} webDriver
   * @param {container: string, element: string} name
   */
  async findElementByClassNameInContainerByClassName({ webDriver, name }) {
    const { container: containerName, element: elementName } = name
    const container = await webDriver.findElement(By.className(containerName))

    return container.findElement(By.className(elementName))
  }

  /**
   * Find a element in container which was find by Classname(container), Xpath(Element)
   * @param {Object} webDriver
   * @param {container: string, element: string} name
   */
  async findElementByXpathInContainerByClassName({ webDriver, name }) {
    const { container: containerName, element: elementName } = name

    const container = await webDriver.wait(
      until.elementLocated(By.className(containerName))
    )

    return container.findElement(By.xpath(`//${elementName}`))
  }

  /**
   * Find a element with wait...until... which was find by Xpath
   * @param {Object} webDriver
   * @param {container: string, element: string} name
   */
  async findElementByXpathInContainerById({ webDriver, name }) {
    const { container: containerName, element: elementName } = name

    const container = await webDriver.wait(
      until.elementLocated(By.id(containerName))
    )
    return container.findElement(By.xpath(`//${elementName}`))
  }

  /**
   * Click a element which was find by Classname
   * @param {Object} webDriver
   * @param {string} name
   */
  async clickElementByClassname({ webDriver, name }) {
    return webDriver.findElement(By.className(name)).click()
  }

  /**
   * Click a element with wait...until... which was find by Classname
   * @param {Object} webDriver
   * @param {string} name
   */
  async clickWaitUntilElementByClassname({ webDriver, name }) {
    return webDriver.wait(until.elementLocated(By.className(name))).click()
  }

  /**
   * Click a element with wait...until... which was find by Classname
   * @param {Object} webDriver
   * @param {string} name
   */
  async clickElementByXpath({ webDriver, name }) {
    return webDriver.findElement(By.xpath(`//${name}`)).click()
  }

  /**
   * Click a element with wait...until... which was find by Id
   * @param {Object} webDriver
   * @param {container: string, element: string} name
   */
  async clickElementByXpathInContainerById({ webDriver, name }) {
    const element = await this.findElementByXpathInContainerById({
      webDriver,
      name
    })
    return element.click()
  }

  /**
   * Click a element with wait...until... which was find by Xpath
   * @param {Object} webDriver
   * @param {container: string, element: string} name
   */
  async clickElementByXpathInContainerByClassName({ webDriver, name }) {
    const element = await this.findElementByXpathInContainerByClassName({
      webDriver,
      name
    })
    return element.click()
  }

  /**
   * Click a element which was find by Classname in container
   * @param {Object} webDriver
   * @param {string} name
   */
  async clickElementByClassnameInContainer({ container, name }) {
    return container.findElement(By.className(name)).click()
  }

  /**
   * Fill in a input which was find by Id
   * @param {Object} webDriver
   * @param {{ name: string, value: string}} inputField
   */
  async fillInElementById({ webDriver, inputField }) {
    const { name, value } = inputField
    return webDriver.findElement(By.id(name)).sendKeys(value)
  }
})()
