import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon } from "lucide-react"

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
    <Card
      className={`
      bg-white/75 dark:bg-gray-900/75 backdrop-blur-md 
      rounded-2xl shadow-lg border-0
      ${compact ? "p-3" : "p-5"}
    `}
    >
      <CardContent className={compact ? "p-0" : "p-0 pt-2"}>
        <blockquote
          className={`
          italic text-gray-700 dark:text-gray-300 border-l-4 border-cyan-400 pl-4
          ${compact ? "text-sm" : "text-base"}
        `}
        >
          {highlight.excerpt}
        </blockquote>

        <div className="flex justify-between items-center mt-4">
          <div>{highlight.author && <p className="text-sm font-medium">{highlight.author}</p>}</div>

          {highlight.source && (
            <a
              href={highlight.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 inline-flex items-center text-sm"
            >
              Source <ExternalLinkIcon className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>

        {highlight.tags && highlight.tags.length > 0 && !compact && (
          <div className="flex flex-wrap gap-1 mt-3">
            {highlight.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
