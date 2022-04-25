const {Test, User, Question} = require('../models/models')
const Sequelize = require('sequelize')

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
                ],
            }
        )
        res.json(test)
    }
}

module.exports = new TestConstroller()
