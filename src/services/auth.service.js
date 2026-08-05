import User from "../models/User.js"
import AppError from "../utils/AppError.js"
import hashPassword from "../utils/hashPassword.js"
import comparePassword from "../utils/comparePassword.js"
import generateJWT from "../utils/generateJWT.js"

import MESSAGES from "../constants/messages.js"
import STATUS_CODES from "../constants/statusCodes.js"

export const registerUser = async ({ name, email, password }) => {
  // check for the existing user
  const existingUser = await User.findOne({ email })

  // throw error if user already exists
  if (existingUser) {
    throw new AppError(MESSAGES.USER_ALREADY_EXISTS, STATUS_CODES.CONFLICT)
  }

  // hash password
  const hashedPassword = await hashPassword(password)

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // create token
  const token = generateJWT(user._id)

  // send response
  return {
    token,
    user: {
      id: user?._id,
      name: user?.name,
      email: user?.email,
    },
  }
}

export const loginUser = async ({ email, password }) => {
  // find user
  const user = await User.findOne({ email })

  // throw error if user not found
  if (!user) {
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED)
  }

  // check if password is correct
  const isPasswordMatched = await comparePassword(password, user.password)

  // throw error if password doesn't match
  if (!isPasswordMatched) {
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED)
  }

  // create token
  const token = generateJWT(user._id)

  // return the response
  return {
    token,

    user: {
      id: user?._id,
      name: user?.name,
      email: user?.email,
    },
  }
}

export const getCurrentUser = async (userId) => {
  // find user
  const user = await User.findById(userId)

  // throw error if user not found
  if (!user) {
    throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND)
  }

  // return response
  return {
    user: {
      id: user?._id,
      name: user?.name,
      email: user?.email,
    },
  }
}
