'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/database.js')

const db = {}
const sequelize = new Sequelize(process.env.NODE_ENV === 'development' ? config.development : config.production)

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
