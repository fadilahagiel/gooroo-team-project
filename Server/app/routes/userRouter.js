const UserController = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", UserController);
router.post("/login", UserController);

module.exports = router;
