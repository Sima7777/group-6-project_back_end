const { Transaction, User } = require('../../models')

const addExpense = async (req, res, next) => {
  try {
    const { amount } = req.body
    const userId = req.user._id.toString()
    const transactonData = await Transaction.create({
      ...req.body,
      isIncome: false,
      owner: userId
    })
    res.status(201).json({
      transactonData
    })
    const user = await User.findById(userId)
    user.balance -= amount
    await user.save()
  } catch (error) {
    next(error)
  }
}

module.exports = addExpense
