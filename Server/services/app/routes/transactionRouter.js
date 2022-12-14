const TransactionController = require("../controllers/TransactionController");
const authentication = require("../middlewares/authentication");
const { AuthTeacher } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/:ClassId", TransactionController.enterClass);
router.get("/:id", TransactionController.findOneTransaction);
router.put("/:id", TransactionController.studentResponse);
router.get("/cek/:ClassId", TransactionController.findTransaction);
router.get("/response/:ClassId", TransactionController.findOneResponseTransation);
router.patch("/:ClassId", AuthTeacher, TransactionController.collectTransaction);
router.get("/teacher/:TeacherId", TransactionController.myTransaction);

module.exports = router;
