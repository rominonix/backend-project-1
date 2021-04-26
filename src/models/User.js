const { DataTypes } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const db = require('../database/connection')
const { InvalidCredentials, InvalidBody } = require('../errors')

const User = db.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    counter: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

// sequelize.sync().then(()=>{
//     console.log("Setting up new table")
// }).catch((err)=>{
//     console.log("Looks like we got some error")
//     console.log(err)
// })


User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } })
    if (!user) { throw new InvalidCredentials() }

    const passwordMatch = bcryptjs.compareSync(password, user.password)
    if (passwordMatch) {
        const payload = { id: user.id, email: user.email }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' })
    } else {
        throw new InvalidCredentials()
    }
}

User.validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return false
        } else if (error instanceof jwt.JsonWebTokenError) {
            return false
        } else {
            return false
            // throw error
            // return false
        }
    }
}

module.exports = User
