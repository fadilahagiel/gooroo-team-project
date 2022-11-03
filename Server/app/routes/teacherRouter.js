const TeacherController = require('../controllers/TeacherController')
const router = require('express').Router()

router.get('/', TeacherController.showBestTeacher)
router.post('/detail', TeacherController.detail)

module.exports = router