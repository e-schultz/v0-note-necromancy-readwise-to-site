import { allRituals } from "@/lib/mock-data"
import { RitualCard } from "@/components/ritual-card"

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
