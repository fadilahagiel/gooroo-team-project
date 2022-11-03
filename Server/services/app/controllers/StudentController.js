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
}

module.exports = StudentController;
