const queryString = require('query-string')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const Session = require('../../models')
const User = require('../../models')

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, BASE_URL, JWT_SECRET, JWT_ACCESS_EXPIRE_TIME, JWT_REFRESH_EXPIRE_TIME } = process.env

const facebookRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  console.log('fullUrl', fullUrl)
  const urlObj = new URL(fullUrl)
  console.log('urlObj', urlObj)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code
  console.log('code >>', code)
  const tokenData = await axios({
    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: FACEBOOK_APP_ID,
      client_secret: FACEBOOK_APP_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/facebook-redirect`,
      code,
    },
  })

  const userData = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['email', 'first_name'].join(','),
      access_token: tokenData.data.access_token,
    },
  })
  console.log('userData >>', userData)

  const existingParent = await User.findOne({ email: userData.data.email })
  if (!existingParent || !existingParent.originUrl) {
    return res.status(404).send({
      message: 'You should register from front-end first (not postman). Google/Facebook  are only for sign-in',
    })
  }

  const newSession = await Session.create({
    uid: existingParent._id,
  })

  const accessToken = jwt.sing(
    { id: existingParent._id, sid: newSession._id },
    JWT_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRE_TIME, }
  )

  const refreshToken = jwt.sing(
    { id: existingParent._id, sid: newSession._id },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRE_TIME, }
  )

  return res.redirect(
      `${existingParent.originUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}&sid=${newSession._id}`
  )
}

module.exports = facebookRedirect
