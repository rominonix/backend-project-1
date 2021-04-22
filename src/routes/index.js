const express = require('express')
const UserController = require('../controllers/UserController')
const Routes = express.Router()

Routes.get('/', (req, res) => {
    res.render('index')
})

Routes.post('/login', UserController.login)

Routes.get('/me', (req, res)=>{
    res.render('me')
})

Routes.patch('/me', (res, req)=>{
    res.json({msg:"Update me"})
})

Routes.get('/generate', (res, req)=>{
    res.json({msg:"generate new fake account"})
})

 module.exports = Routes