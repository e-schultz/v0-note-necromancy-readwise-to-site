import { Activity } from "lucide-react"

interface RitualCalloutProps {
  ritual: {
    title: string
    steps: string[]
  }
}

export function RitualCallout({ ritual }: RitualCalloutProps) {
  return (
    <div className="border-2 border-yellow-500 bg-yellow-500/10 p-4 my-6">
      <div className="flex items-center gap-3 mb-3">
        <Activity className="w-5 h-5 text-yellow-400" />
        <span className="text-xs text-gray-500 font-mono">ritual::</span>
        <span className="font-mono font-bold text-yellow-400">{ritual.title}</span>
      </div>

      <div className="text-xs text-gray-500 font-mono mb-2">▓▓ PROTOCOL ▓▓</div>

      <ol className="list-none space-y-2">
        {ritual.steps.map((step, i) => (
          <li key={i} className="text-sm font-mono text-gray-300 flex items-start">
            <span className="text-yellow-400 mr-3 font-bold">{String(i + 1).padStart(2, "0")}:</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
