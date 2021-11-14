const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const sendSuccessResponse = require('../../helpers/sendSuccessResponse')

const current = async (req, res) => {
  const { _id } = req.user
  const token = req.user.token
  const user = await User.findById(_id, `email name ${token}`)

  if (!user) {
    throw new Unauthorized('Not authorized')
  }

  sendSuccessResponse(res, { user }, 200)
}

module.exports = current
