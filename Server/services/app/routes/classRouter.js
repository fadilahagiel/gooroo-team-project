const ClassController = require("../controllers/ClassController");
const { AuthTeacher } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/", ClassController.postClass);
router.get("/", ClassController.getClass);
router.get("/myClassesStudent", ClassController.getMyClassesStudent);
router.get("/myClasses", ClassController.getMyClassesTeacher);
router.get("/:ClassId", ClassController.getOneClass);
router.delete("/:ClassId", AuthTeacher, ClassController.deleteClass);
router.put("/:ClassId", AuthTeacher, ClassController.updateClass);
router.patch("/:id", ClassController.statusOnProgress);
router.get("/myStudent/:ClassId", ClassController.getOneClassStudent);

module.exports = router;
