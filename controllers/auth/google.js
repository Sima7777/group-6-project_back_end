// const { OAuth2Client } = require('google-auth-library')
// const jwt = require('jsonwebtoken')
// const { nanoid } = require('nanoid')
// const { User } = require('../../models')
// const userDto = require('../../dtos/user')
// const addBasicCategories = require('../category/addBasicCategories')
// const addBasicWallet = require('../wallet/addBasicWallet')
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

// const googleAuth = async (tokenId) => {
//   const client = new OAuth2Client(GOOGLE_CLIENT_ID)
//   const ticket = await client.verifyIdToken({
//     idToken: tokenId,
//     audience: GOOGLE_CLIENT_ID
//   })
//   const { email } = ticket.getPayload()
//   let user = await User.findOne({ email })
//   if (!user) {
//     const password = nanoid(32)
//     user = new User({ email })
//     user.setPassword(password)
//     await user.save()
//     await addBasicCategories(user.id)
//     await addBasicWallet(user.id)
//   }
//   const userData = userDto(user)
//   const token = jwt.sign(userData, GOOGLE_CLIENT_SECRET)
//   user.accessToken = token
//   await user.save()
//   return {
//     user: userData,
//     token
//   }
// }
// module.exports = googleAuth
