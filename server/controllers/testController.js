const {Test} = require('../models/models')

class TestConstroller {
    async create(req, res) {

    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        const {id} = req.query
        const test = await Test.findOne({where: {id}})
        res.json(test)
    }
}

module.exports = new TestConstroller()
