const Router = require('express')
const router = new Router()
const userConstroller = require('../controllers/userController')

router.post('/registration', userConstroller.registration)
router.post('/login', userConstroller.login)
router.get('/auth', userConstroller.check)

module.exports = router
