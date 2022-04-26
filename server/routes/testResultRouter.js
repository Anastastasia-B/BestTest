const Router = require('express')
const testResultController = require('../controllers/testResultController')
const router = new Router()

router.get('/:id', testResultController.getOne)

module.exports = router
