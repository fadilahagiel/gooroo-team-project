const TransactionController = require('../controllers/TransactionController')
const { AuthTeacher } = require('../middlewares/authorization')
const router = require('express').Router()

router.post('/:ClassId', TransactionController.enterClass)
router.get('/:id', TransactionController.findOneTransaction)
router.put('/:id', TransactionController.studentResponse)
router.patch('/:ClassId', AuthTeacher, TransactionController.collectTransaction)


module.exports = router