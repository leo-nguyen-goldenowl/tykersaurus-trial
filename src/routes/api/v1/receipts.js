const express = require('express')

const { ReceiptController } = require('../../../controllers')

const router = express.Router()

// @route   GET api/receipts/
// @desc    Get list receipt
// @access  Public
router.get('/', async (req, res) => {
  return ReceiptController.getListReceipt(req, res)
})

// @route   POST api/receipts/
// @desc    Create list receipt
// @access  Public
router.post('/', async (req, res) => {
  return ReceiptController.createReceipt(req, res)
})

module.exports = router
