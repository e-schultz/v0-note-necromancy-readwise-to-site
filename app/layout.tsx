import type React from "react"
import "@/app/globals.css"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { GlitchOverlay } from "@/components/glitch-overlay"
import { cn } from "@/lib/utils"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "░▒▓█ FLOAT::LEARNING::CULTURE █▓▒░",
  description: "{ memory | ritual | curation } → floating_practice.exe",
  generator: "v0.dev",
  metadataBase: new URL("https://v0-v0-note-necromancy-readwise.vercel.app"),
  openGraph: {
    title: "░▒▓█ FLOAT::LEARNING::CULTURE █▓▒░",
    description: "{ memory | ritual | curation } → floating_practice.exe",
    url: "https://v0-v0-note-necromancy-readwise.vercel.app",
    siteName: "FLOAT Learning Culture",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLOAT Learning Culture - Memory, ritual, and curation reframed as floating practice",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "░▒▓█ FLOAT::LEARNING::CULTURE █▓▒░",
    description: "{ memory | ritual | curation } → floating_practice.exe",
    images: ["/og-image.png"],
    creator: "@e_p82",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(jetbrainsMono.className, "min-h-screen bg-black text-white relative overflow-x-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <GlitchOverlay />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
