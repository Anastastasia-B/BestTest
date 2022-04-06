const Router = require('express')
const router = new Router()
const confirmController = require('../controllers/confirmController')

router.get('/:ff', confirmController.confirm)

module.exports = router
