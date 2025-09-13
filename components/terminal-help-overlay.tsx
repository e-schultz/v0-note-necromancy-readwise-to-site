"use client"

import { useState, useEffect } from "react"
import { HelpCircle, X } from "lucide-react"

export function TerminalHelpOverlay() {
  const [showHelp, setShowHelp] = useState(false)
  const [hasSeenHelp, setHasSeenHelp] = useState(false)

  useEffect(() => {
    // Show help on first visit
    const seen = localStorage.getItem("float-terminal-help-seen")
    if (!seen) {
      const timer = setTimeout(() => {
        setShowHelp(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
    setHasSeenHelp(true)
  }, [])

  const handleClose = () => {
    setShowHelp(false)
    setHasSeenHelp(true)
    localStorage.setItem("float-terminal-help-seen", "true")
  }

  if (!showHelp && hasSeenHelp) {
    return (
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-black/80 border border-cyan-500 text-cyan-400 hover:text-green-400 hover:border-green-500 transition-all backdrop-blur-sm"
        title="Terminal Help"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
    )
  }

  if (!showHelp) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-black border-2 border-cyan-500 max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b border-cyan-500/30 bg-cyan-500/10">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400">TERMINAL::HELP</span>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 text-xs font-mono text-green-400 space-y-4">
          <div>
            <div className="text-cyan-400 mb-2">╔═══ TERMINAL INTERFACE ═══╗</div>
            <div className="text-gray-300 space-y-1">
              <div>
                • Press <span className="text-yellow-400">Ctrl+`</span> to toggle terminal
              </div>
              <div>• Click the terminal icon (bottom right) to open</div>
              <div>
                • Use <span className="text-yellow-400">↑/↓</span> arrows for command history
              </div>
              <div>
                • Press <span className="text-yellow-400">Esc</span> to close terminal
              </div>
            </div>
          </div>

          <div>
            <div className="text-purple-400 mb-2">▓▓ QUICK COMMANDS ▓▓</div>
            <div className="text-gray-300 space-y-1">
              <div>
                <span className="text-green-400">help</span> - Show all commands
              </div>
              <div>
                <span className="text-green-400">home</span> - Go to homepage
              </div>
              <div>
                <span className="text-green-400">notes</span> - Browse notes
              </div>
              <div>
                <span className="text-green-400">rituals</span> - Browse rituals
              </div>
              <div>
                <span className="text-green-400">find &lt;term&gt;</span> - Search content
              </div>
              <div>
                <span className="text-green-400">open &lt;slug&gt;</span> - Open specific content
              </div>
            </div>
          </div>

          <div>
            <div className="text-yellow-400 mb-2">░░ EXAMPLES ░░</div>
            <div className="text-gray-300 space-y-1">
              <div>
                <span className="text-cyan-400">&gt;</span> find ritual
              </div>
              <div>
                <span className="text-cyan-400">&gt;</span> open better-tshirt-rule
              </div>
              <div>
                <span className="text-cyan-400">&gt;</span> notes | grep float
              </div>
              <div>
                <span className="text-cyan-400">&gt;</span> status
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-xs mt-4 pt-4 border-t border-gray-700">
            // Navigate like a hacker, think like a ritual //
          </div>
        </div>
      </div>
    </div>
  )
}
