const { User } = require('../../models')
// const { sendSuccessResponse } = require('../../helpers')

const setBalance = async (req, res) => {
  const { _id } = req.user
  const { balance } = req.body

  const newBalance = await User.findByIdAndUpdate(
    _id,
    { balance },
    { new: true }
  )

  // res.json(res, { newBalance: balance }, 201)
  res.status(201).json({
    balance: newBalance.balance
  })
}

module.exports = setBalance
