import resend from "./resend.js"

const sendMeetingEmail = async ({
  email,
  meetingTitle,
  summary,
  actionItems,
}) => {
  await resend.emails.send({
    from: "MeetMind AI <onboarding@resend.dev>",
    to: email,
    subject: `Meeting Summary • ${meetingTitle}`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:30px;max-width:700px;margin:auto">

        <h1>🎙️ MeetMind AI</h1>

        <h2>${meetingTitle}</h2>

        <hr/>

        <h3>Summary</h3>

        <p>${summary}</p>

        <hr/>

        <h3>Action Items</h3>

        <ul>
          ${actionItems.map((item) => `<li>${item}</li>`).join("")}
        </ul>

      </div>
    `,
  })
}

export default sendMeetingEmail
