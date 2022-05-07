const {TestResult, Test} = require('../models/models')

class TestResultController {
    async getOne(req, res) {
        const {id} = req.params
        const question = await TestResult.findOne(
            {
                where: {id},
                include: [
                    {model: Test, as: 'test'},
                ],
            }
        )
        res.json(question)
    }
}

module.exports = new TestResultController()
