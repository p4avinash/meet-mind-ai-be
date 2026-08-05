import STATUS_CODES from "../constants/statusCodes.js"

import { uploadMeeting } from "../services/meeting.service.js"

export const upload = async (req, res, next) => {
  try {
    const response = await uploadMeeting(req.file, req.body, req.user.id)

    res.status(STATUS_CODES.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}
