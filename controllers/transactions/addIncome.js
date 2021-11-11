const { Transaction, User } = require('../../models')

const addIncome = async (req, res, next) => {
  try {
    const { amount } = req.body
    const userId = req.user._id.toSring()
    const transactonData = await Transaction.create({
      ...req.body,
      isIncome: true,
      owner: userId
    })
    res.status(201).json({
      transactonData
    })
    const user = await User.findById(userId)
    user.balance += amount
    await user.save()
  } catch (error) {
    next(error)
  }
}

module.exports = addIncome
