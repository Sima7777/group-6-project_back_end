const { User } = require('../../models')
const { NotFound, BadRequest } = require('http-errors')
const { sendEmail, sendSuccessResponse } = require('../../helpers/sendEmail')

// const { BASE_URL } = process.env

const repeatEmailVerification = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('Missing required field email')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('User not found')
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify your email to finish registration',
    html: `<a href='https://kapusta-pro.herokuapp.com/api/auth/verify/${user.verifyToken}' target="_blank">Confirm email<a>`,
  }

  await sendEmail(verifyEmail)
  sendSuccessResponse(res, null, 201)
}

module.exports = repeatEmailVerification
