const express = require('express')
const { joiTransactionSchema } = require('../../models/transaction')
const transactionsController = require('../../controllers/transactions')
const { authenticate, controllerWrapper, validation } = require('../../middlewares')

const router = express.Router()

router.post('/addIncome', authenticate, validation(joiTransactionSchema), controllerWrapper(transactionsController.addIncome))

router.post('/addExpense', authenticate, validation(joiTransactionSchema), controllerWrapper(transactionsController.addExpense))

router.delete('/:transactionId', authenticate, controllerWrapper(transactionsController.removeById))

router.get('/getExpenseByDate/:date', authenticate, controllerWrapper(transactionsController.getExpenseByDate))

router.get('/getIncomeByDate/:date', authenticate, controllerWrapper(transactionsController.getIncomeByDate))

router.get('/getExpenseByMonth', authenticate, controllerWrapper(transactionsController.getExpenseByMonth))

router.get('/getIncomeByMonth', authenticate, controllerWrapper(transactionsController.getIncomeByMonth))

router.get('/getExpenseDetail/:date', authenticate, controllerWrapper(transactionsController.getExpenseDetail))

router.get('/getIncomeDetail/:date', authenticate, controllerWrapper(transactionsController.getIncomeDetail))

router.get('/getLast', authenticate, controllerWrapper(transactionsController.getLast))

module.exports = router
