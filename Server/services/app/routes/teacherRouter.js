const TeacherController = require("../controllers/TeacherController");
const router = require("express").Router();
const upload = require("../helpers/multer");

router.get("/detail", TeacherController.showMyDetail);
router.get("/", TeacherController.showAllTeachers);
router.post("/", upload.single("image"), TeacherController.postTeacher);
router.put("/", TeacherController.editTeacher);
router.get("/:id", TeacherController.showOneTeacher);

module.exports = router;
