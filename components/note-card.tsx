import Link from "next/link"
import { format } from "date-fns"
import { FileText } from "lucide-react"

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
      <div className="float-element p-4 hover:border-cyan-500/50 transition-all group h-full">
        <div className="flex items-start gap-3 mb-3">
          <FileText className="w-5 h-5 text-purple-400 mt-1 group-hover:text-cyan-400 transition-colors" />
          <div className="flex-1">
            <h3 className="text-lg font-bold font-mono text-green-400 group-hover:neon-green transition-all">
              {note.title}
            </h3>
            {note.date && (
              <p className="text-xs text-gray-500 font-mono">{format(new Date(note.date), "yyyy.MM.dd")}</p>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 font-mono mb-2">// preview::</div>
        <p className="text-sm text-gray-300 font-mono mb-4 leading-relaxed">{preview}</p>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs px-2 py-1 border border-gray-500/30 bg-gray-500/10 text-gray-400 font-mono">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
