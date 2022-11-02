const { Class, Transaction, Student } = require('../models')

class Controller{
    static async enterClass(req, res, next) {
        try {
            const ClassId = req.params.classId
            const StudentId = 1
            const classFound = await Class.findOne({ where: { id: ClassId } })
            if (!classFound) {
                throw { name: 'invalid_credentials'}
            }
            const transactionCreated = await Transaction.create({ ClassId, StudentId, })
            res.status(201).json(transactionCreated)
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