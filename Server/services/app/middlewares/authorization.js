const { Teacher, Student, Class, Wishlist } = require("../models");

const AuthStudent = async (req, res, next) => {
  try {
    const { WishlistId } = req.params;
    const findWishlist = await Wishlist.findOne({
      where: {
        id: WishlistId,
      },
    });
    if (!findWishlist) {
      throw { name: "wishlist not found" };
    }
    const findStudent = await Student.findOne({
      where: {
        UserId: req.user.id,
      },
    });
    const { role } = req.user;
    if (role != "student" || findWishlist.StudentId !== findStudent.id) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

const AuthTeacher = async (req, res, next) => {
  try {
    const { ClassId } = req.params
    const classFound = await Class.findOne({ where: { id: ClassId } })
    if (!classFound) {
      throw { name: "class not found" };
    }
    const { id } = req.user
    const teacher = await Teacher.findOne({where: {UserId: id}})

    const { role } = req.user;
    if (role != "teacher" || classFound.TeacherId !== teacher.id) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { AuthStudent, AuthTeacher };
