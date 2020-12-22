const express = require('express')
const path = require('path')
const config = require('config')
const loadAppMiddlewares = require('./src/middlewares/app')

const app = express()
const port = process.env.PORT || config.get('app.port')

loadAppMiddlewares(app)

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => res.send('API running'))
} else {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.use('/api/v1/tickets', require('./src/routes/api/v1/tickets'))

app.listen(port, () => console.log(`Listening on port ${port}`))
