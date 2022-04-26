const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const testRouter = require('./testRouter')
const questionRouter = require('./questionRouter')
const testResultRouter = require('./testResultRouter')

router.use('/user', userRouter)
router.use('/test', testRouter)
router.use('/question', questionRouter)
router.use('/test_result', testResultRouter)

module.exports = router
