import { useCallback, useEffect, useState } from 'react'
import { generateSuggestions } from '../services/gemini'

const COUNT = 4

const FALLBACK_QUESTIONS = [
  'What is React and why is it popular?',
  'How can I improve my focus while studying?',
  'Explain AI in simple terms',
  'What are good habits for a healthy morning?',
  'How does the internet actually work?',
  'Tips to crack a frontend developer interview',
  'What is the difference between let and const?',
  'How do I start learning Python?',
  'Why is the sky blue?',
  'How can I manage my time better?',
  'What is machine learning in simple words?',
  'How to stay motivated while learning to code?',
]

const pickRandom = (list, count) => [...list].sort(() => Math.random() - 0.5).slice(0, count)

let cachedQuestions = null
let pendingRequest = null

async function loadQuestions() {
  let result
  try {
    result = await generateSuggestions(COUNT)
  } catch (error) {
    console.warn('Using fallback suggestions:', error.message)
    result = pickRandom(FALLBACK_QUESTIONS, COUNT)
  }
  cachedQuestions = result
  pendingRequest = null
  return result
}

function SuggestedQuestions({ onSelect, disabled }) {
  const [questions, setQuestions] = useState(cachedQuestions)
  const [loading, setLoading] = useState(!cachedQuestions)

  const applyRequest = useCallback((request) => {
    let ignore = false
    request.then((result) => {
      if (ignore) return
      setQuestions(result)
      setLoading(false)
    })
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    if (cachedQuestions) return
    pendingRequest ??= loadQuestions()
    return applyRequest(pendingRequest)
  }, [applyRequest])

  const handleRefresh = () => {
    setLoading(true)
    pendingRequest = loadQuestions()
    applyRequest(pendingRequest)
  }

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Suggested questions</p>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
        >
          <span className={loading ? 'animate-spin' : ''}>↻</span>
          New suggestions
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {loading
          ? Array.from({ length: COUNT }, (_, i) => (
              <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
            ))
          : questions.map((question) => (
              <button
                key={question}
                onClick={() => onSelect(question)}
                disabled={disabled}
                className="group text-left rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-between gap-2"
              >
                <span>{question}</span>
                <span className="text-gray-300 group-hover:text-blue-500 transition shrink-0">→</span>
              </button>
            ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
