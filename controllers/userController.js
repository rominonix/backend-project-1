const User = require('../models/User')
const { InvalidBody } = require('../errors/index')

module.exports = {

    async all(req,res,next){
        try{
          const users = await User.findAll({attributes:{exclude:['password']}})
          res.json({users})
        }catch(error){ next(error) }
      },
    
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) { throw new InvalidBody() }
            const token = await User.authenticate(email, password)
            res.json({ token, email })
        } catch (error) { next(error) }
    },

    async me(req, res, next) {
        const email = res.user.email
        const userFromDatabase = await User.findOne({ where: { email } })
        const name = userFromDatabase.name  
        res.json({ "email": email, "name": name })
    },

    async updateUserPassword(req, res, next) {
        const email = res.user.email
        try {
            const { newPassword } = req.body
            if (!email || !newPassword) {
                throw new InvalidBody()
            }
            const newPassToDb = await User.updatePassword(email, newPassword)
            res.json({ newPassToDb, msn: "Your profile was updated successfully" })
        } catch (error) { next(error) }
    },
}