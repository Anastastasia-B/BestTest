const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', testController.create)
router.get('/index/:sortMethod', testController.getAll)
router.get('/:id&:userId', testController.getOne)
router.post('/finish/:id', authMiddleware, testController.finish)

module.exports = router
