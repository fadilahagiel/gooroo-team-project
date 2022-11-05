const { Class, Transaction, Student, Teacher, User } = require("../models");

class Controller {
  static async showBestTeacher(req, res, next) {
    try {
      const option = {};
      option.order = [["averageRating", "DESC"]];
      option.limit = 3;
      const teachers = await Teacher.findAll(option);
      res.status(200).json(teachers);
    } catch (error) {
      next(error);
    }
  }

  static async showOneTeacher(req, res, next) {
    try {
      const { id } = req.user
      const teacher = await Teacher.findOne({ where: { UserId:id } })
      if (!teacher) {
        throw { name: "invalid_credentials" };
      }
      res.status(200).json(teacher);
    } catch (error) {
      next(error);
    }
  }

  static async postTeacher(req, res, next) {
    try {
      const { id, role } = req.user;
      if (role !== 'teacher') {
        throw { name: "forbidden"}
      }

      const teacherFound = await Teacher.findOne({ where: { UserId: id } })

      if (teacherFound) {
        throw { name: "already_have" };
      }

      const { fullName, bio, image } = req.body;
      const teacher = await Teacher.create({
        fullName,
        UserId: id,
        bio,
        image,
        averageRating: 0,
      });
      res.status(201).json(teacher);
    } catch (error) {
      next(error);
    }
  }
  static async editTeacher(req, res, next) {
    try {
      const { id, role } = req.user;
      const { fullName, bio, image } = req.body;
      const teacher = await Teacher.findOne({where: {UserId:id}});
      if (!teacher) {
        throw { name: "invalid_credentials" };
      }
      
      await Teacher.update(
        { fullName, bio, image },
        { where: { UserId:id } }
      );
      res.status(200).json({ message: `Teacher profile has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
