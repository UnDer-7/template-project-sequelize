'use strict'
const { User } = require('../models')

class UserController {
  async createUser (req, res) {
    try {
      const user = await User.create(req.body)
      return res.status(201).json(user)
    } catch (e) {
      return res.status(400).json({ error: e })
    }
  }

  async updateUser (req, res) {
    try {
      const [numberOfAffectedRows, [updatedUser]] = await User.update(req.body,
        {
          returning: true,
          individualHooks: true,
          where: { id: req.params.id }
        })
      res.status(updatedUser ? '200' : '404').json(updatedUser)
    } catch (e) {
      res.status('400').json({ error: e })
    }
  }

  async getAllUser (req, res) {
    const { offset, limit } = paginate(req.query.page, req.query.pageSize)

    try {
      const users = await User.findAll({
        offset: offset,
        limit: limit
      })
      return res.status('200').json(users)
    } catch (e) {
      return res.status('400').json({ error: e })
    }
  }

  async getUser (req, res) {
    // const templateentityRes = await TemplateEntityModel.findById(req.params.id)
    // return res.json(templateentityRes)
  }

  async deleteUser (req, res) {
    // await TemplateEntityModel.findByIdAndDelete(req.params.id)
    // return res.send()
  }
}
module.exports = new UserController()

const paginate = (page, pageSize) => {
  const offset = page * pageSize
  const limit = offset + pageSize

  return { offset: offset, limit: limit }
}
