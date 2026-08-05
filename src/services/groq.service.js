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

export default groq
