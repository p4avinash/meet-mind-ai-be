import User from "../models/User.js"
import AppError from "../utils/AppError.js"
import STATUS_CODES from "../constants/statusCodes.js"

export const getUserSettings = async (userId) => {
  const user = await User.findById(userId).select(
    "name email defaultDeliveryEmail",
  )

  if (!user) {
    throw new AppError("User not found.", STATUS_CODES.NOT_FOUND)
  }

  return {
    success: true,
    data: user,
  }
}

export const updateUserSettings = async (userId, body) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new AppError("User not found.", STATUS_CODES.NOT_FOUND)
  }

  user.defaultDeliveryEmail = body.defaultDeliveryEmail

  await user.save()

  return {
    success: true,
    message: "Settings updated successfully.",
    data: user,
  }
}
