const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const verify = require('./verify')
const repeatEmailVerification = require('./repeatEmailVerification')

const googleAuth = require('./googleAuth')
const googleRedirect = require('./googleRedirect')
const facebookAuth = require('./facebookAuth')
const facebookRedirect = require('./facebookRedirect')
const setBalance = require('./setBalance')


module.exports = {
  signup,
  verify,
  login,
  logout,
  current,
  repeatEmailVerification,
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect,
  setBalance
}
