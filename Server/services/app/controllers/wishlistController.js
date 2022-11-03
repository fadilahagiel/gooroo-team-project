const { Wishlist, Class } = require("../models");

class Controller {
  static async addWishlist(req, res, next) {
    try {
      const { ClassId } = req.params;

      const StudentId = 1; //Hardcode studentId=1
      const findClass = await Class.findOne({
        where: {
          id: ClassId,
        },
      });
      if (!findClass) {
        throw { name: "class not found" };
      }
      const findWishlist = await Wishlist.findOne({
        where: {
          StudentId,
          ClassId,
        },
      });
      if (findWishlist) {
        throw { name: "already" };
      }
      await Wishlist.create({ StudentId, ClassId });
      res
        .status(201)
        .json({ message: `Success add ${findClass.name} to wishlist` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = Controller;
