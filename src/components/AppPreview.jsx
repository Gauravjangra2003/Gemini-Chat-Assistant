function AppPreview() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-md select-none">
      <div className="absolute -inset-6 bg-white/10 blur-3xl rounded-full" />

      <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-white/30 overflow-hidden -rotate-2 transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 h-4 rounded-md bg-white text-[8px] text-gray-400 flex items-center px-2">
            localhost:5173
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[6px] font-bold flex items-center justify-center">
              AI
            </div>
            <span className="text-[9px] font-bold text-gray-900">AI Assistant</span>
          </div>
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
        </div>

        <div className="flex h-52 bg-gray-50 p-2 gap-2">
          <div className="w-1/3 rounded-lg bg-white border border-gray-200 p-2 space-y-1.5">
            <p className="text-[8px] font-bold text-gray-900">Recent Chats</p>
            <div className="h-4 rounded border border-dashed border-blue-300 text-[6px] text-blue-600 font-semibold flex items-center justify-center">
              + New Chat
            </div>
            <div className="rounded bg-blue-50 border border-blue-200 px-1.5 py-1">
              <p className="text-[7px] text-blue-700 font-medium leading-tight">What is React?</p>
            </div>
            <div className="rounded bg-gray-50 px-1.5 py-1">
              <p className="text-[7px] text-gray-700 leading-tight">Morning habits</p>
            </div>
            <div className="rounded bg-gray-50 px-1.5 py-1">
              <p className="text-[7px] text-gray-700 leading-tight">Learn Python</p>
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-white border border-gray-200 p-2 flex flex-col">
            <div className="flex-1 space-y-2">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white text-[7px] rounded-lg rounded-br-sm px-2 py-1">
                  What is React?
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg rounded-bl-sm p-1.5 max-w-[90%]">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white text-[4px] font-bold flex items-center justify-center">
                    AI
                  </div>
                  <span className="text-[6px] font-semibold text-gray-800">AI Assistant</span>
                </div>
                <p className="text-[6.5px] text-gray-600 leading-snug">
                  React is a JavaScript library for building fast, interactive user interfaces with reusable components.
                </p>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white text-[7px] rounded-lg rounded-br-sm px-2 py-1">
                  Show me an example
                </div>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 w-fit">
                <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" />
              </div>
            </div>
            <div className="flex gap-1 mt-1">
              <div className="flex-1 h-4 rounded border border-gray-300 bg-gray-50 text-[6px] text-gray-400 flex items-center px-1.5">
                Type your question here...
              </div>
              <div className="h-4 px-2 rounded bg-blue-600 text-white text-[6px] font-semibold flex items-center">
                Send
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -right-3 rounded-full bg-white text-blue-700 text-xs font-semibold px-3 py-1.5 shadow-lg flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Powered by Gemini
      </div>
      <div className="absolute -bottom-3 -left-3 rounded-full bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 shadow-lg flex items-center gap-1.5">
        <span className="text-blue-600">✓</span>
        History saved
      </div>
    </div>
  )
}

export default AppPreview
