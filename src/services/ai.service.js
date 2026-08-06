import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

/**
 * Generate Transcript
 */
export const generateTranscript = async (audioUrl) => {
  const transcription = await groq.audio.transcriptions.create({
    url: audioUrl,
    model: "whisper-large-v3-turbo",
    response_format: "verbose_json",
  })

  return transcription.text
}

/**
 * Generate Summary
 */
export const generateSummary = async (transcript) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an AI meeting assistant. Generate a concise meeting summary.",
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  })

  return response.choices[0].message.content
}

/**
 * Generate Action Items
 */
export const generateActionItems = async (transcript) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
Extract action items from this meeting transcript.

Return ONLY a valid JSON array.

Example:

[
  "Prepare API documentation",
  "Fix login bug",
  "Deploy frontend"
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
