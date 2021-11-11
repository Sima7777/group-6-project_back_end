const { Transaction } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')
const { NotFound } = require('http-errors')

const remove = async (id) => await Transaction.findByIdAndRemove(id)

const removeTransaction = async (req, res, next) => {
  try {
    const result = await remove(req.params.id)

    if (!result) {
      throw new NotFound('Transaction not found')
    }

    sendSuccessResponse(res, { message: 'Successfully deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = { removeTransaction }
