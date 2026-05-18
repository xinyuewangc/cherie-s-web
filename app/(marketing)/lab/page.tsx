import { Metadata } from "next"
import Link from "next/link"
import { allLabs } from "contentlayer/generated"
import { ArrowRight } from "lucide-react"

import { labTopics } from "@/lib/portfolio-content"
import { formatDate } from "@/lib/utils"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Research notes on AI workflow, shadcn/ui, Tailwind, OKLCH, MCP, and design systems.",
}

export default function LabPage() {
  const notes = allLabs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  return (
    <main className="container py-16 md:py-24">
      <Reveal className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Lab
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
          Notes from the AI-native design workflow.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
          Writing, research fragments, and working principles for modern product
          systems.
        </p>
      </Reveal>

      <MotionGrid className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <MotionItem key={note._id}>
            <Link
              href={note.slug}
              className="group flex h-full flex-col rounded-xl border bg-card/70 p-5 transition hover:-translate-y-1 hover:border-foreground/20 hover:bg-card"
            >
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span>{note.category}</span>
                <time dateTime={note.date}>{formatDate(note.date)}</time>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                {note.title}
              </h2>
              <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                {note.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-foreground">
                Read note
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </MotionItem>
        ))}
      </MotionGrid>

      <section className="mt-16 rounded-2xl border bg-background/70 p-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Research map
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {labTopics.map((topic) => {
            const Icon = topic.icon

            return (
              <div key={topic.title} className="rounded-xl border bg-card p-4">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-4 font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
