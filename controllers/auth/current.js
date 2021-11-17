const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const sendSuccessResponse = require('../../helpers/sendSuccessResponse')

const current = async (req, res) => {
  // const { _id } = req.user
  // const data = await User.findById(_id, 'email balance token')
  const { email } = req.user
  const data = await User.findOne({ email })
  console.log('dataCurrent', data)
  if (!data) {
    throw new Unauthorized('Not authorized')
  }

  sendSuccessResponse(res, { data }, 200)
}

module.exports = current
