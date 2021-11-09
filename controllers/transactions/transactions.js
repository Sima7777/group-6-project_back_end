const { Transaction } = require('../../model')

const getExpenseByMonth = async (req, res, next) => {
  try {
    const expenseByMonth = await Transaction.aggregate([
      { $match: { isIncome: false } },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
        },
      },
    ]).limit(6)

    res.status(200).json({
      expenseByMonth,
    })
  } catch (error) {
    next(error)
  }
}

const getIncomeByMonth = async (req, res, next) => {
  try {
    const incomeByMonth = await Transaction.aggregate([
      { $match: { isIncome: true } },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
        },
      },
    ]).limit(6)

    res.status(200).json({
      incomeByMonth,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getExpenseByMonth, getIncomeByMonth }
