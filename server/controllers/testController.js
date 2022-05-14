const Uuid = require('uuid')
const fs = require('fs')

const ApiError = require('../error/ApiError')
const {Test, User, Question, TestResult, UserTestResult} = require('../models/models')

class TestConstroller {
    async create(req, res) {
        try {
            const testData = JSON.parse(req.body.test)

            if (!fs.existsSync(process.env.STATIC_PATH)){
                fs.mkdirSync(process.env.STATIC_PATH)
            }

            const {frontPicture} = req.files
            var frontPictureUrl = null

            if (frontPicture) {
                frontPictureUrl = Uuid.v4() + '.jpg'
                frontPicture.mv(process.env.STATIC_PATH + "/" + frontPictureUrl)
            }

            const test = await Test.create({
                userId: req.user.id,
                title: testData.title,
                description: testData.description,
                frontPictureUrl,
                type: 'A',
            })

            testData.questions.forEach(async(questionData, i) => {
                const questionImage = req.files[`questionImage${i}`]
                var qPictureUrl = null

                if (questionImage) {
                    qPictureUrl = Uuid.v4() + '.jpg'
                    questionImage.mv(process.env.STATIC_PATH + "/" + qPictureUrl)
                }

                const question = await test.createQuestion({body: questionData.body, score: questionData.score, pictureUrl: qPictureUrl})

                questionData.answers.forEach(async(answerData) => {
                    if (!answerData) return

                    await question.createAnswerOption(answerData)
                })
            })

            testData.results.forEach(async(resultData, i) => {
                var rPictureUrl = null
                const resultImage = req.files[`resultImage${i}`]

                if (resultImage) {
                    rPictureUrl = Uuid.v4() + '.jpg'
                    resultImage.mv(process.env.STATIC_PATH + "/" + rPictureUrl)
                }

                await test.createTestResult({...resultData, pictureUrl: rPictureUrl})
            })

            return res.json(test)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e.message})
        }
    }

    async getAll(req, res) {
        const sortBy = (sortMethod) => {
            switch (sortMethod) {
                case 'DATE':
                    return ['createdAt', 'DESC']
                case 'POPULARITY':
                    return ['usersPassedCount', 'DESC']
                case 'RATING':
                    return ['averageRating', 'DESC']
                default:
                    return ['id', 'DESC']
            }
        }

        const tests = await Test.findAll({
            order: [sortBy(req.params.sortMethod)]
        })

        res.json(tests)
    }

    async getOne(req, res) {
        const {id, userId} = req.params
        const test = await Test.findOne(
            {
                where: {id},
                include: [
                    {model: User, as: 'user'},
                    {model: Question, as: 'questions'},
                    {model: TestResult, as: 'testResults'}
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
