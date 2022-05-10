const Router = require('express')
const router = new Router()
const rateController = require('../controllers/rateController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/set', authMiddleware, rateController.updateOrCraete)

module.exports = router
