const queryString = require('query-string')
const axios = require('axios')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } = process.env

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  console.log('fullUrl', fullUrl)
  const urlObj = new URL(fullUrl)
  console.log('urlObj', urlObj)
  const urlParams = queryString.parse(urlObj.search)// search " "
  const code = urlParams.code
  console.log('code >>', code)
  const token = await axios({
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

  const user = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${token.data.access_token}`,
    },
  })
  console.log('user >>', user)
  // userData.data.email
  // ...

  return res.redirect(
      `${FRONTEND_URL}?email=${user.data.email}`
  )
//   return res.redirect(
//     `${FRONTEND_URL}/google-redirect?accessToken=${accessToken}&refreshToken=${efreshToken}&sessionId=${sessionId}`
//   )
}

module.exports = googleRedirect
