const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const testRouter = require('./testRouter')
const confirmRouter = require('./confirmRouter')

router.use('/confirm', confirmRouter)
router.use('/user', userRouter)
router.use('/test', testRouter)


module.exports = router
