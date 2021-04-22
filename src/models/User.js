const {DataTypes} = require('sequelize')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const db = require('../database/connection')

const User = db.define('Users',{
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    } 
})

User.authenticate = async ( email, password ) => {
    const getUser = await User.findOne({ where: {email}})
    if(!getUser){ 
        console.log("User not found")
    }
    const passwordMatch = bcryptjs.compareSync(password, getUser.password)
    if(passwordMatch){
        const payload = {id:getUser.id, email: getUser.email}
        return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'1w'})
    } else {
        //error
    }
}

module.exports = User
