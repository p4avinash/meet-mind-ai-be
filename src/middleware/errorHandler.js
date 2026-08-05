import STATUS_CODES from "../constants/statusCodes.js"

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR

  res.status(statusCode).json({
    success: false,
    message: error.message,
  })
}

export default errorHandler
