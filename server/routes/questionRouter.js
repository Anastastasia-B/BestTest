const Router = require('express')
const questionController = require('../controllers/questionController')
const router = new Router()

router.get('/:id', questionController.getOne)

module.exports = router
