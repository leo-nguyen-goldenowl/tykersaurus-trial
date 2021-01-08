const { validationResult } = require('express-validator')
const {
  receipts
} = require('../constants')
const {
  generateResponse
} = require('../helpers')

const { receiptEventEmitter } = require('../events/dispatchers/receipt')
const { time } = require('../utils')
const Task = require('../models/Task')

module.exports = new (class TicketController {
  /**
   * Booking with default account
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async bookingWithDefaultAccount(req, res) {
    const { date, course, session, player, hole, teeTimeRange } = req.body

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send(errors)
      }

      const ticket = {
        date,
        course,
        session,
        player,
        hole,
        teeTimeRange
      }

      const isAccessBooking = time.accessBooking(date)

      if (!isAccessBooking) {
        const task = new Task({
          date,
          course,
          session,
          player,
          hole,
          teeTimeRange,
          checkBooking: false,
          created_at  : new Date()
        })
        await task.save()
      } else {
        receiptEventEmitter.emit(receipts.NEW_RECEIPT_CREATED, ticket)
      }

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : "We're processing..."
      })
      return res.json(response)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        msg: 'Server error...'
      })
    }
  }
})()
