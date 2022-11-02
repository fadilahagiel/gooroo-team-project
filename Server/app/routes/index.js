const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");
const TransactionRouter  = require('./transactionRouter')
const TeacherRouter = require('./teacherRouter')
const userRouter = require("./userRouter");

router.use("/users", userRouter);
router.use("/wishlist", wishlistRouter)
router.use('/transactions', TransactionRouter)
router.use('/teachers', TeacherRouter)

module.exports = router

