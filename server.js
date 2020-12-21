const express = require('express')
const path = require('path')
const loadAppMiddlewares = require('./src/middlewares/app')

const app = express()
const port = process.env.PORT || 5000

loadAppMiddlewares(app)

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
