import { Badge } from "@/components/ui/badge"

interface RitualCalloutProps {
  ritual: {
    title: string
    steps: string[]
  }
}

export function RitualCallout({ ritual }: RitualCalloutProps) {
  return (
    <div className="bg-purple-50/80 dark:bg-purple-900/20 border-l-4 border-purple-400 dark:border-purple-600 px-4 py-3 rounded-xl shadow-md my-4">
      <div className="flex items-center mb-2">
        <Badge className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 hover:bg-purple-300 dark:hover:bg-purple-700">
          Ritual
        </Badge>
        <span className="ml-2 font-medium">{ritual.title}</span>
      </div>
      <ul className="list-disc ml-6 space-y-1">
        {ritual.steps.map((step, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
            {step}
          </li>
        ))}
      </ul>
    </div>
  )
}
