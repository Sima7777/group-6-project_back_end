const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const verify = require('./verify')
const repeatEmailVerification = require('./repeatEmailVerification')
const updateBalance = require('./updateBalance')
const googleAuth = require('./googleAuth')
const googleRedirect = require('./googleRedirect')
const facebookAuth = require('./facebookAuth')
const facebookRedirect = require('./facebookRedirect')

module.exports = {
  signup,
  verify,
  login,
  logout,
  current,
  repeatEmailVerification,
  updateBalance,
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect
}
