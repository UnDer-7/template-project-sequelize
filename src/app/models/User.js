'use strict'

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false
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

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }
  return User
}
