const TeacherController = require("../controllers/TeacherController");
const router = require("express").Router();

router.get("/", TeacherController.showBestTeacher);
router.post("/", TeacherController.postTeacher);
router.put("/", TeacherController.editTeacher);
router.get("/detail", TeacherController.showBestTeacher);

module.exports = router;
