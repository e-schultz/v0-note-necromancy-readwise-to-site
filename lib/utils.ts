import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Terminal utility functions
export function formatTimestamp(date?: string | Date): string {
  if (!date) return "unknown"
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().slice(0, 19).replace("T", " ")
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncate(text: string, length = 100): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

// Terminal color utilities
export function getTerminalColor(type: "success" | "error" | "warning" | "info"): string {
  const colors = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-cyan-400",
  }
  return colors[type]
}

// Glitch text effect utility
export function glitchText(text: string, intensity = 0.1): string {
  if (Math.random() > intensity) return text

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const chars = text.split("")
  const glitchIndex = Math.floor(Math.random() * chars.length)

  chars[glitchIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)]

  return chars.join("")
}
