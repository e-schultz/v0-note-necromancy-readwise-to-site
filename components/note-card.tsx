import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface NoteCardProps {
  note: {
    _id: string
    slug: string
    title: string
    date?: string
    tags?: string[]
    body: {
      raw: string
    }
  }
}

export function NoteCard({ note }: NoteCardProps) {
  // Extract a preview from the raw content (first 120 characters)
  const preview = note.body.raw.substring(0, 120) + (note.body.raw.length > 120 ? "..." : "")

  return (
    <Link href={`/notes/${note.slug}`}>
      <Card className="h-full bg-white/75 dark:bg-gray-900/75 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all border-0 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{note.title}</CardTitle>
          {note.date && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(note.date), "MMM d, yyyy")}</p>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{preview}</p>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {note.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                  {tag}
                </Badge>
              ))}
              {note.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0">
                  +{note.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
