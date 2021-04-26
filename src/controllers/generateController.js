const faker = require('faker')
// const db = require('../database/connection')

module.exports = {
    generate(req, res, next) {

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

