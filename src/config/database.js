'use strict'

module.exports = {
  development: {
    username: 'docker',
    password: 'docker',
    database: 'templateDB',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    dialect: ''
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    dialect: ''
  }
}
