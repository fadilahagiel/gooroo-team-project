const { Class, Transaction, Student, Teacher } = require('../models')

class Controller {
    static async showBestTeacher(req, res, next) {
        try {
            const option = {}
            option.order = [['averageRating', 'DESC']]
            option.limit = 3
            const teachers = await Teacher.findAll(option)
            res.status(200).json(teachers)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller