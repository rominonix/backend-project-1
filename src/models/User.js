const { DataTypes } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const db = require('../database/connection')
const { InvalidCredentials, InvalidBody } = require('../errors')

const User = db.define('Users', {
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
