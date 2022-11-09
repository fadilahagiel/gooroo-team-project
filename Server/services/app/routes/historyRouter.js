const Controller = require("../controllers/historyController");
const router = require("express").Router();
router.get("/", Controller.getHistory);
module.exports = router;
