const {Test, User, Question, TestResult} = require('../models/models')

class TestConstroller {
    async create(req, res) {

    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        const {id} = req.params
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
        res.json(test)
    }
}

module.exports = new TestConstroller()
