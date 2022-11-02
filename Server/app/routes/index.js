const TransactionRouter  = require('./transactionRouter')
const TeacherRouter = require('./teacherRouter')
const router = require("express").Router();
const userRouter = require("./userRouter");

router.use("/users", userRouter);

router.use('/transactions', TransactionRouter)
router.use('/teachers', TeacherRouter)

module.exports = router