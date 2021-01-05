const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({
  booking_golfres_id: {
    type: String
    // require: true
  },
  flag_read: {
    type   : Boolean,
    requrie: true
  },
  status: {
    type   : Boolean,
    require: true
  },
  session: {
    type   : String,
    require: true
  },
  hole: {
    type   : Number,
    require: true
  },
  player: {
    type   : Number,
    require: true
  },
  course: {
    type   : String,
    require: true
  },
  date: {
    type   : String,
    require: true
  },
  teeTime: {
    type   : String,
    require: true
  },
  created_at: {
    type   : String,
    require: true
  }
})

const Receipt = mongoose.model('receipt', ReceiptSchema)
module.exports = Receipt
