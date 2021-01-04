const Receipt = require('../models/Receipt')
const { generateResponse, ReceiptHelper } = require('../helpers')

module.exports = new (class ReceiptController {
  async getListReceipt(req, res) {
    try {
      const listReceipt = await Receipt.find({ status: true })

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : 'Got list receipt succefully!!!',
        result       : {
          listReceipt
        }
      })
      return res.json(response)
    } catch (error) {
      res.status(500).json({
        msg: 'Server error...'
      })
    }
  }
  async createReceipt(req, res) {
    try {
      const ticket = new Receipt({
        date        : '01/01/2021',
        course      : 'Masters Course',
        session     : '12:00,18:00',
        player      : 3,
        hole        : 18,
        teeTimeRange: '17:18'
      })

      const testRes = await ReceiptHelper.createReceiptWithStatus({
        ticket,
        status: true
      })

      const response = generateResponse({
        statusSuccess: true,
        statusCode   : 200,
        message      : 'Created receipt successfully!!!',
        result       : {
          testRes
        }
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
