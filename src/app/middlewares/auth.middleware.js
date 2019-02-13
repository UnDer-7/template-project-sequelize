const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status('401').json({ error: 'Token not found' })

  const [, token] = authHeader.split(' ')
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    console.log('deco: ', decoded)
    return next()
  } catch (e) {
    return res.status('400').json({ error: e })
  }
}
