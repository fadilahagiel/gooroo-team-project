const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");
const TransactionRouter = require("./transactionRouter");
const TeacherRouter = require("./teacherRouter");
const userRouter = require("./userRouter");
const classRouter = require("./classRouter");
const StudentRouter = require("./studentRouter");
const authentication = require("../middlewares/authentication");

router.use("/users", userRouter);

router.use(authentication);

router.use("/wishlist", wishlistRouter);
router.use("/transactions", TransactionRouter);
router.use("/teachers", TeacherRouter);
router.use("/students", StudentRouter);
router.use("/classes", classRouter);

module.exports = router;
