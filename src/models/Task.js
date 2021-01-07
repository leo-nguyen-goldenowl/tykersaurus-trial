const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  checkBooking: {
    type    : Boolean,
    required: true
  },
  session: {
    type    : String,
    required: true
  },
  hole: {
    type    : Number,
    required: true
  },
  player: {
    type    : Number,
    required: true
  },
  course: {
    type    : String,
    required: true
  },
  date: {
    type    : String,
    required: true
  },
  teeTimeRange: {
    from: {
      type    : String,
      required: true
    },
    to: {
      type    : String,
      required: true
    }
  },
  created_at: {
    type    : String,
    required: true
  }
})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task
