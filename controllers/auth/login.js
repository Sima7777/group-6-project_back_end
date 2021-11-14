const jwt = require('jsonwebtoken')
const { Unauthorized, BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne(
    { email },
    '_id email name password verify token',
  )
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (!user.verify) {
    throw new BadRequest('Email not verify')
  }
  const { _id } = user
  const payload = {
    _id,
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  sendSuccessResponse(res, { token, email }, 200)
}

module.exports = login
