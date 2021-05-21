const User = require('../models/User')
const bcrypt = require('bcryptjs')
require('dotenv').config()



const steve = process.env.STEVE
const pass1 = bcrypt.hashSync(steve, 10)

const johnsson = process.env.JOHNSSON
const pass2 = bcrypt.hashSync(johnsson, 10)

const mike = process.env.MIKE
const pass3 = bcrypt.hashSync(mike, 10)


User.bulkCreate([
  { name: 'Steve Stabbing', email: 'stabbing.steve@fuskeluring.hack', password: pass1, counter: 0, date: Date.now(), role: 'admin' },
  { name: 'Crimes Johnsson', email: 'crimes.johnsson@fuskeluring.hack', password: pass2, counter: 0, date: Date.now() },
  { name: 'Mike Murdering', email: 'murdering.mike@fuskeluring.hack', password: pass3, counter: 0, date: Date.now() },
]).then(() => {
  return User.findAll();
}).catch(error => {
  console.log(error)
})

