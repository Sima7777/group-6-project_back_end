const { User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const setBalance = async (req, res) => {
  const { _id } = req.user
  const { balance } = req.body

  const newBalance = await User.findByIdAndUpdate(
    _id,
    { balance },
    { new: true })

  sendSuccessResponse(res, { newBalance: balance }, 201)
}

module.exports = setBalance
