const ClassController = require("../controllers/ClassController");
const router = require("express").Router();

router.post("/", ClassController.postClass);

module.exports = router;
