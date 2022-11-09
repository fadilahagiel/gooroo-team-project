const {
  Student,
  Teacher,
  Class,
  Transaction,
  User,
  Wishlist,
  Schedule,
} = require("../models");

class StudentController {
  static async getMyStudent(req, res, next) {
    try {
      const { id } = req.user;
      const teacherFound = await Teacher.findOne({ where: { UserId: id } });
      if (!teacherFound) {
        throw { name: "invalid_credentials" };
      }
      const { ClassId } = req.params;
      const transactions = await Transaction.findAll({
        where: { ClassId },
        include: Student,
      });
      const students = transactions.map((el) => {
        return el.Student;
      });
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  static async postStudent(req, res, next) {
    try {
      const { id, role } = req.user;
      const studentFound = await Student.findOne({ where: { UserId: id } });
      if (studentFound) {
        throw { name: "already_have" };
      }
      if (role !== "student") {
        throw { name: "forbidden" };
      }
      const { fullName } = req.body;
      const student = await Student.create({
        fullName,
        UserId: id,
        image: req.file.path,
      });
      res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }
  static async editStudent(req, res, next) {
    try {
      const { id, role } = req.user;
      const { fullName, image } = req.body;
      const student = await Student.findOne({ where: { UserId: id } });
      if (!student) {
        throw { name: "invalid_credentials" };
      }
      await Student.update({ fullName, image }, { where: { UserId: id } });
      res.status(200).json({ message: `Student profile has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async showOneStudent(req, res, next) {
    try {
      const { id } = req.user;
      const student = await Student.findOne({
        where: { UserId: id },
        include: [User, Wishlist, Transaction],
      });

      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
