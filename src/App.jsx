import { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { generateContent } from './services/gemini'
import { loadChats, saveChats } from './utils/chatStorage'

const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

function App() {
  const [showHistory, setShowHistory] = useState(isDesktop)
  const [chats, setChats] = useState(loadChats)
  const [activeChatId, setActiveChatId] = useState(null)
  const [pendingChatId, setPendingChatId] = useState(null)

  useEffect(() => {
    saveChats(chats)
  }, [chats])

  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const messages = activeChat?.messages ?? []

  const addMessage = (chatId, message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message], updatedAt: Date.now() }
          : chat
      )
    )
  }

  const handleSend = async (prompt) => {
    const userMessage = { id: crypto.randomUUID(), role: 'user', text: prompt }
    let chatId = activeChatId

    if (activeChat) {
      addMessage(chatId, userMessage)
    } else {
      chatId = crypto.randomUUID()
      const now = Date.now()
      setChats((prev) => [
        { id: chatId, title: prompt, createdAt: now, updatedAt: now, messages: [userMessage] },
        ...prev,
      ])
      setActiveChatId(chatId)
    }

    setPendingChatId(chatId)

    let reply
    try {
      reply = { text: await generateContent(prompt) }
    } catch (error) {
      console.error('Gemini error:', error.message)
      reply = { text: error.message, isError: true }
    }

    addMessage(chatId, { id: crypto.randomUUID(), role: 'assistant', ...reply })
    setPendingChatId((prev) => (prev === chatId ? null : prev))
  }

  const closeHistoryOnMobile = () => {
    if (!isDesktop()) setShowHistory(false)
  }

  const handleNewChat = () => {
    setActiveChatId(null)
    closeHistoryOnMobile()
  }

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId)
    closeHistoryOnMobile()
  }

  const handleDeleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId))
    if (chatId === activeChatId) setActiveChatId(null)
    if (chatId === pendingChatId) setPendingChatId(null)
  }

  const handleClearAll = () => {
    if (!window.confirm('Delete all chats? This cannot be undone.')) return
    setChats([])
    setActiveChatId(null)
    setPendingChatId(null)
  }

  return (
    <div className="h-dvh flex flex-col bg-gray-100">
      <Header
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory((prev) => !prev)}
        onClearAll={handleClearAll}
        canClear={chats.length > 0}
      />
      <div className="flex-1 min-h-0 flex gap-4 p-2 sm:p-4">
        {showHistory && (
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
            onClose={() => setShowHistory(false)}
          />
        )}
        <ChatArea
          messages={messages}
          loading={pendingChatId !== null && pendingChatId === activeChatId}
          disabled={pendingChatId !== null}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}

export default App
