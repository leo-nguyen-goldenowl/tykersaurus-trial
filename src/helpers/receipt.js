const Receipt = require('../models/Receipt')

module.exports = new (class ReceiptHelper {
  async createReceiptWithStatus({ ticket, status }) {
    const { date, session, course, player, hole, teeTime } = ticket
    const receipt = new Receipt({
      date,
      session,
      course,
      player,
      hole,
      teeTime,
      status
    })

    return receipt.save()
  }
})()
