"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Terminal, ChevronRight } from "lucide-react"
import { allNotes, allRituals, allHighlights } from "@/lib/mock-data"

interface Command {
  name: string
  description: string
  aliases?: string[]
  execute: (args: string[]) => string | void
}

export function TerminalCommandLine() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string[]>([
    "░▒▓█ FLOAT::TERMINAL v2.0.25 █▓▒░",
    "Type 'help' for available commands",
    "Press Ctrl+` to toggle terminal",
    "",
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const commands: Command[] = [
    {
      name: "help",
      description: "Show available commands",
      execute: () => {
        const helpText = [
          "╔═══ AVAILABLE COMMANDS ═══╗",
          "",
          "Navigation:",
          "  home, /           - Go to home page",
          "  notes, n          - List all notes",
          "  rituals, r        - List all rituals",
          "  highlights, h     - List all highlights",
          "  open <slug>       - Open specific note/ritual",
          "",
          "Search:",
          "  find <term>       - Search across all content",
          "  tags              - List all available tags",
          "",
          "System:",
          "  clear, cls        - Clear terminal",
          "  exit, quit        - Close terminal",
          "  whoami            - Show current context",
          "  status            - System status",
          "",
          "Examples:",
          "  > open better-tshirt-rule",
          "  > find ritual",
          "  > n | grep float",
          "",
        ]
        return helpText.join("\n")
      },
    },
    {
      name: "home",
      aliases: ["/"],
      description: "Navigate to home page",
      execute: () => {
        router.push("/")
        return "Navigating to home..."
      },
    },
    {
      name: "notes",
      aliases: ["n"],
      description: "List all notes",
      execute: (args) => {
        if (args.length === 0) {
          router.push("/notes")
          return "Opening notes index..."
        }

        const notes = allNotes
          .filter((note) => note.published)
          .map((note, i) => `${String(i + 1).padStart(2, "0")}. ${note.slug} - ${note.title}`)

        return ["╔═══ NOTES DIRECTORY ═══╗", "", ...notes, "", `Total: ${notes.length} notes`].join("\n")
      },
    },
    {
      name: "rituals",
      aliases: ["r"],
      description: "List all rituals",
      execute: (args) => {
        if (args.length === 0) {
          router.push("/rituals")
          return "Opening rituals index..."
        }

        const rituals = allRituals.map(
          (ritual, i) => `${String(i + 1).padStart(2, "0")}. ${ritual.slug} - ${ritual.title}`,
        )

        return ["╔═══ RITUALS DIRECTORY ═══╗", "", ...rituals, "", `Total: ${rituals.length} rituals`].join("\n")
      },
    },
    {
      name: "highlights",
      aliases: ["h"],
      description: "List all highlights",
      execute: (args) => {
        if (args.length === 0) {
          router.push("/highlights")
          return "Opening highlights index..."
        }

        const highlights = allHighlights.map(
          (highlight, i) => `${String(i + 1).padStart(2, "0")}. ${highlight.excerpt.substring(0, 50)}...`,
        )

        return ["╔═══ HIGHLIGHTS DIRECTORY ═══╗", "", ...highlights, "", `Total: ${highlights.length} highlights`].join(
          "\n",
        )
      },
    },
    {
      name: "open",
      description: "Open specific note or ritual by slug",
      execute: (args) => {
        if (args.length === 0) {
          return "Error: Please specify a slug. Usage: open <slug>"
        }

        const slug = args[0]
        const note = allNotes.find((n) => n.slug === slug)
        const ritual = allRituals.find((r) => r.slug === slug)

        if (note) {
          router.push(`/notes/${slug}`)
          return `Opening note: ${note.title}`
        } else if (ritual) {
          router.push(`/rituals/${slug}`)
          return `Opening ritual: ${ritual.title}`
        } else {
          return `Error: No content found with slug '${slug}'`
        }
      },
    },
    {
      name: "find",
      description: "Search across all content",
      execute: (args) => {
        if (args.length === 0) {
          return "Error: Please specify search term. Usage: find <term>"
        }

        const term = args.join(" ").toLowerCase()
        const results: string[] = []

        // Search notes
        allNotes.forEach((note) => {
          if (
            note.title.toLowerCase().includes(term) ||
            note.body.raw.toLowerCase().includes(term) ||
            note.tags?.some((tag) => tag.toLowerCase().includes(term))
          ) {
            results.push(`note: ${note.slug} - ${note.title}`)
          }
        })

        // Search rituals
        allRituals.forEach((ritual) => {
          if (
            ritual.title.toLowerCase().includes(term) ||
            ritual.description?.toLowerCase().includes(term) ||
            ritual.steps.some((step) => step.toLowerCase().includes(term))
          ) {
            results.push(`ritual: ${ritual.slug} - ${ritual.title}`)
          }
        })

        // Search highlights
        allHighlights.forEach((highlight, i) => {
          if (highlight.excerpt.toLowerCase().includes(term) || highlight.author?.toLowerCase().includes(term)) {
            results.push(`highlight: ${i + 1} - ${highlight.excerpt.substring(0, 50)}...`)
          }
        })

        if (results.length === 0) {
          return `No results found for '${term}'`
        }

        return [`╔═══ SEARCH RESULTS: '${term}' ═══╗`, "", ...results, "", `Found: ${results.length} matches`].join(
          "\n",
        )
      },
    },
    {
      name: "tags",
      description: "List all available tags",
      execute: () => {
        const allTags = new Set<string>()

        allNotes.forEach((note) => note.tags?.forEach((tag) => allTags.add(tag)))
        allRituals.forEach((ritual) => ritual.tags?.forEach((tag) => allTags.add(tag)))
        allHighlights.forEach((highlight) => highlight.tags?.forEach((tag) => allTags.add(tag)))

        const sortedTags = Array.from(allTags).sort()
        const tagList = sortedTags.map((tag, i) => `${String(i + 1).padStart(2, "0")}. #${tag}`)

        return ["╔═══ AVAILABLE TAGS ═══╗", "", ...tagList, "", `Total: ${sortedTags.length} tags`].join("\n")
      },
    },
    {
      name: "clear",
      aliases: ["cls"],
      description: "Clear terminal output",
      execute: () => {
        setOutput([])
        return ""
      },
    },
    {
      name: "whoami",
      description: "Show current context",
      execute: () => {
        return [
          "╔═══ CURRENT CONTEXT ═══╗",
          "",
          "User: cognitive_archaeologist",
          "Mode: note_necromancy",
          "System: FLOAT v2.0.25",
          "Location: /sanctuary/terminal",
          "Permissions: read, write, ritual",
          "Status: consciousness_recovering",
          "",
        ].join("\n")
      },
    },
    {
      name: "status",
      description: "Show system status",
      execute: () => {
        return [
          "╔═══ SYSTEM STATUS ═══╗",
          "",
          `Notes: ${allNotes.length} loaded`,
          `Rituals: ${allRituals.length} active`,
          `Highlights: ${allHighlights.length} cached`,
          "Memory: ritual_patterns.db",
          "Processing: slow_mode_enabled",
          "Glitch_level: minimal",
          "Consciousness: recovering",
          "",
        ].join("\n")
      },
    },
    {
      name: "exit",
      aliases: ["quit"],
      description: "Close terminal",
      execute: () => {
        setIsOpen(false)
        return "Terminal closed. Press Ctrl+` to reopen."
      },
    },
  ]

  // Toggle terminal with Ctrl+`
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const executeCommand = (commandLine: string) => {
    const trimmed = commandLine.trim()
    if (!trimmed) return

    // Add to history
    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    // Add command to output
    setOutput((prev) => [...prev, `> ${trimmed}`])

    // Parse command
    const parts = trimmed.split(" ")
    const commandName = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Find command (including aliases)
    const command = commands.find((cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName))

    if (command) {
      const result = command.execute(args)
      if (result) {
        setOutput((prev) => [...prev, result, ""])
      }
    } else {
      setOutput((prev) => [...prev, `Command not found: ${commandName}`, "Type 'help' for available commands", ""])
    }

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-black/80 border-2 border-purple-500 text-purple-400 hover:text-cyan-400 hover:border-cyan-500 transition-all backdrop-blur-sm"
        title="Open Terminal (Ctrl+`)"
      >
        <Terminal className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 max-w-4xl mx-auto">
      <div className="bg-black/95 border-2 border-purple-500 backdrop-blur-sm max-h-96 flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-2 border-b border-purple-500/30 bg-purple-500/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-purple-400">FLOAT::TERMINAL</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 text-xs font-mono">
            [X]
          </button>
        </div>

        {/* Terminal Output */}
        <div ref={outputRef} className="flex-1 p-3 overflow-y-auto text-xs font-mono text-green-400 min-h-48 max-h-64">
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <div className="flex items-center p-3 border-t border-purple-500/30 bg-black/50">
          <ChevronRight className="w-4 h-4 text-cyan-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-cyan-400 font-mono text-sm outline-none placeholder-gray-500"
            placeholder="Enter command..."
            autoComplete="off"
          />
          <div className="text-xs text-gray-500 font-mono ml-2">Ctrl+` to toggle</div>
        </div>
      </div>
    </div>
  )
}
