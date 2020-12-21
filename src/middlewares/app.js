const cors = require('cors')
const express = require('express')

const load = (app) => {
  app.use(cors())

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))
}

module.exports = load
