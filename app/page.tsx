import { allNotes, allHighlights } from "@/lib/mock-data"
import { NoteCard } from "@/components/note-card"
import { HighlightCard } from "@/components/highlight-card"
import { FloatQuote } from "@/components/float-quote"

export default function Landing() {
  // Get the latest 3 notes
  const latestNotes = allNotes
    .filter((note) => note.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  // Get the latest 4 highlights
  const latestHighlights = allHighlights
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            FLOAT Learning Culture
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            Memory, ritual, and curation—reframed as floating practice
          </p>
          <a
            href="/notes"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Browse Doctrine
          </a>
        </div>
      </section>

      {/* Float Quote */}
      <FloatQuote quote="FLOAT isn't a cathedral. It's a ritual shed of resonance, where fuzzy search, tweet echoes, and chat ghosts provide just-in-time companionship." />

      {/* Highlights Preview */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Latest Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestHighlights.map((highlight) => (
            <HighlightCard key={highlight._id} highlight={highlight} />
          ))}
        </div>
      </section>

      {/* Notes Preview */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Recent Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/notes"
            className="inline-flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm px-6 py-3 text-gray-800 font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            View All Notes
          </a>
        </div>
      </section>
    </main>
  )
}
