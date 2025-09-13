interface TerminalQuoteProps {
  quote: string
  author?: string
}

export function TerminalQuote({ quote, author }: TerminalQuoteProps) {
  return (
    <div className="max-w-4xl mx-auto my-12">
      <div className="terminal-window p-6">
        <div className="text-xs text-gray-500 font-mono mb-2">// TRANSMISSION::FRAGMENT</div>
        <blockquote className="text-lg md:text-xl font-mono text-yellow-400 mb-4 matrix-text">"{quote}"</blockquote>
        {author && <cite className="block text-sm text-gray-400 font-mono">— {author}</cite>}
        <div className="text-xs text-gray-600 font-mono mt-2">▒▒▒ END_TRANSMISSION ▒▒▒</div>
      </div>
    </div>
  )
}
