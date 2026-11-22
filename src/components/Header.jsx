function Header({ showHistory, onToggleHistory }) {
  return (
    <header className="h-16 shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
          AI
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Assistant</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleHistory}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 active:scale-95 transition cursor-pointer"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
        <button
          className="px-4 py-2 rounded-lg text-red-500 text-sm font-medium hover:bg-red-50 active:scale-95 transition cursor-pointer"
        >
          Clear All
        </button>
      </div>
    </header>
  )
}

export default Header
