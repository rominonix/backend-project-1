const express = require('express')
const Routes = express.Router()
const userController = require('../controllers/userController')
const generateControl = require('../controllers/generateController')
const Auth = require('../middleware/auth')
const Throttle = require('../middleware/throttle')


Routes.post('/login', userController.login)

Routes.get('/me', Auth.user, userController.me)

Routes.patch('/me', Auth.user, userController.updateUserPassword)

Routes.get('/generate', Auth.user, Throttle.limitRequest, generateControl.generate)

Routes.get('/users', Auth.admin, userController.all)

module.exports = Routes