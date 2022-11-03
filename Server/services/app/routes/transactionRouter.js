const TransactionController = require('../controllers/TransactionController')
const router = require('express').Router()

router.post('/:classId', TransactionController.enterClass)
router.get('/:id', TransactionController.findOneTransaction)
router.put('/:id', TransactionController.studentResponse)
router.patch('/:classId', TransactionController.collectTransaction)


module.exports = router