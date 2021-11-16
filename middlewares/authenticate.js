const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  // console.log(`req.user`, req.user)
  const { authorization } = req.headers
  if (!authorization) {
    throw new Unauthorized('Not authorized')
  }
  console.log('authorization', authorization)
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw new Unauthorized('Not authorized')
  }

  try {
    // const { _id } = jwt.verify(token, SECRET_KEY)
    const { email } = jwt.verify(token, SECRET_KEY)
    // const { email } = jwt.verify(token, SECRET_KEY)
    console.log('email', email)
    const user = await User.findOne({ email: email })
    // const user = await User.findById(_id)
    console.log('user', user)
    if (!user.token) {
      throw new Unauthorized('Not authorized')
    }
    req.user = user
    console.log('req.user', req.user)
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Unauthorized',
    })
  }
}

module.exports = authenticate
