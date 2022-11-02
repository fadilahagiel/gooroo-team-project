const Controller = require("../controllers/wishlistController");

const router = require("express").Router();

router.post("/:ClassId", Controller.addWishlist);

module.exports = router;
