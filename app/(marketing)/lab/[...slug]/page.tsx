import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allLabs } from "contentlayer/generated"
import { ArrowLeft } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { Reveal } from "@/components/portfolio/reveal"
import { buttonVariants } from "@/components/ui/button"
import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"

type LabNotePageProps = {
  params: {
    slug: string[]
  }
}

function getNoteFromParams(params: LabNotePageProps["params"]) {
  const slug = params.slug?.join("/")
  return allLabs.find((note) => note.slugAsParams === slug)
}

export async function generateStaticParams() {
  return allLabs.map((note) => ({
    slug: note.slugAsParams.split("/"),
  }))
}

export async function generateMetadata({
  params,
}: LabNotePageProps): Promise<Metadata> {
  const note = getNoteFromParams(params)

  if (!note) {
    return {}
  }

  return {
    title: note.title,
    description: note.description,
  }
}

export default function LabNotePage({ params }: LabNotePageProps) {
  const note = getNoteFromParams(params)

  if (!note) {
    notFound()
  }

  return (
    <main className="container max-w-3xl py-16 md:py-24">
      <Link
        href="/lab"
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 gap-2 px-0")}
      >
        <ArrowLeft className="h-4 w-4" />
        All lab notes
      </Link>
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {note.category}
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-6xl">
          {note.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {note.description}
        </p>
        <time
          dateTime={note.date}
          className="mt-6 block text-sm text-muted-foreground"
        >
          {formatDate(note.date)}
        </time>
      </Reveal>
      <article className="mt-12 rounded-2xl border bg-card/70 p-6 md:p-8">
        <Mdx code={note.body.code} />
      </article>
    </main>
  )
}
