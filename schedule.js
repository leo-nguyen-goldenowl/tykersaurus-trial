const express = require('express')

const loadAppMiddlewares = require('./src/middlewares/app')
const connectDB = require('./config/db')
const moment = require('moment')
const Task = require('./src/models/Task')
const Count = require('./src/models/Count')
const { time } = require('./src/utils')
const { receipts } = require('./src/constants')
const { receiptEventEmitter } = require('./src/events/dispatchers/receipt')

const app = express()

loadAppMiddlewares(app)

connectDB().then(async () => {
  const maxDate = time.getMaxDate()
  const listTask = await Task.find({
    date: { $eq: moment(maxDate).format('MM/DD/YYYY') }
  })

  const count = new Count({
    count     : listTask.length,
    created_at: new Date()
  })

  await count.save()

  for (const task of listTask) {
    receiptEventEmitter.emit(receipts.NEW_RECEIPT_CREATED, {
      ...task._doc,
      countId: count.id
    })
  }

  setInterval(async () => {
    const currentCount = await Count.findById(count.id)
    if (currentCount.count < 1) {
      clearInterval()
      process.exit()
    }
  }, 5000)
})
