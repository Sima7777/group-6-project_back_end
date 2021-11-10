const sendSuccessResponse = (res, user, status = 200) => {
  res.status(status).json({
    status: 'success',
    code: status,
    user
  })
}

module.exports = sendSuccessResponse
