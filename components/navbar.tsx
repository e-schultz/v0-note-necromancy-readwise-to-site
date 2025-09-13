"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, Cpu, Activity, Zap, MenuIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [glitchText, setGlitchText] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText((prev) => !prev)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const navLinks = [
    { href: "/", label: "HOME", icon: Terminal },
    { href: "/notes", label: "NOTES", icon: Cpu },
    { href: "/rituals", label: "RITUALS", icon: Activity },
    { href: "/highlights", label: "HIGHLIGHTS", icon: Zap },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-purple-500 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            <span className={cn("neon-purple font-mono", glitchText && "glitch-text")}>░▒▓ FLOAT ▓▒░</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-mono transition-all hover:neon-cyan flex items-center gap-2",
                    pathname === link.href
                      ? "neon-green border-b border-green-400"
                      : "text-gray-400 hover:text-cyan-400",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-purple-400 hover:text-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-purple-500/30 bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-mono transition-all px-2 py-1 rounded flex items-center gap-2",
                      pathname === link.href
                        ? "neon-green bg-green-500/10"
                        : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
