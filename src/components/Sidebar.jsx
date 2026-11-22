function Sidebar({ onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-30 bg-black/40 md:hidden"
      />
      <aside className="fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-white shadow-xl p-4 overflow-y-auto md:static md:z-auto md:max-w-none md:shrink-0 md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider">Recent Chats</h2>
          <button
            onClick={onClose}
            aria-label="Close history"
            className="md:hidden w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-400">No history yet</p>
      </aside>
    </>
  )
}

export default Sidebar
