const {DataTypes} = require('sequelize')
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

module.exports = User
