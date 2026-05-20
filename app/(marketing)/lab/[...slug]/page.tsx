import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getLabNoteBySlug, getLabNotes } from "@/lib/lab"
import { cn, formatDate } from "@/lib/utils"
import { NotionRenderer } from "@/components/portfolio/notion-renderer"
import { ProjectCover } from "@/components/portfolio/project-cover"
import { Reveal } from "@/components/portfolio/reveal"
import { buttonVariants } from "@/components/ui/button"
import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"

type LabNotePageProps = {
  params: {
    slug: string[]
  }
}

function slugFromParams(params: LabNotePageProps["params"]) {
  return params.slug?.join("/")
}

export async function generateStaticParams() {
  const notes = await getLabNotes()

  return notes.map((note) => ({
    slug: note.slug.split("/"),
  }))
}

export async function generateMetadata({
  params,
}: LabNotePageProps): Promise<Metadata> {
  const note = await getLabNoteBySlug(slugFromParams(params))

  if (!note) {
    return {}
  }

  return {
    title: note.title,
    description: note.description,
    openGraph: {
      title: note.title,
      description: note.description,
      images: note.cover ? [note.cover] : undefined,
    },
  }
}

export default async function LabNotePage({ params }: LabNotePageProps) {
  const note = await getLabNoteBySlug(slugFromParams(params))

  if (!note) {
    notFound()
  }

  return (
    <main className="container max-w-4xl py-16 md:py-24">
      <Link
        href="/lab"
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 gap-2 px-0")}
      >
        <ArrowLeft className="h-4 w-4" />
        All lab notes
      </Link>
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {note.categoryKey.replace("-", " ")} / {note.source}
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-6xl">
          {note.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          {note.description}
        </p>
        <time
          dateTime={note.date}
          className="mt-6 block text-sm text-muted-foreground"
        >
          {formatDate(note.date)}
        </time>
      </Reveal>

      {note.cover ? (
        <Reveal delay={0.08} className="mt-10">
          <ProjectCover
            src={note.cover}
            alt={`${note.title} cover`}
            className="aspect-[1.8/1]"
            priority
          />
        </Reveal>
      ) : null}

      <article className="mt-12 rounded-2xl border bg-card/70 p-6 md:p-8">
        {note.source === "notion" ? (
          <NotionRenderer blocks={note.blocks ?? []} />
        ) : (
          <Mdx code={note.bodyCode ?? ""} />
        )}
      </article>
    </main>
  )
}
