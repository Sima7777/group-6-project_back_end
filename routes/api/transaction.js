const express = require('express')
const router = express.Router()

const transactions = require('../../controllers/transactions/transactions')

const { authenticate, controllerWrapper } = require('../../middlewares')

router.get(
  '/getExpenseByMonth',
  authenticate,
  controllerWrapper(transactions.getExpenseByMonth),
)

router.get(
  '/getIncomeByMonth',
  authenticate,
  controllerWrapper(transactions.getIncomeByMonth),
)

module.exports = router
