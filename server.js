const express = require('express')
const path = require('path')
const config = require('config')
const loadAppMiddlewares = require('./src/middlewares/app')
const connectDB = require('./config/db')

const app = express()
const port = process.env.PORT || config.get('app.port')

loadAppMiddlewares(app)

connectDB()

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => res.send('API running'))
} else {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.use('/api/v1/tickets', require('./src/routes/api/v1/tickets'))
app.use('/api/v1/receipts', require('./src/routes/api/v1/receipts'))

app.listen(port, () => console.log(`Listening on port ${port}`))
