const ClassController = require("../controllers/ClassController");
const router = require("express").Router();

router.post("/", ClassController.postClass);
router.get("/", ClassController.getClass);
router.get("/:ClassId", ClassController.getOneClass);
router.delete("/:ClassId", ClassController.deleteClass);
router.put("/:ClassId", ClassController.updateClass);
router.get("/buyClass/:price", ClassController.buyClass);

module.exports = router;
