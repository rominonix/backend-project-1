const User = require('../models/User')
const {Unauthorized} = require('../errors/index')

module.exports = {
  user: (req, res, next) => {
    const {authorization} = req.headers 
    const token = authorization.replace('Bearer ', '')
    const user = User.validateToken(token)
    if (!user){ throw new Unauthorized()}
    else {
      res.locals.user = user
      next()
        // res.send("YOU FAIELD THE AUTHEICATION")
    }
    // console.log(user.email)
    // console.log(user)
    // res.json(user)

  }
}