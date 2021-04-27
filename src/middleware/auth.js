const User = require('../models/User')
const { Unauthorized } = require('../errors/index')

module.exports = {
  
  user: (req, res, next) => {
 
    const { authorization } = req.headers
    if (!authorization) { throw new Unauthorized() }
    const token = authorization.replace('Bearer ', '')
    const user = User.validateToken(token)
      res.user = user
      next()
  }
}