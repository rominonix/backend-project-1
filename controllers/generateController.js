const faker = require('faker')

module.exports = {
    async generate(req, res, next) {
        const newBirthday = () => {
            let date = faker.date.between('1945-01-01', '2003-12-31')
            return `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDay() + 1}`
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
        res.json(fakeProfile())
    }
}

