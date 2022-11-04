const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");
const TransactionRouter = require("./transactionRouter");
const TeacherRouter = require("./teacherRouter");
const userRouter = require("./userRouter");
const classRouter = require("./classRouter");
const StudentRouter = require("./studentRouter");
const authentication = require("../middlewares/authentication");
const scheduleRouter = require("./scheduleRouter");
const { AuthStudent, AuthTeacher } = require("../middlewares/authorization");

router.use("/users", userRouter);

router.use(authentication);

router.use("/wishlist", wishlistRouter);
router.use("/transactions", TransactionRouter);
router.use("/teachers", AuthTeacher, TeacherRouter);
router.use("/students", AuthStudent, StudentRouter);
router.use("/classes", classRouter);
router.use("/schedule", scheduleRouter);

module.exports = router;
