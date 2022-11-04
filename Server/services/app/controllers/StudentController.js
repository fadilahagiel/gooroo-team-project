const { Student } = require("../models");

class StudentController {
  static async detail(req, res, next) {
    try {
      const { id } = req.user;
      const { fullName, image } = req.body;
      const newProfile = await Student.create({
        fullName,
        UserId: id,
        image,
      });
      res.status(200).json(newProfile);
    } catch (error) {
      next();
    }
  }
  static async editDetail(req, res, next) {
    try {
      const detailId = +req.params.id;
      const { fullName, image } = req.body;
      const detailStudent = await Student.findByPk(detailId);
      if (!detailStudent) {
        throw { name: "invalid_credentials" };
      }
      await Student.update({ fullName, image }, { where: { id: detailId } });
      res.status(200).json({ message: `Student profile has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
