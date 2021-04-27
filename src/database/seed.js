const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: `../../.env` })

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './users.sqlite'
})

const User = sequelize.define('Users',{
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

sequelize.sync().then(()=>{
    console.log("Setting up new table")
}).catch((err)=>{
    console.log("Looks like we got some error")
    console.log(err)
})


const steve = process.env.STEVE
const pass1 = bcrypt.hashSync(steve,10)

const johnsson = process.env.JOHNSSON
const pass2 = bcrypt.hashSync(johnsson,10)

const mike = process.env.MIKE
const pass3 = bcrypt.hashSync(mike,10)


User.bulkCreate([
    { name: 'Steve Stabbing', email: 'stabbing.steve@fuskeluring.hack', password: pass1, counter: 0, date: Date.now()},
    { name: 'Crimes Johnsson', email: 'crimes.johnsson@fuskeluring.hack', password: pass2, counter: 0, date: Date.now()},
    { name: 'Mike Murdering', email: 'murdering.mike@fuskeluring.hack', password: pass3, counter: 0, date: Date.now()},
  ]).then(() => { 
    return User.findAll();
  }).then(users => {
    console.log(users) 
  }).catch(error=>{
      console.log(error)
  })


// async function run( email, password){
//     const user = await User.build(
//         { 
//             email: email,
//             password: password
//         }
//     )
//     await user.save().catch((err)=>{
//         console.log('User maybe already exist')
//     })
// }

// bcrypt.hash(process.env.STEVE, 10, function(err, hash){
//     run('stabbing.steve@fuskeluring.hack',hash)
// })

// bcrypt.hash(process.env.JOHNSSON, 10, function(err, hash){
//     run('crimes.johnsson@fuskeluring.hack',hash)
// })

// bcrypt.hash(process.env.MIKE, 10, function(err, hash){
//     run('murdering.mike@fuskeluring.hack',hash)
// })
