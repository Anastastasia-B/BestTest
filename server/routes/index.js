const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const testRouter = require('./testRouter')

router.use('/user', userRouter)
router.use('/test', testRouter)

module.exports = router
