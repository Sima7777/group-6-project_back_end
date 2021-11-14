const { User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const googleUser = async (req, res) => {
  const { email } = req.params
  const user = await User.findOne({ email })
  sendSuccessResponse(res, user, 200)
}

module.exports = googleUser
