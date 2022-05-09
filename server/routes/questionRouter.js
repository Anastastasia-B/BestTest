const Router = require('express')
const questionController = require('../controllers/questionController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', authMiddleware, questionController.getOne)

module.exports = router
