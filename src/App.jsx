import { useRef, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { generateContent } from './services/gemini'

function App() {
  const [showHistory, setShowHistory] = useState(
    () => window.matchMedia('(min-width: 768px)').matches
  )
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const chatIdRef = useRef(0)

  const handleSend = async (prompt) => {
    const chatId = chatIdRef.current
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text: prompt }])
    setLoading(true)

    let reply
    try {
      reply = { text: await generateContent(prompt) }
    } catch (error) {
      console.error('Gemini error:', error.message)
      reply = { text: error.message, isError: true }
    }

    // Ignore replies that arrive after the chat was cleared.
    if (chatId !== chatIdRef.current) return

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', ...reply }])
    setLoading(false)
  }

  const handleClearAll = () => {
    chatIdRef.current += 1
    setMessages([])
    setLoading(false)
  }

  return (
    <div className="h-dvh flex flex-col bg-gray-100">
      <Header
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory((prev) => !prev)}
        onClearAll={handleClearAll}
        canClear={messages.length > 0 || loading}
      />
      <div className="flex-1 min-h-0 flex gap-4 p-2 sm:p-4">
        {showHistory && <Sidebar onClose={() => setShowHistory(false)} />}
        <ChatArea messages={messages} loading={loading} onSend={handleSend} />
      </div>
    </div>
  )
}

export default App
