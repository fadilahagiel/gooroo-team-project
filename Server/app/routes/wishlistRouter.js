const Controller = require("../controllers/wishlistController");

const router = require("express").Router();

router.post("/:ClassId", Controller.addWishlist);

//author for student
router.get("/", Controller.getWishlist);

module.exports = router;
