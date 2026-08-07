import STATUS_CODES from "../constants/statusCodes.js"

import {
  uploadMeeting,
  getMeetingById,
  getMeetings,
  renameMeeting,
  getMeetingStats,
} from "../services/meeting.service.js"

export const upload = async (req, res, next) => {
  try {
    const response = await uploadMeeting(req.file, req.body, req.user.id)

    res.status(STATUS_CODES.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

export const getById = async (req, res, next) => {
  try {
    const response = await getMeetingById(req.params.id, req.user.id)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllMeetings = async (req, res, next) => {
  try {
    const response = await getMeetings(req.user.id)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const rename = async (req, res, next) => {
  try {
    const response = await renameMeeting(
      req.params.id,
      req.body.title,
      req.user.id,
    )

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

import { deleteMeeting } from "../services/meeting.service.js"

export const remove = async (req, res, next) => {
  try {
    const response = await deleteMeeting(req.params.id, req.user.id)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const stats = async (req, res, next) => {
  try {
    const response = await getMeetingStats(req.user.id)

    res.status(STATUS_CODES.OK).json(response)
  } catch (error) {
    next(error)
  }
}
