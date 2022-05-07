const {Question, AnswerOption} = require('../models/models')

class QuestionController {
    async getOne(req, res) {
        const {id} = req.params
        const question = await Question.findOne(
            {
                where: {id},
                include: [
                    {model: AnswerOption, as: 'answerOptions'},
                ],
            }
        )
        res.json(question)
    }
}

module.exports = new QuestionController()
