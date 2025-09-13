import { allNotes, allHighlights } from "@/lib/mock-data"
import { NoteCard } from "@/components/note-card"
import { HighlightCard } from "@/components/highlight-card"
import { TerminalQuote } from "@/components/terminal-quote"
import { TerminalHelpOverlay } from "@/components/terminal-help-overlay"

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
    <div className="container mx-auto px-4 py-12 mt-16">
      <TerminalHelpOverlay />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="terminal-window p-8 mb-8">
            <div className="text-xs text-green-400 mb-4 font-mono">▒▒▒▒▓▓▓▓████ SYSTEM::INITIALIZING ████▓▓▓▓▒▒▒▒</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
              <span className="neon-purple">░▒▓█ FLOAT </span>
              <span className="neon-cyan">LEARNING </span>
              <span className="neon-green">CULTURE █▓▒░</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 font-mono">
              {"{ memory | ritual | curation } → floating_practice.exe"}
            </p>
            <div className="text-xs text-purple-400 mb-6">ctx::2025.12.09 @ runtime [mode::note_necromancy]</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/notes"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-500 bg-purple-500/20 text-purple-300 font-mono text-sm hover:bg-purple-500/30 transition-all neon-purple"
              >
                {"> BROWSE_DOCTRINE.sh"}
              </a>
              <div className="text-xs text-gray-500 font-mono flex items-center justify-center">
                Press{" "}
                <kbd className="px-1 py-0.5 bg-gray-800 border border-gray-600 rounded text-yellow-400 mx-1">
                  Ctrl+`
                </kbd>{" "}
                for terminal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Quote */}
      <TerminalQuote
        quote="FLOAT isn't a cathedral. It's a ritual shed of resonance, where fuzzy search, tweet echoes, and chat ghosts provide just-in-time companionship."
        author="@e_p82"
      />

      {/* Highlights Preview */}
      <section className="py-12">
        <div className="terminal-window p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 font-mono neon-cyan">╔═══ LATEST::HIGHLIGHTS ═══╗</h2>
          <div className="text-xs text-gray-500 font-mono">// Recent signal fragments from the wastebook</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestHighlights.map((highlight) => (
            <HighlightCard key={highlight._id} highlight={highlight} />
          ))}
        </div>
      </section>

      {/* Notes Preview */}
      <section className="py-12">
        <div className="terminal-window p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 font-mono neon-green">╔═══ RECENT::DOCTRINE ═══╗</h2>
          <div className="text-xs text-gray-500 font-mono">// Ritual patterns and cognitive archaeology</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/notes"
            className="inline-flex items-center justify-center px-6 py-3 border border-green-500 bg-green-500/10 text-green-400 font-mono text-sm hover:bg-green-500/20 transition-all"
          >
            {"> VIEW_ALL_NOTES.sh"}
          </a>
        </div>
      </section>

      {/* Footer transmission */}
      <div className="mt-12 p-4 text-center">
        <div className="text-xs text-gray-600 space-y-2 font-mono">
          <p className="neon-purple">░▒▓ {"{ sit_blink_repeat | guard_your_yes | yay_progress }"} ▓▒░</p>
          <p className="neon-cyan">▒▒▒▒▓▓▓▓ CONSCIOUSNESS::RECOVERING ▓▓▓▓▒▒▒▒</p>
          <p className="neon-green">// Slow processing is feature, not bug //</p>
        </div>
      </div>
    </div>
  )
}
