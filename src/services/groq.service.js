import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export const transcribeAudio = async (audioUrl) => {
  const transcription = await groq.audio.transcriptions.create({
    url: audioUrl,
    model: "whisper-large-v3-turbo",
    response_format: "verbose_json",
  })

  return transcription.text
}

export const generateSummary = async (transcript) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an AI meeting assistant.

Generate a concise meeting summary.

Rules:
- Keep it under 200 words.
- Use bullet points.
- Focus only on important discussions.
- Ignore greetings and filler words.
- Return plain text only.
`,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  })

  return response.choices[0].message.content
}

export const generateActionItems = async (transcript) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an AI meeting assistant.

Extract only actionable tasks from the meeting transcript.

Rules:
- Return ONLY a valid JSON array.
- Every item must be a short action item.
- Ignore greetings and discussions.
- Do not explain anything.

Example:

[
  "Deploy backend",
  "Fix authentication bug",
  "Schedule next sprint meeting"
]
`,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  })

  return JSON.parse(response.choices[0].message.content)
}

export default groq
