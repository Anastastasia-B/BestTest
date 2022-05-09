const {TestResult, Test, UserTestResult} = require('../models/models')
const ApiError = require('../error/ApiError')

class TestResultController {
    async getOne(req, res, next) {
        const {id} = req.params
        const testResult = await TestResult.findOne(
            {
                where: {id},
                include: [
                    {model: Test, as: 'test'},
                ],
            }
        )

        const allowedToGet = await UserTestResult.findOne({where: {
            userId: req.user.id,
            testResultId: testResult.id
        }})

        if (!allowedToGet) {
            return next(ApiError.forbidden())
        }

        res.json(testResult)
    }
}

module.exports = new TestResultController()
