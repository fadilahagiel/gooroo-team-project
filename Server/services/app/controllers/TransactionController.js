const { Class, Transaction, Student, Teacher, sequelize, User } = require('../models')

class Controller{
    static async enterClass(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const ClassId = req.params.classId
            const StudentId = 1
            const classFound = await Class.findOne({ where: { id: ClassId } }, { transaction: t })
            if (!classFound) {
                throw { name: 'invalid_credentials'}
            }
            const studentFound = await Student.findOne({ where: { id: StudentId } }, { transaction: t })
            if (!studentFound) {
                throw { name: 'invalid_credentials' }
            }
            const teacherFound = await Teacher.findOne({ where: { id: classFound.TeacherId } }, { transaction: t })
            if (!teacherFound) {
                throw { name: 'invalid_credentials' }
            }
            await User.decrement({ saldo: classFound.price }, { where: { id: studentFound.UserId } }, { transaction: t })
            const transactionCreated = await Transaction.create({ ClassId, StudentId, }, { transaction: t })
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
            const ClassId  = req.params.classId
            const transactions = await Transaction.findAll({ where: { ClassId } }, { transaction: t })
            const classFound = await Class.findOne({ where: { id: transactions[0].ClassId } }, { transaction: t })
            if (!classFound) {
                throw { name: 'invalid_credentials' }
            }
            if (classFound.status == 'collected') {
                throw { name: 'already collected' }
            }
            await Class.update({ status: 'collected' }, { where: { id: transactions[0].ClassId } }, { transaction: t })
            const profit = classFound.price * transactions.length
            const teacherFound = await Teacher.findOne({ where: { id: classFound.TeacherId } }, { transaction: t })
            if (!teacherFound) {
                throw { name: 'invalid_credentials' }
            }
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
        try {
            const { id } = req.params
            const { testimoni, rating } = req.body
            if (!testimoni || !rating) {
                throw{name: 'reponse_required'}
            }
            const transactionFound = await Transaction.findOne({ where: { id } })
            if (!transactionFound) {
                throw { name: 'invalid_credentials' }
            }
            await Transaction.update({ testimoni, rating }, { where: { id } })
            res.status(200).json({message: 'Berhasil'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller