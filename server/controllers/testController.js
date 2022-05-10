const ApiError = require('../error/ApiError')
const {Test, User, Question, TestResult, UserTestResult} = require('../models/models')

class TestConstroller {
    async create(req, res) {

    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        const {id, userId} = req.params
        const test = await Test.findOne(
            {
                where: {id},
                include: [
                    {model: User, as: 'user'},
                    {model: Question, as: 'questions'},
                    {model: TestResult, as: 'testResults'},
                    {model: User, as: 'usersPassed'}
                ],
            }
        )

        if (userId && userId > 0) {
            const userTestResult = await UserTestResult.findOne({
                where: {userId, testId: id},
                include: [
                    {model: TestResult}
                ],
            })

            test.dataValues.userResult = userTestResult?.testResult
        }

        res.json(test)
    }

    async finish(req, res, next) {
        const {userId, testResultId} = req.body

        if (req.user.id != userId) return next(ApiError.forbidden())

        const {id} = req.params
        const test = await Test.findOne({where: {id}})
        const user = await User.findOne({where: {id: req.user.id}})
        const testResult = (await test.getTestResults({where: {id: testResultId}}))[0]

        if (!test || !user || !testResult)
            return next(ApiError.internal('backendErrors.finishTestError'))

        const prevResult = await UserTestResult.findOne({where: {
            testId: test.id,
            userId: user.id,
        }})

        if (prevResult)
            await prevResult.destroy()

        const userTestResult = await UserTestResult.create({
            testId: test.id,
            userId: user.id,
            testResultId: testResult.id
        })

        res.json(userTestResult)
    }
}

module.exports = new TestConstroller()
