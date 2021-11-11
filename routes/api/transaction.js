const express = require('express')
const router = express.Router()
// const joiTransactionSchema = require('../../models/transaction')
const add = require('../../controllers/transactions/addTransaction')
const clear = require('../../controllers/transactions/removeTransaction')
const transactions = require('../../controllers/transactions/transactions')

const { authenticate, controllerWrapper } = require('../../middlewares')

router.post('/expense', authenticate, controllerWrapper(add.addTransaction))

router.post('/income', authenticate, controllerWrapper(add.addTransaction))

router.delete('/:id', controllerWrapper(clear.removeTransaction))

router.get(
  '/getExpenseByMonth',
  authenticate,
  controllerWrapper(transactions.getExpenseByMonth)
)

router.get(
  '/getIncomeByMonth',
  authenticate,
  controllerWrapper(transactions.getIncomeByMonth)
)

module.exports = router
