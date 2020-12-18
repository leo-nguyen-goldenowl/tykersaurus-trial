import 'module-alias/register'
import path from 'path'
import express from 'express'

import { load as loadAppMiddlewares } from '@middlewares/app'

const app = express()

loadAppMiddlewares(app)

app.get('/', (req, res) => res.send('API running'))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
