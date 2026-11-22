const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-flash-lite-latest'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const TIMEOUT_MS = 30000

export async function generateContent(prompt) {
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
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error(`No response from ${MODEL} after ${TIMEOUT_MS / 1000}s. The model may be overloaded, try again or switch VITE_GEMINI_MODEL.`)
    }
    throw error
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error?.message || `Request failed with status ${response.status}`)
  }

  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('') ?? ''
}
