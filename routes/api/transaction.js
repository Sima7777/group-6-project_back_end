const express = require('express')
const { joiTransactionSchema } = require('../../models/transaction')
const trasactionsController = require('../../controllers/transactions')
const { authenticate, controllerWrapper, validation } = require('../../middlewares')

const router = express.Router()

router.post('/addIncome', authenticate, validation(joiTransactionSchema), controllerWrapper(trasactionsController.addIncome))

router.post('/addExpense', authenticate, validation(joiTransactionSchema), controllerWrapper(trasactionsController.addExpense))

router.delete('/:transactionId', authenticate, controllerWrapper(trasactionsController.removeById))

router.get('/getExpenseByDate/:date', authenticate, controllerWrapper(trasactionsController.getExpenseByDate))

router.get('/getIncomeByDate/:date', authenticate, controllerWrapper(trasactionsController.getIncomeByDate))

router.get('/getExpenseByMonth', authenticate, controllerWrapper(trasactionsController.getExpenseByMonth))

router.get('/getIncomeByMonth', authenticate, controllerWrapper(trasactionsController.getIncomeByMonth))

router.get('/getExpenseDetail/:date', authenticate, controllerWrapper(trasactionsController.getExpenseDetail))

router.get('/getIncomeDetail/:date', authenticate, controllerWrapper(trasactionsController.getIncomeDetail))

router.get('/getLast', authenticate, controllerWrapper(trasactionsController.getLast))

module.exports = router
