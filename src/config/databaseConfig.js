'use strict'

module.exports = {
  development: {
    username: 'docker',
    password: 'docker',
    database: 'templateDB',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    dialect: '',
    operatorsAliases: false,
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    dialect: '',
    operatorsAliases: false,
  }
}
