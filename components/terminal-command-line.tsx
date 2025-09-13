"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Terminal, ChevronRight } from "lucide-react"
import { allNotes, allRituals, allHighlights } from "@/lib/mock-data"

interface Command {
  name: string
  description: string
  aliases?: string[]
  execute: (args: string[]) => string | void
}

interface Completion {
  value: string
  description?: string
  type: "command" | "slug" | "tag" | "argument"
}

export function TerminalCommandLine() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string[]>([
    "░▒▓█ FLOAT::TERMINAL v2.1.0 █▓▒░",
    "Type 'help' for available commands",
    "Press Ctrl+` to toggle terminal",
    "Use Tab for completions",
    "",
  ])

  // Completion state
  const [completions, setCompletions] = useState<Completion[]>([])
  const [selectedCompletion, setSelectedCompletion] = useState(0)
  const [showCompletions, setShowCompletions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const completionRef = useRef<HTMLDivElement>(null)
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
          "Completion:",
          "  Tab               - Complete current input",
          "  Tab Tab           - Show all completions",
          "  ↑/↓               - Navigate completions",
          "  Enter             - Apply completion",
          "  Esc               - Hide completions",
          "",
          "Examples:",
          "  > open better-<Tab>",
          "  > find ritual<Tab>",
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
          "System: FLOAT v2.1.0",
          "Location: /sanctuary/terminal",
          "Permissions: read, write, ritual",
          "Status: consciousness_recovering",
          "Completions: enabled",
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
          "Completions: fuzzy_match_enabled",
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

  // Fuzzy matching function
  const fuzzyMatch = (pattern: string, text: string): boolean => {
    const patternLower = pattern.toLowerCase()
    const textLower = text.toLowerCase()

    if (textLower.includes(patternLower)) return true

    let patternIndex = 0
    for (let i = 0; i < textLower.length && patternIndex < patternLower.length; i++) {
      if (textLower[i] === patternLower[patternIndex]) {
        patternIndex++
      }
    }
    return patternIndex === patternLower.length
  }

  // Generate completions based on current input
  const generateCompletions = useCallback((inputValue: string, cursorPos: number): Completion[] => {
    const beforeCursor = inputValue.slice(0, cursorPos)
    const parts = beforeCursor.split(" ")
    const currentWord = parts[parts.length - 1] || ""

    const completions: Completion[] = []

    if (parts.length === 1) {
      // Complete command names
      commands.forEach((cmd) => {
        if (fuzzyMatch(currentWord, cmd.name)) {
          completions.push({
            value: cmd.name,
            description: cmd.description,
            type: "command",
          })
        }
        // Check aliases
        cmd.aliases?.forEach((alias) => {
          if (fuzzyMatch(currentWord, alias)) {
            completions.push({
              value: alias,
              description: `${cmd.description} (alias)`,
              type: "command",
            })
          }
        })
      })
    } else {
      // Complete arguments based on command
      const commandName = parts[0].toLowerCase()
      const command = commands.find((cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName))

      if (command?.name === "open") {
        // Complete note and ritual slugs
        allNotes.forEach((note) => {
          if (fuzzyMatch(currentWord, note.slug)) {
            completions.push({
              value: note.slug,
              description: `note: ${note.title}`,
              type: "slug",
            })
          }
        })

        allRituals.forEach((ritual) => {
          if (fuzzyMatch(currentWord, ritual.slug)) {
            completions.push({
              value: ritual.slug,
              description: `ritual: ${ritual.title}`,
              type: "slug",
            })
          }
        })
      } else if (command?.name === "find") {
        // Complete with common search terms from content
        const searchTerms = new Set<string>()

        // Extract common words from titles and tags
        allNotes.forEach((note) => {
          note.title
            .toLowerCase()
            .split(/\s+/)
            .forEach((word) => {
              if (word.length > 3) searchTerms.add(word)
            })
          note.tags?.forEach((tag) => searchTerms.add(tag))
        })

        allRituals.forEach((ritual) => {
          ritual.title
            .toLowerCase()
            .split(/\s+/)
            .forEach((word) => {
              if (word.length > 3) searchTerms.add(word)
            })
          ritual.tags?.forEach((tag) => searchTerms.add(tag))
        })

        Array.from(searchTerms).forEach((term) => {
          if (fuzzyMatch(currentWord, term)) {
            completions.push({
              value: term,
              description: `search term`,
              type: "argument",
            })
          }
        })
      }
    }

    // Sort by relevance (exact matches first, then by length)
    return completions
      .sort((a, b) => {
        const aExact = a.value.toLowerCase().startsWith(currentWord.toLowerCase())
        const bExact = b.value.toLowerCase().startsWith(currentWord.toLowerCase())

        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1

        return a.value.length - b.value.length
      })
      .slice(0, 10) // Limit to 10 completions
  }, [])

  // Update completions when input changes
  useEffect(() => {
    if (input.trim() && isOpen) {
      const newCompletions = generateCompletions(input, cursorPosition)
      setCompletions(newCompletions)
      setShowCompletions(newCompletions.length > 0)
      setSelectedCompletion(0)
    } else {
      setShowCompletions(false)
      setCompletions([])
    }
  }, [input, cursorPosition, isOpen])

  // Apply completion
  const applyCompletion = (completion: Completion) => {
    const beforeCursor = input.slice(0, cursorPosition)
    const afterCursor = input.slice(cursorPosition)
    const parts = beforeCursor.split(" ")

    // Replace the current word with the completion
    parts[parts.length - 1] = completion.value
    const newInput = parts.join(" ") + afterCursor

    setInput(newInput)
    setShowCompletions(false)

    // Set cursor position after the completed word
    const newCursorPos = parts.join(" ").length
    setCursorPosition(newCursorPos)

    // Focus input and set cursor position
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

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

  // Update cursor position
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setCursorPosition(e.target.selectionStart || 0)
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setCursorPosition((e.target as HTMLInputElement).selectionStart || 0)
  }

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
    setShowCompletions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCompletions && completions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedCompletion((prev) => (prev + 1) % completions.length)
        return
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedCompletion((prev) => (prev - 1 + completions.length) % completions.length)
        return
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault()
        applyCompletion(completions[selectedCompletion])
        return
      } else if (e.key === "Escape") {
        e.preventDefault()
        setShowCompletions(false)
        return
      }
    }

    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (input.trim()) {
        const newCompletions = generateCompletions(input, cursorPosition)
        if (newCompletions.length === 1) {
          applyCompletion(newCompletions[0])
        } else if (newCompletions.length > 1) {
          setCompletions(newCompletions)
          setShowCompletions(true)
          setSelectedCompletion(0)
        }
      }
    } else if (e.key === "ArrowUp" && !showCompletions) {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown" && !showCompletions) {
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
            <span className="text-xs font-mono text-purple-400">FLOAT::TERMINAL v2.1.0</span>
          </div>
          <div className="flex items-center gap-2">
            {showCompletions && <span className="text-xs font-mono text-cyan-400">[{completions.length}]</span>}
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 text-xs font-mono">
              [X]
            </button>
          </div>
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
        <div className="relative flex items-center p-3 border-t border-purple-500/30 bg-black/50">
          <ChevronRight className="w-4 h-4 text-cyan-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-cyan-400 font-mono text-sm outline-none placeholder-gray-500"
            placeholder="Enter command... (Tab for completions)"
            autoComplete="off"
          />
          <div className="text-xs text-gray-500 font-mono ml-2 flex items-center gap-1">
            {showCompletions && <span className="text-cyan-400">↑↓</span>}
            <kbd className="px-1 bg-gray-800 border border-gray-600 rounded">Ctrl+`</kbd>
          </div>

          {/* Completions positioned above input */}
          {showCompletions && completions.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-1 z-10">
              <div className="bg-black/95 border border-purple-500/50 backdrop-blur-sm max-h-40 overflow-y-auto">
                <div className="text-xs text-purple-400 font-mono px-2 py-1 bg-purple-500/10 border-b border-purple-500/30">
                  ▓ {completions.length} matches
                </div>
                <div className="grid grid-cols-1 gap-0">
                  {completions.slice(0, 8).map((completion, index) => (
                    <div
                      key={`${completion.type}-${completion.value}`}
                      className={`px-2 py-1 text-xs font-mono cursor-pointer flex items-center justify-between ${
                        index === selectedCompletion
                          ? "bg-cyan-500/30 text-cyan-300"
                          : "text-gray-300 hover:bg-gray-800/30"
                      }`}
                      onClick={() => applyCompletion(completion)}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`font-bold ${
                            completion.type === "command"
                              ? "text-green-400"
                              : completion.type === "slug"
                                ? "text-purple-400"
                                : completion.type === "tag"
                                  ? "text-yellow-400"
                                  : "text-cyan-400"
                          }`}
                        >
                          {completion.value}
                        </span>
                        {index === selectedCompletion && <span className="text-cyan-400">←</span>}
                      </div>
                      {completion.description && (
                        <span className="text-gray-500 text-xs truncate ml-2 max-w-xs">{completion.description}</span>
                      )}
                    </div>
                  ))}
                  {completions.length > 8 && (
                    <div className="px-2 py-1 text-xs text-gray-500 font-mono border-t border-gray-700">
                      ... and {completions.length - 8} more (keep typing to filter)
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
