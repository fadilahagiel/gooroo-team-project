const StudentController = require("../controllers/StudentController");
const router = require("express").Router();

router.post("/detail", StudentController.detail);

module.exports = router;
