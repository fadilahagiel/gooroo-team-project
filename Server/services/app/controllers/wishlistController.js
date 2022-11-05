const { Wishlist, Class, Subject, Student } = require("../models");

class Controller {
  static async addWishlist(req, res, next) {
    try {
      const { ClassId } = req.params;
      const { id } = req.user;
      const findStudent = await Student.findOne({ where: { UserId: id } });
      const StudentId = findStudent.id;
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
      next(error);
    }
  }

  static async getWishlist(req, res, next) {
    try {
      const { id } = req.user;
      const findStudent = await Student.findOne({ where: { UserId: id } });
      const wishlist = await Wishlist.findAll({
        where: {
          StudentId: findStudent.id,
        },
        include: {
          model: Class,
          include: {
            model: Subject,
          },
        },
      });
      res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      const { WishlistId } = req.params;
      const wishlist = await Wishlist.findOne({ where: { id: WishlistId } });
      if (!wishlist) {
        throw { name: "wishlist not found" };
      }
      await Wishlist.destroy({ where: { id: WishlistId } });
      res.status(200).json({ message: `Success delete wishlist` });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
