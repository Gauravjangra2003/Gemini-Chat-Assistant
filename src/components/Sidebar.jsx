function formatChatTime(timestamp) {
  const date = new Date(timestamp)
  const isToday = date.toDateString() === new Date().toDateString()
  return isToday
    ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}

function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat, onClose }) {
  const sortedChats = [...chats].sort((a, b) => b.updatedAt - a.updatedAt)

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/40 md:hidden"
      />
      <aside className="fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-white shadow-xl p-4 flex flex-col md:static md:z-auto md:max-w-none md:shrink-0 md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Chats</h2>
          <button
            onClick={onClose}
            aria-label="Close history"
            className="md:hidden w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <button
          onClick={onNewChat}
          className="mb-4 w-full h-10 rounded-xl border border-dashed border-blue-300 text-blue-600 text-sm font-semibold hover:bg-blue-50 active:scale-[0.98] transition cursor-pointer"
        >
          + New Chat
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1">
          {sortedChats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-6">No chats yet. Start a conversation!</p>
          ) : (
            <ul className="space-y-2">
              {sortedChats.map((chat) => {
                const isActive = chat.id === activeChatId
                return (
                  <li key={chat.id}>
                    <div
                      onClick={() => onSelectChat(chat.id)}
                      className={`group relative rounded-xl px-3 py-2.5 pr-8 cursor-pointer border transition ${
                        isActive
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <p className={`text-sm font-medium line-clamp-2 break-words ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                        {chat.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{formatChatTime(chat.updatedAt)}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteChat(chat.id)
                        }}
                        aria-label="Delete chat"
                        className="absolute top-2 right-2 w-6 h-6 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center text-sm cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
