const {
  Class,
  Transaction,
  Student,
  Teacher,
  Schedule,
  sequelize,
} = require("../models");

class Controller {
  static async postClass(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, price, quota, SubjectId, description, schedules, url } =
        req.body;
      // const UserId = req.user.id
      const UserId = 2;
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
      const allClass = await Class.findAll({ include: [Schedule] });
      res.status(200).json(allClass);
    } catch (error) {
      next(error);
    }
  }

  static async deleteClass(req, res, next) {
    try {
      const { ClassId } = req.params;
      const findClass = await Class.findOne(
        {
          where: {
            id: ClassId,
          },
        },
        { include: [Schedule] }
      );
      if (!findClass) {
        throw { name: "class not found" };
      }
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
      });
      if (!findClass) {
        throw { name: "class not found" };
      }
      res.status(200).json(findClass);
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
      if (!findClass) {
        throw { name: "class not found" };
      }
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
}

module.exports = Controller;
