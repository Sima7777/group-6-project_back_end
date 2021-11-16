const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendSuccessResponse } = require('../../helpers')
const { User } = require('../../models')

const { sendEmail } = require('../../helpers')
const { BASE_URL } = process.env

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verifyToken = nanoid()
  const newUser = new User({
    email,
    verifyToken,
  })

  const avatar = gravatar.url(email, { s: '250', d: 'identicon' }, true)
  newUser.setPassword(password)
  newUser.setAvatar(avatar)

  const verifyEmail = {
    to: email,
    subject: 'Verify your email to finish registration',
    html: `<a href='${BASE_URL}/api/auth/verify/${verifyToken}' target="_blank">Confirm email<a>`,
  }

  await sendEmail(verifyEmail)
  const result = await newUser.save()
  sendSuccessResponse(res, { data: result }, 201)
}

module.exports = signup
