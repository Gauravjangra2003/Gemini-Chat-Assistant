function ChatInput() {
  return (
    <div className="px-2 pb-2 pt-2 sm:px-8 sm:pb-8 sm:pt-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
        <input
          className="flex-1 min-w-0 h-11 sm:h-12 px-3 sm:px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 text-base text-left outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
          type="text"
          placeholder="Type your question here..."
        />
        <button className="h-11 sm:h-12 px-4 sm:px-7 shrink-0 rounded-xl bg-blue-600 text-white font-semibold text-base shadow-md hover:bg-blue-700 active:scale-95 transition cursor-pointer">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatInput
