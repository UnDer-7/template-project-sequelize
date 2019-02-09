'use strict'

require('dotenv').config()

const express = require('express')
const validate = require('express-validation')
const morgan = require('morgan')
const Youch = require('youch')

class App {
  constructor () {
    this.express = express()

    this.middleware()
    this.routes()
    this.exception()
  }

  middleware () {
    this.express.disable('x-powered-by')
    this.express.use(express.json())
    this.express.use(morgan('dev'))
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)
        return res.json(await youch.toJSON())
      }

      return res.status(err.status || 500).json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
