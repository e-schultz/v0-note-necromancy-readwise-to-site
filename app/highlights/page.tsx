import { allHighlights } from "@/lib/mock-data"
import { HighlightCard } from "@/components/highlight-card"
import { Badge } from "@/components/ui/badge"

export default function HighlightsFeed() {
  const highlights = allHighlights.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())

  // Extract all unique tags
  const allTags = Array.from(new Set(highlights.flatMap((highlight) => highlight.tags || [])))

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Highlights</h1>

      {/* Tags filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {allTags.map((tag) => (
          <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight) => (
          <HighlightCard key={highlight._id} highlight={highlight} />
        ))}
      </div>
    </main>
  )
}
