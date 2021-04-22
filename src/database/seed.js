const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: `../../.env` })

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './users.sqlite'
})

const User = sequelize.define('Users',{
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
    { email: 'stabbing.steve@fuskeluring.hack', password: pass1 },
    { email: 'crimes.johnsson@fuskeluring.hack', password: pass2 },
    { email: 'murdering.mike@fuskeluring.hack', password: pass3 },
  ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
    return User.findAll();
  }).then(users => {
    console.log(users) // ... in order to get the array of user objects
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
