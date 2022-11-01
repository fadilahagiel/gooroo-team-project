const TransactionRouter  = require('./transactionRouter')
const TeacherRouter = require('./teacherRouter')
const router = require('express').Router()

router.use('/transactions', TransactionRouter)
router.use('/teachers', TeacherRouter)

module.exports = router