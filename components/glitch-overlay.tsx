"use client"

import { useEffect, useState } from "react"

export function GlitchOverlay() {
  const [scanlinePosition, setScanlinePosition] = useState(0)
  const [glitchMode, setGlitchMode] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 2) % 100)
      setGlitchMode((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getGlitchClass = () => {
    const classes = ["", "animate-pulse", "opacity-90"]
    return classes[glitchMode]
  }

  return (
    <>
      {/* Scanline effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          background: `linear-gradient(transparent ${scanlinePosition}%, rgba(0,255,255,0.1) ${scanlinePosition + 1}%, transparent ${scanlinePosition + 2}%)`,
        }}
      />

      {/* Glitch overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5 ${getGlitchClass()}`}
        />
      </div>

      {/* Matrix-style background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="glitch-overlay w-full h-full" />
      </div>
    </>
  )
}
