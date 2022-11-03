const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");
const TransactionRouter  = require('./transactionRouter')
const TeacherRouter = require('./teacherRouter')
const userRouter = require("./userRouter");
const classRouter = require("./classRouter");

router.use("/users", userRouter);
router.use("/wishlist", wishlistRouter)
router.use('/transactions', TransactionRouter)
router.use('/teachers', TeacherRouter)
router.use('/class', classRouter)

module.exports = router

