import STATUS_CODES from "../constants/statusCodes.js"
import Meeting from "../models/Meeting.js"
import AppError from "../utils/AppError.js"

import uploadToCloudinary from "../utils/uploadToCloudinary.js"

export const uploadMeeting = async (file, body, userId) => {
  if (!file) {
    throw new AppError("Audio file is required.", STATUS_CODES.BAD_REQUEST)
  }

  const uploadedFile = await uploadToCloudinary(file.buffer)

  const meeting = await Meeting.create({
    title: "Untitled Meeting",
    audioUrl: uploadedFile.secure_url,
    cloudinaryId: uploadedFile.public_id,
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

export const getMeetingById = async (meetingId, userId) => {
  const meeting = await Meeting.findOne({
    _id: meetingId,
    createdBy: userId,
  })

  if (!meeting) {
    throw new AppError("Meeting not found.", STATUS_CODES.NOT_FOUND)
  }

  return {
    success: true,
    data: meeting,
  }
}
