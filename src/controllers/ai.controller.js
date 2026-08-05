import STATUS_CODES from "../constants/statusCodes.js"

import Meeting from "../models/Meeting.js"

import groq, { transcribeAudio } from "../services/groq.service.js"

export const testGroq = async (_, res, next) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: "Reply with only one word: Connected",
        },
      ],
    })

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: response.choices[0].message.content,
    })
  } catch (error) {
    next(error)
  }
}

export const transcribeMeeting = async (req, res, next) => {
  try {
    const { id } = req.params

    const meeting = await Meeting.findById(id)

    if (!meeting) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Meeting not found.",
      })
    }

    meeting.status = "transcribing"
    await meeting.save()

    const transcript = await transcribeAudio(meeting.audioUrl)

    meeting.transcript = transcript
    meeting.status = "transcribed"
    meeting.transcriptGeneratedAt = new Date()

    await meeting.save()

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Transcript generated successfully.",
      data: meeting,
    })
  } catch (error) {
    next(error)
  }
}
