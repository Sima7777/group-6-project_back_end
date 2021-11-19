const { User } = require('../../models')
// const { sendSuccessResponse } = require('../../helpers')

const setBalance = async (req, res) => {
  const { _id } = req.user._id
  const { balance } = req.body

  const newBalance = await User.findByIdAndUpdate(
    _id,
    { balance },
    { new: true }
  )

  // res.json(res, { newBalance: balance }, 201)
  res.status(201).json({
    email: newBalance.email,
    balance: newBalance.balance,
  })
}

module.exports = setBalance
