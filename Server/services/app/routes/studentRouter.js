const StudentController = require("../controllers/StudentController");
const router = require("express").Router();
const upload = require("../helpers/multer");


router.post("/", upload.single('image'),  StudentController.postStudent);
router.put("/", StudentController.editStudent);
router.get("/", StudentController.showOneStudent);
router.get("/:ClassId", StudentController.getMyStudent);

module.exports = router;
