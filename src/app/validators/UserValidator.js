'use strict'

const Joi = require('joi')

module.exports = {
  body: {
    login: Joi.string().required().min(5).max(50),
    password: Joi.string().required().min(5).max(50),
  }
}
