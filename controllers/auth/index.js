const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const verify = require('./verify')
const resendVerification = require('./resendVerification')
const setBalance = require('./setBalance')

module.exports = {
  signup,
  verify,
  login,
  logout,
  current,
  resendVerification,
  setBalance
}
