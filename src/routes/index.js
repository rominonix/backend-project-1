const express = require('express')
const Routes = express.Router()
const userController = require('../controllers/userController')
const generateControl = require("../controllers/generateController")
const Auth = require('../middleware/auth')

Routes.get('/', (req, res) => {
    res.render('index')
})

Routes.post('/login', userController.login)

Routes.get('/me', Auth.user, userController.me)
// console.log(res.locals.me)
// res.render('me')
Routes.patch('/me', (res, req) => {
    res.json({ msg: "Update me" })
})

// Routes.get('/generate', Throttling, Controller.generate)
Routes.get('/generate', generateControl.generate)

module.exports = Routes