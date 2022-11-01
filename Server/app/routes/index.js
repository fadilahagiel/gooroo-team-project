const router = require("express").Router();
const wishlistRouter = require("./wishlistRouter");

router.use("/wishlist", wishlistRouter);

module.exports = router;
