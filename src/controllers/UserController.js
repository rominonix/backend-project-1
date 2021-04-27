const User = require('../models/User')
const { InvalidBody } = require('../errors/index')
const bcrypt = require('bcryptjs')

module.exports = {
    
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
        res.render('me', { "email": email, "name": name })
    },

    async updatePassword(req, res, next) {
        const email = res.user.email
        try {
            const { newPassword } = req.body
            if (!email || !newPassword) {
                throw new InvalidBody()
            } else {
                const newPassHash = bcrypt.hashSync(newPassword, 10)
                const newPass = await User.findOne({ where: { email } })
                newPass.password = newPassHash
                await newPass.save()
                res.send({ msn: "Password updated successfully!" })
            }
        } catch (error) { next(error) }
    }
}