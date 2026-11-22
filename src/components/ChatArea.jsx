import { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import Message, { TypingIndicator } from './Message'
import { generateContent } from '../services/gemini'

function ChatArea() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (prompt) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text: prompt }])
    setLoading(true)
    try {
      const answer = await generateContent(prompt)
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', text: answer }])
    } catch (error) {
      console.error('Gemini error:', error.message)
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', text: error.message, isError: true },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && !loading ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md mb-4">
              AI
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">How can I help you today?</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Ask me anything to get started.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
            {messages.map((message) => (
              <Message key={message.id} {...message} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} loading={loading} />
    </main>
  )
}

export default ChatArea
