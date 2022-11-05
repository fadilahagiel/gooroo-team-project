const ClassController = require("../controllers/ClassController");
const { AuthTeacher } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/", ClassController.postClass);
router.get("/", ClassController.getClass);
router.get("/myClasses", ClassController.getMyClasses);
router.get("/:ClassId", ClassController.getOneClass);
router.delete("/:ClassId", AuthTeacher, ClassController.deleteClass);
router.put("/:ClassId", AuthTeacher, ClassController.updateClass);
router.get("/buyClass/:price", ClassController.buyClass);


module.exports = router;
