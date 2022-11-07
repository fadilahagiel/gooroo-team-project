const { classAverageRating, teacherAverageRating } = require('../helpers/averageRating');
const fullQuota = require('../helpers/fullQuota');
const { Class, Transaction, Student, Teacher, sequelize, User, SaldoHistory } = require('../models')

class Controller{
  static async enterClass(req, res, next) {
    const t = await sequelize.transaction()
    try {
        if (req.user.role != "student") {
            throw { name: "forbidden" };
        }
        const {ClassId} = req.params
        const UserId = req.user.id
        const StudentFound = await Student.findOne({ where: { UserId } }, { transaction: t })
        const classFound = await Class.findOne({ where: { id: ClassId } }, { transaction: t })
        if (!classFound) {
            throw { name: 'invalid_credentials'}
        }
        const studentFound = await Student.findOne({ where: { id: StudentFound.id } }, { transaction: t })
        const transactionFound = await Transaction.findOne({ where: { ClassId: classFound.id, StudentId: studentFound.id } }, { transaction: t })
        if (transactionFound) {
            throw{name: "already_buy_class"}
        }
        const user = await User.findOne({ where: { id: UserId } }, { transaction: t })
        const isFull = await fullQuota(classFound)
        if (isFull) {
            throw{name: "Class is full"}
        }
        if (user.saldo < classFound.price) {
          throw { name: "not_enough_balance" };
        }
        await User.decrement(
          { saldo: classFound.price },
          { where: { id: studentFound.UserId } },
          { transaction: t }
        );
        const transactionCreated = await Transaction.create(
          { ClassId, StudentId: StudentFound.id },
          { transaction: t }
        );
        const newSaldo = user.saldo - classFound.price;
        await SaldoHistory.create({
          amount: classFound.price,
          UserId,
          description: `Buy class ${classFound.name}`,
          balance: newSaldo,
          category: "credit",
        });
        await t.commit();
        res.status(201).json(transactionCreated);
      } catch (error) {
        await t.rollback();
        next(error);
      }
  }

  static async collectTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { ClassId } = req.params;
      const transactions = await Transaction.findAll(
        { where: { ClassId } },
        { transaction: t }
      );
      const classFound = await Class.findOne(
        { where: { id: transactions[0].ClassId } },
        { transaction: t }
      );
      if (classFound.status == "collected") {
        throw { name: "already collected" };
      }
      if (classFound.status != 'done') {
        throw { name: "status_isnot_done" };
      }
      await Class.update(
        { status: "collected" },
        { where: { id: transactions[0].ClassId } },
        { transaction: t }
      );
      const profit = classFound.price * transactions.length;
      const teacherFound = await Teacher.findOne(
        { where: { id: classFound.TeacherId } },
        { transaction: t }
      );
      await User.increment(
        { saldo: profit },
        { where: { id: teacherFound.UserId } }
      );
      const findUser = await User.findOne({
        where: {
          id: teacherFound.UserId,
        },
      });
      const newSaldo = findUser.saldo;
      await SaldoHistory.create(
        {
          amount: +profit,
          UserId: +findUser.id,
          description: `Earn profit from ${classFound.name} Rp ${profit}`,
          balance: +newSaldo,
          category: "debit",
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .json({ message: `You earned ${profit} from ${classFound.name}` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async findOneTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const transactionFound = await Transaction.findOne({
        where: { id },
        include: [Student, Class],
      });
      if (!transactionFound) {
        throw { name: "invalid_credentials" };
      }
      res.status(200).json(transactionFound);
    } catch (error) {
      next(error);
    }
  }

  static async studentResponse(req, res, next) {
    const t = await sequelize.transaction();
    try {
      if (req.user.role !== "student") {
        throw { name: "forbidden" };
      }
      const { id } = req.params;
      const student = await Student.findOne(
        { where: { UserId: req.user.id } },
        { transaction: t }
      );
      const { testimoni, rating } = req.body;
      if (!testimoni || !rating) {
        throw { name: "reponse_required" };
      }
      const transactionFound = await Transaction.findOne(
        { where: { id } },
        { transaction: t }
      );
      if (!transactionFound) {
        throw { name: "invalid_credentials" };
      }
      await Transaction.update(
        { testimoni, rating },
        { where: { id } },
        { transaction: t }
      );
      const updatedRatingClass = await classAverageRating(
        transactionFound.ClassId
      );
      await Class.update(
        { averageRating: updatedRatingClass },
        { where: { id: transactionFound.ClassId } },
        { transaction: t }
      );
      const { updatedRatingTeacher, TeacherId } = await teacherAverageRating(
        transactionFound.ClassId
      );
      await Teacher.update(
        { averageRating: updatedRatingTeacher },
        { where: { id: TeacherId } },
        { transaction: t }
      );
      res.status(200).json({ message: "Berhasil memberi testimoni" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
