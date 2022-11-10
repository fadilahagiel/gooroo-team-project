const {Class, Transaction} = require('../models')

async function fullQuota(ClassFound) {
    const transactions = await Transaction.findAll({ where: { ClassId: ClassFound.id } })
    if (transactions.length === ClassFound.quota) {
        return true
    }
    return false
}

module.exports = fullQuota