const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const verify = require('./verify')
const resendVerification = require('./resendVerification')
const googleAuth = require('./googleAuth')
const googleRedirect = require('./googleRedirect')
const setBalance = require('./setBalance')
const avatars = require('./avatars')
const googleUser = require('./googleUser')
// const google = require('./google')

module.exports = {
  signup,
  verify,
  login,
  logout,
  current,
  resendVerification,
  googleAuth,
  googleRedirect,
  setBalance,
  avatars,
  googleUser,
  // google
}
