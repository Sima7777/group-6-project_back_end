const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const verify = require('./verify')
const resendVerification = require('./resendVerification')
const googleAuth = require('./googleAuth')
const googleRedirect = require('./googleRedirect')
const facebookAuth = require('./facebookAuth')
const facebookRedirect = require('./facebookRedirect')
const setBalance = require('./setBalance')
const avatars = require('./avatars')

module.exports = {
  signup,
  verify,
  login,
  logout,
  current,
  resendVerification,
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect,
  setBalance,
  avatars
}
