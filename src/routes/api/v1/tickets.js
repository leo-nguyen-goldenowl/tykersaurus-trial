const express = require('express')
const { check } = require('express-validator')

const { TicketController } = require('../../../controllers')

const router = express.Router()

// @route   POST api/tickets/default/book
// @desc    Booking with defautl account
// @access  Public
router.post(
  '/default/book',
  [
    check('date')
      .matches(/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/)
      .withMessage('Invalid date'),
    check('course')
      .matches(/\b(?:Masters Course|Classic Course)\b/)
      .withMessage('Invalid course'),
    check('session')
      .matches(/\b(?:07:00,11:59|12:00,18:00)\b/)
      .withMessage('Invalid session'),
    check('player').isInt({ min: 2, max: 4 }).withMessage('Invalid player'),
    check('hole')
      .isInt()
      .matches(/\b(?:9|18)\b/),
    check('teeTimeRange.from')
      .matches(/^([2][0-3]|[01]?[0-9])([.:][0-5][0-9])?$/)
      .withMessage('Invalid tee time range (from)'),
    check('teeTimeRange.to')
      .matches(/^([2][0-3]|[01]?[0-9])([.:][0-5][0-9])?$/)
      .withMessage('Invalid tee time range (to)')
  ],
  async (req, res) => {
    return TicketController.bookingWithDefaultAccount(req, res)
  }
)

module.exports = router
