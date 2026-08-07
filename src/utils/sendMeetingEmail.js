import resend from "./resend.js"
import meetingEmailTemplate from "../templates/meetingEmailTemplate.js"

const sendMeetingEmail = async ({ to, title, summary, actionItems }) => {
  const html = meetingEmailTemplate({
    title,
    summary,
    actionItems,
  })

  await resend.emails.send({
    from: "MeetMind AI <onboarding@resend.dev>",
    to,
    subject: `Meeting Summary • ${title}`,
    html,
  })
}

export default sendMeetingEmail
