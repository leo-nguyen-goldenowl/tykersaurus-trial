const event = require('events')
const { receipts } = require('../../constants')

const receiptEventEmitter = new event.EventEmitter()
const ReceiptListener = require('../listeners/receipt')

receiptEventEmitter.on(
  receipts.NEW_RECEIPT_CREATED,
  ReceiptListener.createReceiptInBackgroundJob
)

module.exports = {
  receiptEventEmitter
}
