const StudentController = require("../controllers/StudentController");
const router = require("express").Router();



router.post("/", StudentController.postStudent);
router.put("/", StudentController.editStudent);
router.get("/", StudentController.showOneStudent);
router.get("/:ClassId", StudentController.getMyStudent);

module.exports = router;
