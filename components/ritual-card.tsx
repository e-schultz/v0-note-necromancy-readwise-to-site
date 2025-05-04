import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RitualCardProps {
  ritual: {
    _id: string
    title: string
    steps: string[]
    tags?: string[]
    description?: string
  }
}

export function RitualCard({ ritual }: RitualCardProps) {
  return (
    <Card className="bg-white/75 dark:bg-gray-900/75 backdrop-blur-md rounded-2xl shadow-lg border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{ritual.title}</CardTitle>
        {ritual.tags && ritual.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {ritual.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {ritual.description && <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{ritual.description}</p>}
        <ul className="list-decimal pl-5 space-y-2">
          {ritual.steps.map((step, index) => (
            <li key={index} className="text-sm">
              {step}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
