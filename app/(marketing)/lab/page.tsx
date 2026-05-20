import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Code2,
  Network,
} from "lucide-react"

import {
  getLabNotes,
  LabCategory,
  labCategories,
  LabNote,
} from "@/lib/lab"
import { cn, formatDate } from "@/lib/utils"
import { ProjectCover } from "@/components/portfolio/project-cover"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Ongoing research and system explorations across design engineering, AI workflow, and system thinking.",
}

export const revalidate = 300

const categoryIcons = {
  "design-engineering": Code2,
  "ai-workflow": Bot,
  "system-thinking": Network,
}

function categoryNotes(notes: LabNote[], category: LabCategory) {
  return notes.filter((note) => note.categoryKey === category.key)
}

function topicHasNote(topic: string, notes: LabNote[]) {
  const normalizedTopic = topic.toLowerCase()

  return notes.some((note) => {
    const text = [note.title, note.category, note.tags.join(" ")].join(" ").toLowerCase()

    return normalizedTopic
      .split(/\s+|\/|→|↔|-|\+/)
      .filter((part) => part.length > 2)
      .some((part) => text.includes(part))
  })
}

function LabNoteCard({ note }: { note: LabNote }) {
  return (
    <MotionItem>
      <Link
        href={note.href}
        className="group grid h-full overflow-hidden rounded-xl border bg-card/70 p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-card hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/30"
      >
        {note.cover ? (
          <ProjectCover
            src={note.cover}
            alt={`${note.title} cover`}
            className="aspect-[1.5/0.72]"
          />
        ) : (
          <div className="relative aspect-[1.5/0.72] overflow-hidden rounded-lg border bg-[radial-gradient(circle_at_25%_10%,hsl(var(--foreground)/0.12),transparent_32%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]">
            <div className="cover-grid-bg absolute inset-0 opacity-50" />
            <div className="absolute bottom-3 left-3 rounded-full border bg-background/75 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
              Research note
            </div>
          </div>
        )}
        <div className="flex h-full flex-col p-4">
          <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{note.source === "notion" ? "Notion" : "MDX"}</span>
            <time dateTime={note.date}>{formatDate(note.date)}</time>
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">
            {note.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
            {note.description}
          </p>
          <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span>{note.category}</span>
            <span className="inline-flex items-center gap-2 transition group-hover:text-foreground">
              Open
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </MotionItem>
  )
}

function CategorySection({
  category,
  notes,
}: {
  category: LabCategory
  notes: LabNote[]
}) {
  const Icon = categoryIcons[category.key]

  return (
    <section id={category.key} className="scroll-m-28 border-t py-14">
      <Reveal className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
              {category.label}
            </span>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="mt-5 font-heading text-4xl tracking-tight md:text-5xl">
            {category.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {category.description}
          </p>
        </div>

        <div className="min-w-0">
          <MotionGrid className="grid gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <LabNoteCard key={`${note.source}-${note.id}`} note={note} />
            ))}
          </MotionGrid>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Planned tracks
              </p>
              <span className="text-xs text-muted-foreground">
                {notes.length} synced
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {category.topics.map((topic) => {
                const active = topicHasNote(topic, notes)

                return (
                  <span
                    key={topic}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm transition",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground/70"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        active ? "bg-foreground" : "bg-muted-foreground/30"
                      )}
                    />
                    {topic}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default async function LabPage() {
  const notes = await getLabNotes()

  return (
    <main className="container py-16 md:py-24">
      <Reveal className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Lab
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
          Ongoing research & system explorations.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
          Not a blog. Lab is a working space for research notes, technical
          thinking, AI-native workflows, and system experiments that keep
          evolving.
        </p>
      </Reveal>

      <section className="mt-14">
        {labCategories.map((category) => (
          <CategorySection
            key={category.key}
            category={category}
            notes={categoryNotes(notes, category)}
          />
        ))}
      </section>

    </main>
  )
}
