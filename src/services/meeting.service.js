import STATUS_CODES from "../constants/statusCodes.js"
import AppError from "../utils/AppError.js"
import Meeting from "../models/Meeting.js"

export const uploadMeeting = async (file, body, userId) => {
  if (!file) {
    throw new AppError("Audio file is required.", STATUS_CODES.BAD_REQUEST)
  }

  const meeting = await Meeting.create({
    title: "Untitled Meeting",
    audioUrl: file.filename,
    duration: Number(body.duration),
    createdBy: userId,
  })

  if (!meeting) {
    throw new AppError(
      "Failed to create meeting.",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
    )
  }

  return {
    success: true,
    message: "Meeting uploaded successfully.",
    data: meeting,
  }
}
