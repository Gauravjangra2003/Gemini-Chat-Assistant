import { UserButton } from '@clerk/react'

function Header({ showHistory, onToggleHistory, onClearAll, canClear }) {
  return (
    <header className="h-14 sm:h-16 shrink-0 bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
          AI
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate">AI Assistant</h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          onClick={onToggleHistory}
          className="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 active:scale-95 transition cursor-pointer"
        >
          <span className="sm:hidden">History</span>
          <span className="hidden sm:inline">{showHistory ? 'Hide History' : 'Show History'}</span>
        </button>
        <button
          onClick={onClearAll}
          disabled={!canClear}
          className="px-3 sm:px-4 py-2 rounded-lg text-red-500 text-sm font-medium hover:bg-red-50 active:scale-95 transition cursor-pointer disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <span className="sm:hidden">Clear</span>
          <span className="hidden sm:inline">Clear All</span>
        </button>
        <div className="ml-1 sm:ml-2 flex items-center">
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default Header
