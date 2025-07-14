import { allNotes } from "@/lib/mock-data"
import { NoteCard } from "@/components/note-card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notes & Doctrine | FLOAT Learning Culture",
  description:
    "Explore notes on memory, ritual, and learning culture. Concepts that resonate as embodied heuristics and ritual practices.",
  openGraph: {
    title: "Notes & Doctrine | FLOAT Learning Culture",
    description:
      "Explore notes on memory, ritual, and learning culture. Concepts that resonate as embodied heuristics and ritual practices.",
    url: "https://v0-v0-note-necromancy-readwise.vercel.app/notes",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes & Doctrine | FLOAT Learning Culture",
    description:
      "Explore notes on memory, ritual, and learning culture. Concepts that resonate as embodied heuristics and ritual practices.",
    images: ["/og-image.png"],
  },
}

export default function NoteIndex() {
  // Get all published notes
  const notes = allNotes
    .filter((note) => note.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Extract all unique tags
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags || [])))

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Notes & Doctrine</h1>

      {/* Tags filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {allTags.map((tag) => (
          <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </main>
  )
}
