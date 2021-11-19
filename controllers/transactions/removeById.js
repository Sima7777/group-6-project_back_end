const { NotFound } = require('http-errors')
const { Transaction, User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const removeById = async (req, res, next) => {
  const { _id } = req.user
  const user = await User.findById(_id)
  const { transactionId } = req.params
  const transaction = await Transaction.findById(transactionId)
  const { amount } = transaction
  const { isIncome } = transaction
  try {
    if (!isIncome) {
      const newBalance = user.balance + amount
      await User.findByIdAndUpdate(
        _id,
        { balance: newBalance },
        { new: true })
      const result = Transaction.findByIdAndDelete(transactionId)
      if (!result) {
        throw new NotFound()
      }
      sendSuccessResponse(res, { message: 'Success delete' })
    } else {
      const newBalance = user.balance - amount
      await User.findByIdAndUpdate(
        _id,
        { balance: newBalance },
        { new: true })
      const result = Transaction.findByIdAndDelete(transactionId)
      if (!result) {
        throw new NotFound()
      }
      sendSuccessResponse(res, { message: 'Success delete' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = removeById
