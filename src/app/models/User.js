'use strict'

const bcrypt = require('bcryptjs')
const sequelizePaginate = require('sequelize-paginate')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        min: 5
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        min: 5
      }
    },
    password_hash: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
          user.password = null
        }
      },
      beforeUpdate: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
          user.password = null
        }
      }
    }
  })
  User.associate = function (models) {
    // associations can be defined here
  }

  User.prototype.createToke = function ({ id }) {
    return jwt.sign({ data: id }, process.env.APP_SECRET, { expiresIn: '1h' })
  }

  User.prototype.checkPassword = function (password, password_hash) {
    return bcrypt.compare(password, password_hash)
  }
  sequelizePaginate.paginate(User)
  return User
}
