const {Sequelize} = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/database/users.sqlite'
})

module.exports = db