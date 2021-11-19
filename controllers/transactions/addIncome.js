const { Transaction } = require('../../models/transaction')
const { User } = require('../../models/user')
const sendSuccessResponse = require('../../helpers/sendSuccessResponse')

const addIncome = async (req, res, next) => {
  const { amount } = req.body
  const { _id } = req.user
  const user = await User.findById(_id)
  const newTransaction = {
    ...req.body,
    isIncome: true,
    owner: _id,
  }
  try {
    const newBalance = user.balance + amount
    await User.findByIdAndUpdate(
      _id,
      { balance: newBalance },
      { new: true },
    )
    const result = await Transaction.create(newTransaction)
    sendSuccessResponse(res, { result }, 201)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = addIncome
