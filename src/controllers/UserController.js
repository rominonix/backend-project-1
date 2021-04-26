const User = require('../models/User')
const { InvalidBody } = require('../errors/index')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) { throw new InvalidBody() }
            const token = await User.authenticate(email, password)
            res.json({ token, email })
            console.log("User authenticated!");
        } catch (error) { next(error) }
    },

    async me(req, res, next) {
        const userFromToken = res.locals.user
        const email = userFromToken.email

        const userFromDatabase = await User.findOne({ where: { email } })
        const createdAt = userFromDatabase.createdAt


        const userAsJson = userFromDatabase.toJSON()
        console.log(userAsJson.password)
        res.locals.me = userAsJson
        res.render('me', { "email": email, "created": createdAt })
        // const {email, password} = req.user
        // res.json({email, password})
        // next()
        // res.render("me")
        // res.json({"password": userAsJson.email})

    },
}