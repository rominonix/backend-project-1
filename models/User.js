const { DataTypes } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const db = require('../database/connection')
const { InvalidCredentials, TokenExpired, Unauthorized } = require('../errors/index')

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
    },

    role: {
        type: DataTypes.STRING,
        enum: ['user', 'admin'],
        defaultValue: 'user'
    }
})

User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } })
    if (!user) { throw new InvalidCredentials() }

    const passwordMatch = bcryptjs.compareSync(password, user.password)
    if (passwordMatch) {
        const payload = { id: user.id, email: user.email, role: user.role }
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
            throw new TokenExpired()
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Unauthorized()
        } else {
            throw error
        }
    }
}

User.updatePassword = async (email, newPassword) => {
    const user = await User.findOne({ where: { email } })
    if (!user) { throw new InvalidCredentials() }
    else {
        const newPassHash = bcryptjs.hashSync(newPassword, 10)
        const newPass = await User.findOne({ where: { email } })
        newPass.password = newPassHash
        await newPass.save()
    }
}



module.exports = User
