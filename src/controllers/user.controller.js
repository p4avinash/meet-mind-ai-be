import STATUS_CODES from "../constants/statusCodes.js"

import {
  getUserSettings,
  updateUserSettings,
} from "../services/user.service.js"

export const getSettings = async (req, res, next) => {
  try {
    const response = await getUserSettings(req.user.id)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const updateSettings = async (req, res, next) => {
  try {
    const response = await updateUserSettings(req.user.id, req.body)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}
