import Meeting from "../models/Meeting.js"

import {
  generateTranscript,
  generateSummary,
  generateActionItems,
} from "./ai.service.js"

export const processMeeting = async (meetingId) => {
  try {
    const meeting = await Meeting.findById(meetingId)

    if (!meeting) return

    /**
     * STEP 1
     * Generate Transcript
     */

    meeting.status = "transcribing"
    await meeting.save()

    const transcript = await generateTranscript(meeting.audioUrl)

    meeting.transcript = transcript

    /**
     * STEP 2
     * Generate Summary
     */

    meeting.status = "summarizing"
    await meeting.save()

    const summary = await generateSummary(transcript)

    meeting.summary = summary

    /**
     * STEP 3
     * Generate Action Items
     */

    meeting.status = "generating_action_items"
    await meeting.save()

    const actionItems = await generateActionItems(transcript)

    meeting.actionItems = actionItems

    /**
     * DONE
     */

    /**
     * STEP 4
     * Email (coming next sprint)
     */

    meeting.status = "sending_email"
    await meeting.save()

    /**
     * Simulate email sending for now.
     */

    meeting.status = "completed"
    await meeting.save()
  } catch (error) {
    console.error(error)

    await Meeting.findByIdAndUpdate(meetingId, {
      status: "failed",
    })
  }
}
