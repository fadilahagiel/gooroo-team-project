const TeacherController = require('../controller/TeacherController')
const router = require('express').Router()

router.get('/', TeacherController.showBestTeacher)

module.exports = router