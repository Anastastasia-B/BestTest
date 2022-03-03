const Router = require('express')
const router = new Router()
const userConstroller = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userConstroller.registration)
router.post('/login', userConstroller.login)
router.post('/avatar', authMiddleware, userConstroller.uploadAvatar)
router.post('/edit_profile', authMiddleware, userConstroller.editProfile)

router.get('/auth', authMiddleware, userConstroller.check)
router.get('/:id', authMiddleware, userConstroller.getOne)

router.delete('/avatar', authMiddleware, userConstroller.deleteAvatar)

module.exports = router
