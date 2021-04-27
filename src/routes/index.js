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

Routes.patch('/me', Auth.user, userController.updatePassword)

Routes.get('/generate', Auth.user, generateControl.generate)

module.exports = Routes