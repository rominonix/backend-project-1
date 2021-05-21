const User = require('../models/User')

module.exports = {

    async limitRequest(req, res, next){
    
        const email = res.user.email
        const userDb = await User.findOne({ where: { email } })
        
        const dbCounter = userDb.counter
        await userDb.increment('counter', { by: 1 })
        
        let day = 1000 * 60 * 60 * 24
        const dbDate = userDb.date
        
        let dbDateEpoch = dbDate.getTime()
        
        const currentDate = new Date().getTime()
        let oneMoreDay = dbDateEpoch + day
        
        if (oneMoreDay > currentDate) {
        
            if (dbCounter <= 9) {
                next()
                // const fakeUser = fakeProfile()
                // userDb.date = Date.now()
                // await userDb.save()
                // res.render("generate", { fakeUser })
            } else {
                res.json({ msn: 'You have created the maximum number of daily accounts, try it in 24 hours' })

                // res.send({ msn: 'You have created the maximum number of daily accounts, try it in 24 hours' })
            }
        }
        else {
            userDb.counter = 0
            await userDb.save()
            // const fakeUser = fakeProfile()
            userDb.date = Date.now()
            await userDb.increment('counter', { by: 1 })
            await userDb.save()
            next()
            // res.render("generate", { fakeUser })


        }
    }
    
}
