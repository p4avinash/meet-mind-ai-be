import jwt from "jsonwebtoken"

import User from "../models/User.js"

import AppError from "../utils/AppError.js"

import STATUS_CODES from "../constants/statusCodes.js"
import MESSAGES from "../constants/messages.js"

const auth = async (req, res, next) => {
  // get header
  const authHeader = req.headers.authorization

  // check if header is there, if not throw error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED))
  }

  // takeout token
  const token = authHeader.split(" ")[1]

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // find user by id
    const user = await User.findById(decoded.id)

    // throw error if user not found
    if (!user) {
      return next(new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND))
    }

    // attach user to the request
    req.user = user

    next()
  } catch (error) {
    return next(new AppError(MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED))
  }
}

export default auth
