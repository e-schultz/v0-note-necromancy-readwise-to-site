import { allNotes, allHighlights, allRituals } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { RitualCallout } from "@/components/ritual-callout"
import { HighlightCard } from "@/components/highlight-card"
import { SimpleMdx } from "@/components/simple-mdx"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return allNotes.map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) {
    return {
      title: "Note Not Found",
    }
  }

  const description = note.body.raw.substring(0, 160) + (note.body.raw.length > 160 ? "..." : "")

  return {
    title: `${note.title} | FLOAT Learning Culture`,
    description,
    openGraph: {
      title: note.title,
      description,
      url: `https://v0-v0-note-necromancy-readwise.vercel.app/notes/${note.slug}`,
      siteName: "FLOAT Learning Culture",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${note.title} - FLOAT Learning Culture`,
        },
      ],
      type: "article",
      publishedTime: note.date,
      tags: note.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description,
      images: ["/og-image.png"],
    },
  }
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) {
    notFound()
  }

  // Find related ritual if it exists
  const relatedRitual = note.ritual
    ? allRituals.find((ritual) => ritual.slug === note.ritual.replace("ritualAST::", ""))
    : null

  // Find related highlights
  const relatedHighlights = allHighlights.filter((highlight) => note.highlightRefs?.includes(highlight.source))

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{note.title}</h1>
          {note.date && (
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(note.date), "MMMM d, yyyy")}
            </time>
          )}
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {relatedRitual && <RitualCallout ritual={relatedRitual} />}

        <div className="prose dark:prose-invert max-w-none mt-8">
          <SimpleMdx code={note.body.code} />
        </div>

        {relatedHighlights.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Related Highlights</h2>
            <div className="space-y-4">
              {relatedHighlights.map((highlight) => (
                <HighlightCard key={highlight._id} highlight={highlight} compact />
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
