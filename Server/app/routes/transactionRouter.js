const TransactionController = require('../controllers/TransactionController')
const router = require('express').Router()

router.post('/:classId', TransactionController.enterClass)
router.patch('/:id', TransactionController.studentResponse)
router.patch('/saldo/:classId', TransactionController.collectingTransaction)

module.exports = router