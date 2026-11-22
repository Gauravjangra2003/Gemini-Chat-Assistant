import ReactMarkdown from 'react-markdown'

const markdownComponents = {
  p: (props) => <p className="mb-3 last:mb-0" {...props} />,
  h1: (props) => <h1 className="text-xl font-bold mt-4 mb-2 first:mt-0" {...props} />,
  h2: (props) => <h2 className="text-lg font-bold mt-4 mb-2 first:mt-0" {...props} />,
  h3: (props) => <h3 className="text-base font-semibold mt-3 mb-2 first:mt-0" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 mb-3 space-y-1.5 last:mb-0" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 mb-3 space-y-1.5 last:mb-0" {...props} />,
  li: (props) => <li className="pl-1 marker:text-gray-400" {...props} />,
  strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
  a: (props) => <a className="text-blue-600 underline" target="_blank" rel="noreferrer" {...props} />,
  hr: () => <hr className="my-4 border-gray-200" />,
  blockquote: (props) => <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-600 mb-3" {...props} />,
  pre: (props) => <pre className="bg-gray-900 text-gray-100 text-sm rounded-xl p-4 mb-3 overflow-x-auto last:mb-0" {...props} />,
  code: ({ className, ...props }) =>
    className ? (
      <code className={className} {...props} />
    ) : (
      <code className="bg-gray-200 text-pink-600 text-[0.9em] rounded px-1.5 py-0.5" {...props} />
    ),
}

function Avatar() {
  return (
    <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
      AI
    </div>
  )
}

function Message({ role, text, isError }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[75%] bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 shadow-sm whitespace-pre-wrap break-words">
          {text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div
        className={`max-w-[95%] sm:max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 border ${
          isError ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Avatar />
          <span className="text-sm font-semibold text-gray-800">AI Assistant</span>
        </div>
        {isError ? (
          <p className="text-red-600 text-[15px]">{text}</p>
        ) : (
          <div className="text-gray-700 text-[15px] leading-relaxed break-words">
            <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar />
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
