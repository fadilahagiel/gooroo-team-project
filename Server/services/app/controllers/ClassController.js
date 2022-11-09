const {
  Class,
  Transaction,
  Student,
  Teacher,
  Schedule,
  Subject,
  sequelize,
  Wishlist,
  User,
} = require("../models");

class Controller {
  static async postClass(req, res, next) {
    const t = await sequelize.transaction();
    try {
      console.log("masuk", req.body);
      if (req.user.role != "teacher") {
        throw { name: "forbidden" };
      }
      const { name, price, quota, SubjectId, description, schedules, url } =
        req.body;
      const UserId = req.user.id;
      const teacherFound = await Teacher.findOne(
        { where: { UserId } },
        { transaction: t }
      );
      const newClass = await Class.create(
        {
          name,
          price,
          quota,
          SubjectId,
          description,
          url,
          TeacherId: teacherFound.id,
        },
        { transaction: t }
      );
      const arraySch = schedules.map((el) => {
        return {
          startDate: new Date(el.startDate),
          endDate: new Date(el.endDate),
          ClassId: newClass.id,
        };
      });
      await Schedule.bulkCreate(arraySch, { transaction: t });
      await t.commit();
      res.status(201).json({ message: `Berhasil membuat kelas ${name}` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getClass(req, res, next) {
    try {
      const allClass = await Class.findAll({
        include: [Teacher, Subject, Schedule, Transaction],
      });
      res.status(200).json(allClass);
    } catch (error) {
      next(error);
    }
  }

  static async statusOnProgress(req, res, next) {
    try {
      const { id } = req.params;
      const classFound = await Class.findOne({ where: { id } });
      if (!classFound) {
        throw { name: "class not found" };
      }
      await Class.update({ status: "on progress" }, { where: { id } });
      res.status(200).json({ message: `Success update class's status` });
    } catch (error) {
      next(error);
    }
  }

  static async getMyClassesTeacher(req, res, next) {
    try {
      const { id } = req.user;
      if (req.user.role != "teacher") {
        throw { name: "forbidden" };
      }
      const teacher = await Teacher.findOne({ where: { UserId: id } });
      const classes = await Class.findAll({
        where: { TeacherId: teacher.id },
        include: [Subject],
      });
      res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  }

  static async deleteClass(req, res, next) {
    try {
      const { ClassId } = req.params;
      const findClass = await Class.findOne({
        where: {
          id: ClassId,
        },
      });
      await Class.destroy({
        where: {
          id: ClassId,
        },
      });
      res
        .status(200)
        .json({ message: `Success delete class ${findClass.name}` });
    } catch (error) {
      next(error);
    }
  }

  static async getOneClass(req, res, next) {
    try {
      const { ClassId } = req.params;
      const findClass = await Class.findOne({
        where: {
          id: ClassId,
        },
        include: [Schedule, Teacher, Subject],
      });
      if (!findClass) {
        throw { name: "class not found" };
      }
      res.status(200).json(findClass);
    } catch (error) {
      next(error);
    }
  }
  static async getOneClassStudent(req, res, next) {
    try {
      const { ClassId } = req.params;
      const findClass = await Class.findOne({
        where: {
          id: ClassId,
        },
        include: { model: Transaction, include: Student },
      });
      let newArr = [];
      findClass.Transactions.forEach((el) => {
        newArr.push(el.Student);
      });
      res.status(200).json(newArr);
    } catch (error) {
      next(error);
    }
  }

  static async updateClass(req, res, next) {
    try {
      const { ClassId } = req.params;
      const { name, price, quota, SubjectId, description, url } = req.body;
      const findClass = await Class.findOne({
        where: {
          id: ClassId,
        },
      });
      await Class.update(
        { name, price, quota, SubjectId, description, url },
        {
          where: {
            id: ClassId,
          },
        }
      );
      res.status(200).json({ message: `${findClass.name} has been update` });
    } catch (error) {
      next(error);
    }
  }

  static async getMyClassesStudent(req, res, next) {
    try {
      const { id } = req.user;
      if (req.user.role != "student") {
        throw { name: "forbidden" };
      }
      const findStudent = await Student.findOne({
        where: {
          UserId: id,
        },
      });
      const findTransaction = await Transaction.findAll({
        where: {
          StudentId: findStudent.id,
        },
        include: { model: Class, include: [Schedule, Teacher] },
      });
      const findClasses = findTransaction.map((el) => {
        return el.Class;
      });
      res.status(200).json(findClasses);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
