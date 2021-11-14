const { NotFound } = require('http-errors')
const { Transaction, User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const removeById = async (req, res, next) => {
  try {
    const userId = req.user._id.toString()
    const { transactionsId } = req.params
    const transaction = await Transaction.findByIdAndDelete(transactionsId)
    if (!transaction) {
      throw new NotFound()
    }
    const user = await User.findById(userId)
    if (transaction.isIncome) {
      user.balance -= transaction.amount
    } else {
      user.balance += transaction.amount
    }
    await user.save()
    sendSuccessResponse(res, { message: 'Success delete' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeById
