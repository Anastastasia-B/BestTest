const {TestResult, Test, UserTestResult, Rate} = require('../models/models')
const ApiError = require('../error/ApiError')

class TestResultController {
    async getOne(req, res, next) {
        const {id} = req.params
        const userId = req.user.id

        const testResult = await TestResult.findOne(
            {
                where: {id},
                include: [
                    {model: Test, as: 'test'}
                ],
            }
        )

        const allowedToGet = await UserTestResult.findOne({where: {
            userId: userId,
            testResultId: testResult.id
        }})

        if (!allowedToGet) {
            return next(ApiError.forbidden())
        }

        const rate = await Rate.findOne({where: {userId, testId: testResult.test.id}})
        testResult.dataValues.test.dataValues.rate = rate?.value

        res.json(testResult)
    }
}

module.exports = new TestResultController()
