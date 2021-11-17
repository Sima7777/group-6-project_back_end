const { User } = require('../../models')
// const sendSuccessResponse = require('../../helpers')

const logout = async (req, res) => {
  console.log('logout')
  // const { _id } = req.user
  // await User.findByIdAndUpdate(_id, { token: null })
  const { email } = req.user
  await User.findOneAndUpdate({ email }, { token: null })
  res.json({
    status: 'success',
    code: 200,
    message: 'Success logout'
  })
}

module.exports = logout
