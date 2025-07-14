import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FLOAT Learning Culture",
  description: "Memory, ritual, and curation—reframed as floating practice",
  generator: "v0.dev",
  metadataBase: new URL("https://v0-v0-note-necromancy-readwise.vercel.app"),
  openGraph: {
    title: "FLOAT Learning Culture",
    description: "Memory, ritual, and curation—reframed as floating practice",
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
    title: "FLOAT Learning Culture",
    description: "Memory, ritual, and curation—reframed as floating practice",
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
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
