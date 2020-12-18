import cors from 'cors'
import express from 'express'

export const load = (app) => {
  app.use(cors())

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))
}
