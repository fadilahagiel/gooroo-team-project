const Controller = require("../controllers/wishlistController");

const router = require("express").Router();

//author for student
router.post("/:ClassId", Controller.addWishlist);
router.get("/", Controller.getWishlist);
router.delete("/:WishlistId", Controller.deleteWishlist);

module.exports = router;
