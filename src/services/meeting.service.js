import STATUS_CODES from "../constants/statusCodes.js"
import Meeting from "../models/Meeting.js"
import AppError from "../utils/AppError.js"

import uploadToCloudinary from "../utils/uploadToCloudinary.js"
import { processMeeting } from "./aiPipeline.service.js"

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

  /**
   * Start AI pipeline in background.
   *
   * User doesn't need to wait for:
   * Transcript
   * Summary
   * Action Items
   */
  setImmediate(() => {
    processMeeting(meeting._id)
  })

  return {
    success: true,
    message: "Meeting uploaded successfully.",
    data: meeting,
  }
}

export const getMeetings = async (userId) => {
  const meetings = await Meeting.find({
    createdBy: userId,
  })
    .sort({
      createdAt: -1,
    })
    .select("-transcript -summary")

  return {
    success: true,
    message: "Meetings fetched successfully.",
    data: meetings,
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

export const renameMeeting = async (meetingId, title, userId) => {
  const meeting = await Meeting.findOne({
    _id: meetingId,
    createdBy: userId,
  })

  if (!meeting) {
    throw new AppError("Meeting not found.", STATUS_CODES.NOT_FOUND)
  }

  meeting.title = title

  await meeting.save()

  return {
    success: true,
    message: "Meeting renamed successfully.",
    data: meeting,
  }
}

export const deleteMeeting = async (meetingId, userId) => {
  const meeting = await Meeting.findOne({
    _id: meetingId,
    createdBy: userId,
  })

  if (!meeting) {
    throw new AppError("Meeting not found.", STATUS_CODES.NOT_FOUND)
  }

  await Meeting.findByIdAndDelete(meetingId)

  return {
    success: true,
    message: "Meeting deleted successfully.",
  }
}
