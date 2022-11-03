const { Class, Transaction, Student, Teacher, Schedule, sequelize } = require('../models')

class Controller {
    static async postClass(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { name, price, quota, SubjectId, description, schedules, url } = req.body
            // const UserId = req.user.id
            const UserId = 2
            const teacherFound = await Teacher.findOne({ where: { UserId } }, { transaction: t })
            const newClass = await Class.create({ name, price, quota, SubjectId, description, url, TeacherId: teacherFound.id }, { transaction: t })
            const arraySch = schedules.map((el) => {
                return {
                    startDate: new Date(el.startDate),
                    endDate: new Date(el.endDate),
                    ClassId: newClass.id,
                }
            })
            await Schedule.bulkCreate(arraySch, { transaction: t })
            await t.commit()
            res.status(201).json({message: `Berhasil membuat kelas ${name}`})
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }
}

module.exports = Controller