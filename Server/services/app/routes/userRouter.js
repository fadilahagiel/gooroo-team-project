const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/topup", authentication, UserController.topup);
router.patch("/saldo", authentication, UserController.updateSaldo);

module.exports = router;
