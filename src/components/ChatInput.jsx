import { useState } from 'react'
import { generateContent } from '../services/gemini'

function ChatInput() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const prompt = question.trim()
    if (!prompt || loading) return

    setLoading(true)
    console.log('Question:', prompt)
    try {
      const answer = await generateContent(prompt)
      console.log('Gemini answer:', answer)
      setQuestion('')
    } catch (error) {
      console.error('Gemini error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-2 pb-2 pt-2 sm:px-8 sm:pb-8 sm:pt-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
      >
        <input
          className="flex-1 min-w-0 h-11 sm:h-12 px-3 sm:px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 text-base text-left outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="h-11 sm:h-12 px-4 sm:px-7 shrink-0 rounded-xl bg-blue-600 text-white font-semibold text-base shadow-md hover:bg-blue-700 active:scale-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default ChatInput
