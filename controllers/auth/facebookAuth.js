const queryString = require('query-string')

const { FACEBOOK_APP_ID, BASE_URL } = process.env

const facebookAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: FACEBOOK_APP_ID,
    redirect_uri: `${BASE_URL}/api/auth/facebook-redirect`,
    scope: 'email',
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  })
  console.log('stringifiedParams', stringifiedParams)
  return res.redirect(
    `https://facebook.com/v4.0/dialog/oauth?${stringifiedParams}`
  )
}

module.exports = facebookAuth
