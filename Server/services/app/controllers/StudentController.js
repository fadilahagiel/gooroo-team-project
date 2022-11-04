const { Student, Teacher, Class, Transaction } = require("../models");

class StudentController {

  static async getMyStudent(req, res, next) {
    try {
      const { id } = req.user
      const teacherFound = await Teacher.findOne({ where: { UserId: id } })
      if (!teacherFound) {
        throw { name: "invalid_credentials" };
      }
      const { classId } = req.params
      const classFound = await Class.findOne({
        where: {
          id: classId,
        },
        include: {
          model: Transaction,
          as: 'Transactions'
        },
      });
      if (!classFound) {
        throw { name: "invalid_credentials" };
      }
      console.log(classFound);
      // const students = await Student.findAll({
      //   where: {
      //     UserId: id,
      //     Class
      // }})
      res.status(200).json(classFound)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async postStudent(req, res, next) {
    try {
      const { id, role } = req.user;
      if (role !== 'student') {
        throw { name: "forbidden" }
      }

      const studentFound = await Student.findOne({ where: { UserId: id } })
      if (studentFound) {
        throw { name: "You already made a profile" };
      }
      const { fullName, image } = req.body;
      const student = await Student.create({
        fullName,
        UserId: id,
        image,
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
      const student = await Student.findOne({where: {UserId: id}});
      if (!student) {
        throw { name: "invalid_credentials" };
      }
      await Student.update({ fullName, image }, { where: { id: detailId } });
      res.status(200).json({ message: `Student profile has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async showOneStudent(req, res, next) {
    try {
      const { id } = req.user
      const student = await Student.findOne({ where: { id } })
      if (!student) {
        throw { name: "invalid_credentials" };
      }
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
