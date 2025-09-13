import { ExternalLinkIcon, Quote } from "lucide-react"

interface HighlightCardProps {
  highlight: {
    _id: string
    excerpt: string
    source: string
    author?: string
    tags?: string[]
    date?: string
  }
  compact?: boolean
}

export function HighlightCard({ highlight, compact = false }: HighlightCardProps) {
  return (
    <div className={`float-element ${compact ? "p-3" : "p-4"} hover:border-cyan-500/50 transition-all`}>
      <div className="flex items-start gap-3 mb-3">
        <Quote className="w-4 h-4 text-cyan-400 mt-1" />
        <div className="text-xs text-gray-500 font-mono">signal::fragment</div>
      </div>

      <blockquote className={`font-mono text-cyan-300 mb-4 leading-relaxed ${compact ? "text-sm" : "text-base"}`}>
        {highlight.excerpt}
      </blockquote>

      <div className="flex justify-between items-center">
        <div>{highlight.author && <p className="text-sm font-mono text-purple-400">— {highlight.author}</p>}</div>

        {highlight.source && (
          <a
            href={highlight.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:neon-green inline-flex items-center text-xs font-mono transition-all"
          >
            source <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </a>
        )}
      </div>

      {highlight.tags && highlight.tags.length > 0 && !compact && (
        <div className="flex flex-wrap gap-1 mt-3">
          {highlight.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
