const TeacherController = require("../controllers/TeacherController");
const router = require("express").Router();

router.get("/detail", TeacherController.showOneTeacher);
router.get("/", TeacherController.showAllTeachers);
router.post("/", TeacherController.postTeacher);
router.put("/", TeacherController.editTeacher);

module.exports = router;
