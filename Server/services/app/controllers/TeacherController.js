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
}

module.exports = Controller;
