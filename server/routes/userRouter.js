const Router = require('express')
const router = new Router()
const userConstroller = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userConstroller.registration)
router.post('/login', userConstroller.login)
router.get('/auth', authMiddleware, userConstroller.check)
router.get('/:id', userConstroller.getOne)

module.exports = router
