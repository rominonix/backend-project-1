const User = require('../models/User')

module.exports = {
    async login( req, res, next){
        try {
            const {email, password} = req.body
            const token = await User.authenticate( email, password )
            res.json({token, email})
            console.log("User authenticated!");
        } catch(error){next(error)}
    },

    me(req, res, next){
        const {email, password} = req.user
        res.json({email, password})
    }
}