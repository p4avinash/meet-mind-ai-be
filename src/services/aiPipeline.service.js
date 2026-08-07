import Meeting from "../models/Meeting.js"
import sendMeetingEmail from "../utils/sendMeetingEmail.js"

import {
  generateTranscript,
  generateSummary,
  generateActionItems,
} from "./ai.service.js"

export const processMeeting = async (meetingId) => {
  try {
    const meeting = await Meeting.findById(meetingId).populate("createdBy")

    if (!meeting) return

    /**
     * STEP 1
     */

    meeting.status = "transcribing"
    await meeting.save()

    const transcript = await generateTranscript(meeting.audioUrl)

    meeting.transcript = transcript

    await meeting.save()

    /**
     * STEP 2
     */

    meeting.status = "summarizing"
    await meeting.save()

    const summary = await generateSummary(transcript)

    meeting.summary = summary

    await meeting.save()

    /**
     * STEP 3
     */

    meeting.status = "generating_action_items"
    await meeting.save()

    const actionItems = await generateActionItems(transcript)

    meeting.actionItems = actionItems

    await meeting.save()

    /**
     * STEP 4
     */

    meeting.status = "sending_email"
    await meeting.save()

    await sendMeetingEmail({
      to: meeting.deliveryEmail || meeting.createdBy.email,
      title: meeting.title,
      summary: meeting.summary,
      actionItems: meeting.actionItems,
    })

    meeting.status = "completed"
    await meeting.save()
  } catch (error) {
    console.error("============== ERROR ==============")
    console.error(error)
    console.error(error.stack)
    console.error("===================================")

    await Meeting.findByIdAndUpdate(meetingId, {
      status: "failed",
    })
  }
}
