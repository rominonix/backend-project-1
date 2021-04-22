const express = require('express')
const bcrypt = require('bcryptjs')
const Routes = express.Router()
const User = require('../models/User')

Routes.get('/', (req, res) => {
    // console.log("I recived request")
    res.render('index')
})


Routes.post('/login', async (req, res)=> {

    // kanske next om man lyckas autentizerad
    // flytta den här logik till usercontroller(kanske)

    const email = req.body.email
    const password = req.body.password
    console.log(email);
    console.log(password);

    const getUser = await User.findOne({ where: {email : email}})
    console.log(getUser.email);
    console.log(getUser.password);
// empezar la logica con jwt generar un jwt este hay que gusrdarlo en sesion o local storage y enviar a /me

    // console.log(newUser);

    // const user = User.getByEmail(email)
    // if(!user){}
    // const passwordMatch = bcrypt.compareSync(password, user.password)
    // if(passwordMatch){
    //     // ge jwt
    // }

    // res.send("IM LOGIN")
    res.render('login')
})

//  Routes.post('/login', async (res, req) =>{
//     // const payload = {
//     //     email:"",
//     //     password:""
//     // }

//     // res.json()
//     // const { email, password } = req.body
//     // const user = User.getByEmail(email)
//     // if(!user){}
//     // const passwordMatch = bcrypt.compareSync(password, user.password)
//     // if(passwordMatch){
//     //     // ge jwt
//     // }
//  })

//  router.get('/me', (res, req)=>{
//     console.log("Are you ready bitch?");
//  })

//  router.patch('/me', (res, req)=>{
//     console.log("Are you ready bitch?");
//  })

//  router.get('/generate', (res, req)=>{
//     console.log("Are you ready bitch?");
//  })



 module.exports = Routes