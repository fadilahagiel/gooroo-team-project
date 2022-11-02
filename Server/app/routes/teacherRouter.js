const TeacherController = require('../controllers/TeacherController')
const router = require('express').Router()

router.get('/', TeacherController.showBestTeacher)

module.exports = router