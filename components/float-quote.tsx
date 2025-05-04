interface FloatQuoteProps {
  quote: string
  author?: string
}

export function FloatQuote({ quote, author }: FloatQuoteProps) {
  return (
    <div className="max-w-4xl mx-auto my-12 px-6 py-8 bg-gradient-to-r from-purple-100/80 to-cyan-100/80 dark:from-purple-900/20 dark:to-cyan-900/20 backdrop-blur-sm rounded-2xl shadow-lg text-center">
      <blockquote className="text-xl md:text-2xl italic font-medium text-gray-800 dark:text-gray-200">
        "{quote}"
      </blockquote>
      {author && <cite className="block mt-4 text-gray-600 dark:text-gray-400">— {author}</cite>}
    </div>
  )
}
