const Router = require('express')
const testResultController = require('../controllers/testResultController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', authMiddleware, testResultController.getOne)

module.exports = router
