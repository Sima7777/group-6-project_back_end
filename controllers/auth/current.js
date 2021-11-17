const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
// const sendSuccessResponse = require('../../helpers/sendSuccessResponse')

const current = async (req, res) => {
  const token = req.user.token
  const user = await User.findOne({ token })

  if (!user) {
    throw new Unauthorized('Not authorized')
  }

  res.status(200).json({
    user: {
      email: user.email,
      balance: user.balance,
    }
  })
}

module.exports = current
