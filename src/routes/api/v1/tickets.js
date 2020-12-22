const express = require('express')

const { TicketController } = require('../../../controllers')

const router = express.Router()

// @route   POST api/tickets/default/book
// @desc    Booking with defautl account
// @access  Public
router.post('/default/book', async (req, res) => {
  return TicketController.bookingWithDefaultAccount(req, res)
})

module.exports = router
