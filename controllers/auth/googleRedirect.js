const queryString = require('query-string')
const axios = require('axios')
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONTEND_URL, BASE_URL, SECRET_KEY } = process.env

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code

  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  })

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  })

  const { email, picture, id } = userData.data
  let user = await User.findOne({ email })
  if (!user) {
    const verifyToken = nanoid()
    const password = nanoid(32)
    user = new User({ id, email, avatarURL: picture, verifyToken })
    user.setPassword(password)
    await user.save()
  }

  const payload = {
    email,
  }
  const token = jwt.sign(payload, SECRET_KEY)

  await user.update({ token, verifyToken: null, verify: true })

  return res.redirect(
    `${FRONTEND_URL}/google-redirect?email=${user.email}`
  )
}

module.exports = googleRedirect
