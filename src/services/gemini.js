const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-flash-lite-latest'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const TIMEOUT_MS = 30000
const SUGGESTIONS_TIMEOUT_MS = 10000

async function callGemini(body, timeoutMs = TIMEOUT_MS) {
  if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY is missing. Add it to your .env file and restart the dev server.')
  }

  let response
  try {
    response = await fetch(`${BASE_URL}/${MODEL}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': API_KEY,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    })
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error(`No response from ${MODEL} after ${timeoutMs / 1000}s. The model may be overloaded, try again or switch VITE_GEMINI_MODEL.`, { cause: error })
    }
    throw error
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error?.message || `Request failed with status ${response.status}`)
  }

  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('') ?? ''
}

export function generateContent(prompt) {
  return callGemini({
    contents: [{ parts: [{ text: prompt }] }],
  })
}

export async function generateSuggestions(count = 4) {
  const prompt = `Suggest ${count} short, diverse and interesting questions a user could ask an AI assistant.
Mix topics like technology, programming, science, health, productivity, career and everyday life.
Each question must be under 60 characters. Random seed: ${Math.random()}`

  const text = await callGemini(
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1.2,
        responseMimeType: 'application/json',
        responseSchema: { type: 'ARRAY', items: { type: 'STRING' } },
      },
    },
    SUGGESTIONS_TIMEOUT_MS
  )

  const questions = JSON.parse(text)
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Gemini returned no suggestions')
  }
  return questions.slice(0, count)
}
