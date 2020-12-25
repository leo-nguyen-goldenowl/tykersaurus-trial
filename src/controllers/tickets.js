const { By, until } = require('selenium-webdriver')
// const moment = require('moment')
const { validationResult } = require('express-validator')
const { driver } = require('../constants')
const { DriverHelper, generateResponse } = require('../helpers')
const { searchCourse } = require('../helpers/tickets')
const { loginWithDefaultAccount } = require('./auth')
const { tickets } = require('../constants')
module.exports = new (class TicketController {
  /**
   * Booking with default account
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async bookingWithDefaultAccount(req, res) {
    const { date, course, session, player, hole, teeTime } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(errors)
      }

      const dateISOString = new Date(date)
      const dayOfDate = dateISOString.getDay()
      const { listValidListCriteria } = tickets
      const optionListCriteria =
        dayOfDate > 0 && dayOfDate < 5
          ? 'head'
          : dayOfDate === 5
            ? 'middle'
            : 'tail'

      const checkListCritera =
        listValidListCriteria[optionListCriteria][session]
      const isValidPlayerAndHole =
        checkListCritera['player'][player] && checkListCritera['hole'][hole]

      /**
       * TODO: check valid date
       */
      // const today = moment().format('L')
      // const todaySevenAM = new Date(`${today} 07:00`)
      // const diffMinutes = moment().diff(moment(todaySevenAM), 'minutes') < 0

      if (!isValidPlayerAndHole) {
        return res.status(400).send({ errors: [{ msg: 'Invalid criteria' }] })
      }

      const webDriver = await DriverHelper.openBrowser({
        type: driver.browser.CHROME
      })

      await loginWithDefaultAccount(webDriver)

      await searchCourse({
        webDriver,
        listCriteria: {
          date: dateISOString,
          course,
          session,
          player,
          hole
        }
      })

      const containerTeeTime = await webDriver.wait(
        until.elementLocated(By.className('ant-table-tbody'))
      )

      await webDriver.manage().setTimeouts({ implicit: 20000 })
      const listTeeTime = await containerTeeTime.findElements(
        By.className('ant-table-row-level-0')
      )

      for (let teeTime of listTeeTime) {
        console.log(
          await (
            await teeTime.findElement(
              By.className('ant-table-row-cell-break-word')
            )
          ).getText()
        )
      }

      console.log('tee time', teeTime)

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : 'Search course successfully!!!'
      })
      return res.json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Server error...' })
    }
  }
})()
