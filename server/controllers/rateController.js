const {Rate} = require('../models/models')

class TestConstroller {
    async updateOrCraete(req, res) {
        const {testId, value} = req.body

        const [rate, created] = await Rate.findOrCreate({
            where: {testId, userId: req.user.id},
            defaults: { value }
        })

        if (created) {
            return res.json(rate)
        }

        const updatedRate = await rate.update({value})
        res.json(updatedRate)
    }
}

module.exports = new TestConstroller()
