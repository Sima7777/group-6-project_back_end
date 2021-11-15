const queryString = require('query-string')
const axios = require('axios')
const { nanoid } = require('nanoid')
const { User } = require('../../models')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONTEND_URL, BASE_URL } = process.env

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  console.log('fullUrl', fullUrl)
  const urlObj = new URL(fullUrl)
  console.log('urlObj', urlObj)
  const urlParams = queryString.parse(urlObj.search)// search " "
  const code = urlParams.code
  console.log('code >>', code)

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
  // console.log('userData >>', userData)

  const { email, picture } = userData.data
  let user = await User.findOne({ email })
  if (!user) {
    const verifyToken = nanoid()
    const password = nanoid(32)
    user = new User({ email, avatarURL: picture, verifyToken })
    user.setPassword(password)
    await user.save()
  }
  await user.update({ token: tokenData.data.access_token, verifyToken: null, verify: true })

  return res.redirect(
    `${FRONTEND_URL}/google-redirect?email=${user.email}`
  )
}

module.exports = googleRedirect
