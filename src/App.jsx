import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'

function App() {
  const [showHistory, setShowHistory] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory((prev) => !prev)}
      />
      <div className="flex-1 min-h-0 flex gap-4 p-4">
        {showHistory && <Sidebar />}
        <ChatArea />
      </div>
    </div>
  )
}

export default App
