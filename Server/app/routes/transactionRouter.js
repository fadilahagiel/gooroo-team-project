const TransactionController = require('../controller/TransactionController')
const router = require('express').Router()

router.post('/:classId', TransactionController.enterClass)
router.patch('/:id', TransactionController.studentResponse)

module.exports = router