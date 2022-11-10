const Controller = require("../controllers/wishlistController");
const { AuthStudent } = require("../middlewares/authorization");

const router = require("express").Router();

//author for student
router.get("/", Controller.getWishlist);
router.get("/cek/:ClassId", Controller.findWishlist);
router.post("/:ClassId", Controller.addWishlist);
router.delete("/:WishlistId", AuthStudent, Controller.deleteWishlist);

module.exports = router;
