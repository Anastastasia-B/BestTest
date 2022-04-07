const Router = require('express')
const router = new Router()
const confirmController = require('../controllers/confirmController')

router.get('/:guid', confirmController.confirm)

module.exports = router
