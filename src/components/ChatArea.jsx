import ChatInput from './ChatInput'

function ChatArea() {
  return (
    <main className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto"></div>
      <ChatInput />
    </main>
  )
}

export default ChatArea
