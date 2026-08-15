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
/**
 * Generate Summary
 */
/**
 * Generate Meeting Title + Summary
 */
export const generateSummary = async (transcript) => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `
You are an expert AI meeting assistant.

Analyze the meeting transcript.

Return ONLY valid JSON.

Example:

{
  "title": "React Performance Review",
  "summary": "The team discussed React performance optimizations, lazy loading, memoization, and agreed on implementation tasks."
}

Rules:

- Title should be between 3 and 7 words.
- Make it descriptive.
- Never use generic titles like:
  - Meeting
  - Discussion
  - Conversation
  - Meeting Notes
- Summary should be concise (3–6 sentences).
- Return ONLY valid JSON.
`,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
  })

  const content = response.choices[0].message.content

  try {
    return JSON.parse(content)
  } catch (error) {
    console.error("Failed to parse summary JSON:", content)

    return {
      title: "Meeting Summary",
      summary: content,
    }
  }
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
