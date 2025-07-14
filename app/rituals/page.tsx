import { allRituals } from "@/lib/mock-data"
import { RitualCard } from "@/components/ritual-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rituals | FLOAT Learning Culture",
  description:
    "Structured practices to cultivate learning, memory, and cognitive flow. Micro-rituals and externalization practices for neurodivergent thinking.",
  openGraph: {
    title: "Rituals | FLOAT Learning Culture",
    description:
      "Structured practices to cultivate learning, memory, and cognitive flow. Micro-rituals and externalization practices for neurodivergent thinking.",
    url: "https://v0-v0-note-necromancy-readwise.vercel.app/rituals",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rituals | FLOAT Learning Culture",
    description:
      "Structured practices to cultivate learning, memory, and cognitive flow. Micro-rituals and externalization practices for neurodivergent thinking.",
    images: ["/og-image.png"],
  },
}

export default function RitualsOverview() {
  const rituals = allRituals.sort((a, b) => a.title.localeCompare(b.title))

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Rituals</h1>
      <p className="text-center max-w-2xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
        Structured practices to cultivate learning, memory, and cognitive flow
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rituals.map((ritual) => (
          <RitualCard key={ritual._id} ritual={ritual} />
        ))}
      </div>
    </main>
  )
}
