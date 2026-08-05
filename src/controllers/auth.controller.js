import {
  registerUser,
  loginUser,
  getCurrentUser as getCurrentUserService,
} from "../services/auth.service.js"

import STATUS_CODES from "../constants/statusCodes.js"

export const register = async (req, res, next) => {
  try {
    const response = await registerUser(req.body)

    res.status(STATUS_CODES.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const response = await loginUser(req.body)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    const response = await getCurrentUserService(req.user.id)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res) => {
  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Logout successful.",
  })
}
