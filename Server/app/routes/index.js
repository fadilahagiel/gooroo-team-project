const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");
const TransactionRouter = require("./transactionRouter");
const TeacherRouter = require("./teacherRouter");
const userRouter = require("./userRouter");
const classRouter = require("./classRouter");
const authentication = require("../middlewares/authentication");

router.use("/users", userRouter);

//authentication
router.use(authentication);

router.use("/wishlist", wishlistRouter);
router.use("/transactions", TransactionRouter);
router.use("/teachers", TeacherRouter);
router.use("/class", classRouter);

module.exports = router;
