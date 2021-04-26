const faker = require('faker')
const db = require('../database/connection')
const User = require('../models/User')
const { ExcessRequest } = require('../errors/index')
// const { DATEONLY } = require('sequelize/types')



module.exports = {
   async generate(req, res, next) {
        // let counter = 0
        const user = res.locals.user
        // console.log(user);
        const email = user.email
       
        const userDb = await User.findOne({ where: { email} })
        const dbCounter = userDb.counter
        const dbDate = userDb.date
        const date = new Date(dbDate)

        // const currentDate =`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` 

        // const compareDate = new Date(dbDate)
    
        // const compareDate = new Date(dbDate)
        console.log('las fechas');
        console.log(dbDate);
        console.log(date);

        // await userDb.increment('counter', { by: 1})
        
        if(dbCounter >= 10 ){
            res.send({msn: 'nomore'})
            // throw new ExcessRequest
        }


        // console.log(email2);
    
        // Check database for number of profiles create
        // mikeFromDatabase = db.findOne(where emailaddress== mike)
        // mikeFromdatabase.genCounter

        const newBirthday = () => {
            let date = faker.date.between('1945-01-01', '2003-12-31')
            return `${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()}`
        }

        const newDistinction = () => {
            let animal = faker.animal.type()
            let music = faker.music.genre()
            return `I love ${animal} and my favorite music is ${music}`
        }

        const fakeProfile = () => {
            const newFakeProfile = {
                'name': faker.name.findName(),
                'address': {
                    'city': faker.address.city(),
                    'street': faker.address.streetAddress(),
                    'zip': faker.address.zipCode(),
                    'country': faker.address.country()
                },
                'profession': faker.name.jobTitle(),
                'birthday': newBirthday(),
                'distinction': newDistinction(),
                'avatar': faker.image.avatar()
            }
            return newFakeProfile
        }
        const fakeUser = fakeProfile()

        
        // db.update(where emailADdress == mike, getCounter++)

        res.render("generate", { fakeUser })
    }
}

