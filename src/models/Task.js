const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
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
    type   : String,
    require: true
  }
})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task
