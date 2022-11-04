const StudentController = require("../controllers/StudentController");
const router = require("express").Router();

router.post("/detail", StudentController.detail);
router.put("/detail/:id", StudentController.editDetail);

module.exports = router;
