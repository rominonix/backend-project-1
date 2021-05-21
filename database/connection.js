const { Sequelize } = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/users.sqlite'
})

module.exports = db