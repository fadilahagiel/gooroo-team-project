const { classAverageRating, teacherAverageRating } = require('../helpers/averageRating');
const { Class, Transaction, Student, Teacher, sequelize, User } = require('../models')

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
            
            await User.decrement({ saldo: classFound.price }, { where: { id: studentFound.UserId } }, { transaction: t })
            const transactionCreated = await Transaction.create({ ClassId, StudentId: StudentFound.id, }, { transaction: t })
            await t.commit()
            res.status(201).json(transactionCreated)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }


    static async collectTransaction(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {ClassId}  = req.params
            const transactions = await Transaction.findAll({ where: { ClassId } }, { transaction: t })
            const classFound = await Class.findOne({ where: { id: transactions[0].ClassId } }, { transaction: t })
            if (classFound.status == 'collected') {
                throw { name: 'already collected' }
            }
            await Class.update({ status: 'collected' }, { where: { id: transactions[0].ClassId } }, { transaction: t })
            const profit = classFound.price * transactions.length
            const teacherFound = await Teacher.findOne({ where: { id: classFound.TeacherId } }, { transaction: t })
            await User.increment({saldo: profit}, { where: { id: teacherFound.UserId } })
            await t.commit()
            res.status(200).json({message: `You earned ${profit} from ${classFound.name}`})
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async findOneTransaction(req, res, next) {
        try {
            const { id } = req.params
            const transactionFound = await Transaction.findOne({ where: { id }, include: [Student, Class] })
            if (!transactionFound) {
                throw { name: 'invalid_credentials' }
            }
            res.status(200).json(transactionFound)
        } catch (error) {
            next(error)
        }
    }


    static async studentResponse(req, res, next) {
        const t = await sequelize.transaction()
        try {
            if (req.user.role !== "student") {
                throw { name: "forbidden" }
            }
            const { id } = req.params
            const student = await Student.findOne({ where: { UserId: req.user.id } }, { transaction: t })
            const { testimoni, rating } = req.body
            if (!testimoni || !rating) {
                throw{name: 'reponse_required'}
            }
            const transactionFound = await Transaction.findOne({ where: { id } }, { transaction: t })
            if (!transactionFound) {
                throw { name: 'invalid_credentials' }
            }
            await Transaction.update({ testimoni, rating }, { where: { id } }, { transaction: t })
            const updatedRatingClass = await classAverageRating(transactionFound.ClassId)
            await Class.update({ averageRating: updatedRatingClass }, { where: { id: transactionFound.ClassId } }, { transaction: t })
            const { updatedRatingTeacher, TeacherId } = await teacherAverageRating(transactionFound.ClassId)
            await Teacher.update({ averageRating: updatedRatingTeacher }, { where: { id: TeacherId } }, { transaction: t })
            res.status(200).json({message: 'Berhasil memberi testimoni'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller