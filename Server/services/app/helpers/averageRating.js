const { Class, Transaction, Teacher } = require('../models')

async function classAverageRating (ClassId) {
    let classFound = await Class.findOne({ where: { id: ClassId } })
    let transactions = await Transaction.findAll({ where: { ClassId: classFound.id } })
    transactions = transactions.filter((el) => el.rating != 0)
    let ratings = transactions.map(el => Number(el.rating))
    const updatedRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
    return updatedRating
}

async function teacherAverageRating(ClassId) {
    let classFound = await Class.findOne({ where: { id: ClassId } })
    let teacher = await Teacher.findOne({ where: { id: classFound.TeacherId } })
    let classes = await Class.findAll({ where: { TeacherId: teacher.id } })
    classes = classes.filter((el) => el.averageRating != '0')
    let ratings = classes.map(el => Number(el.averageRating))
    const updatedRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
    return {updatedRatingTeacher: updatedRating, TeacherId: teacher.id}
}

module.exports = { classAverageRating, teacherAverageRating }