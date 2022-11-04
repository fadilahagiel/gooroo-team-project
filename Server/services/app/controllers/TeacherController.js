const { Class, Transaction, Student, Teacher } = require("../models");

class Controller {
  static async showBestTeacher(req, res, next) {
    try {
      const option = {};
      option.order = [["averageRating", "DESC"]];
      option.limit = 3;
      const teachers = await Teacher.findAll(option);
      res.status(200).json(teachers);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async detail(req, res, next) {
    try {
      const { id } = req.user;
      const { fullName, bio, image } = req.body;
      const newProfile = await Teacher.create({
        fullName,
        UserId: id,
        bio,
        image,
        averageRating: 0,
      });
      res.status(200).json(newProfile);
    } catch (error) {
      next();
    }
  }
  static async editDetail(req, res, next) {
    try {
      const detailId = +req.params.id;
      const { fullName, bio, image } = req.body;
      const detailStudent = await Teacher.findByPk(detailId);
      if (!detailStudent) {
        throw { name: "invalid_credentials" };
      }
      await Teacher.update(
        { fullName, bio, image },
        { where: { id: detailId } }
      );
      res.status(200).json({ message: `Teacher profile has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
