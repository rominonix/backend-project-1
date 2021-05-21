const faker = require('faker')
// const User = require('../models/User')

module.exports = {
    // async generate(req, res, next) {

        async generate(req, res, next) {

        const newBirthday = () => {
            let date = faker.date.between('1945-01-01', '2003-12-31')
            return `${date.getFullYear()} / ${date.getMonth()+1} / ${date.getDay()+1}`
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
                    'street': faker.address.streetAddress(),
                    'city': faker.address.city(),
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
        // return fakeProfile
        res.json(fakeProfile())

        // const email = res.user.email
        // const userDb = await User.findOne({ where: { email } })

        // const dbCounter = userDb.counter
        // await userDb.increment('counter', { by: 1 })

        // let day = 1000 * 60 * 60 * 24
        // const dbDate = userDb.date

        // let dbDateEpoch = dbDate.getTime()

        // const currentDate = new Date().getTime()
        // let oneMoreDay = dbDateEpoch + day

        // if (oneMoreDay > currentDate) {

        //     if (dbCounter <= 9) {
        //         const fakeUser = fakeProfile()
        //         userDb.date = Date.now()
        //         await userDb.save()
        //         res.render("generate", { fakeUser })
        //     } else {
        //         res.send({ msn: 'You have created the maximum number of daily accounts, try it in 24 hours' })
        //     }
        // }
        // else {
        //     userDb.counter = 0
        //     await userDb.save()
        //     const fakeUser = fakeProfile()
        //     userDb.date = Date.now()
        //     await userDb.increment('counter', { by: 1 })
        //     await userDb.save()
        //     res.render("generate", { fakeUser })
        // }
    }
}

