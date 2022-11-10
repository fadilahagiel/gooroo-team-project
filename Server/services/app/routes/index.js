const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");
const TransactionRouter = require("./transactionRouter");
const TeacherRouter = require("./teacherRouter");
const userRouter = require("./userRouter");
const classRouter = require("./classRouter");
const StudentRouter = require("./studentRouter");
const authentication = require("../middlewares/authentication");
const scheduleRouter = require("./scheduleRouter");
const contactRouter = require("./contactRouter");
const historyRouter = require("./historyRouter");

router.get("/", (req, res) => res.status(200).json("Welcome to Gooroo"));

router.use("/users", userRouter);

router.use(authentication);

router.use("/wishlists", wishlistRouter);
router.use("/transactions", TransactionRouter);
router.use("/teachers", TeacherRouter);
router.use("/students", StudentRouter);
router.use("/classes", classRouter);
router.use("/schedules", scheduleRouter);
router.use("/contacts", contactRouter);
router.use("/histories", historyRouter);

module.exports = router;
