const {Question, AnswerOption, TestResult} = require('../models/models')

class QuestionController {
    async getOne(req, res) {
        const {id} = req.params
        const question = await Question.findOne(
            {
                where: {id},
                include: [
                    {
                        model: AnswerOption,
                        as: 'answerOptions',
                        include: [{
                            model: TestResult,
                            through: { score: [] }
                        }]
                    },
                ],
            }
        )
        res.json(question)
    }
}

module.exports = new QuestionController()
