const mongoose = require('mongoose')

const CountSchema = new mongoose.Schema({
  count: {
    type    : Number,
    required: true
  },
  created_at: {
    type    : String,
    required: true
  }
})

const Count = mongoose.model('count', CountSchema)
module.exports = Count
