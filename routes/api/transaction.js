const express = require('express')
const router = express.Router()
// const joiTransactionSchema = require('../../models/transaction')
const ctrl = require('../../controllers/transactions/addTransaction')
const transactions = require('../../controllers/transactions/transactions')

const { authenticate, controllerWrapper } = require('../../middlewares')

router.post('/', authenticate, controllerWrapper(ctrl.addTransaction))

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
