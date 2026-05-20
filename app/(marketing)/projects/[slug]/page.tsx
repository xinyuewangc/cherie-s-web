import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"

import {
  getPortfolioCaseStudy,
  getPortfolioProjects,
} from "@/lib/notion"
import { cn } from "@/lib/utils"
import { NotionRenderer } from "@/components/portfolio/notion-renderer"
import { ProjectCover } from "@/components/portfolio/project-cover"
import { Reveal } from "@/components/portfolio/reveal"
import { buttonVariants } from "@/components/ui/button"

type ProjectDetailPageProps = {
  params: {
    slug: string
  }
}

export const revalidate = 300

export async function generateStaticParams() {
  const projects = await getPortfolioProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getPortfolioCaseStudy(params.slug)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cover ? [project.cover] : undefined,
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const project = await getPortfolioCaseStudy(params.slug)

  if (!project) {
    notFound()
  }

  const toc = project.toc.length
    ? project.toc
    : project.frame.map((item) => ({
        id: item.title.toLowerCase().replace(/\s+/g, "-"),
        title: item.title,
        level: 2 as const,
      }))

  return (
    <main>
      <section className="container py-10 md:py-16">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-8 w-fit gap-2 px-0"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {(project.tags.length ? project.tags : ["Case study"]).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectCover
              src={project.cover}
              alt={project.coverAlt}
              className="aspect-[1.35/1]"
              priority
            />
          </Reveal>
        </div>
        <div className="mt-8 grid gap-3 border-y py-5 text-sm text-muted-foreground md:grid-cols-4">
          <div>
            <span className="block text-foreground">Year</span>
            {project.year}
          </div>
          <div>
            <span className="block text-foreground">Collaborator</span>
            {project.collaborator || "Independent"}
          </div>
          <div>
            <span className="block text-foreground">Source</span>
            Notion case study
          </div>
          <div>
            <Link
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-foreground transition hover:text-muted-foreground"
            >
              Open source note
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container grid gap-10 pb-20 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-xl border bg-background/70 p-4 backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Contents
            </p>
            <nav className="mt-4 grid gap-2">
              <a
                href="#case-frame"
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Case frame
              </a>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    item.level === 3 && "pl-5"
                  )}
                >
                  {item.title}
                </a>
              ))}
              <a
                href="#gallery"
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Gallery
              </a>
              <a
                href="#source-notes"
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Source notes
              </a>
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <section
            id="case-frame"
            className="scroll-m-28 rounded-2xl border bg-card/70 p-5 md:p-8"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Case frame
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.frame.map((item) => (
                <div key={item.title} className="rounded-xl border bg-background p-5">
                  <h2
                    id={item.title.toLowerCase().replace(/\s+/g, "-")}
                    className="scroll-m-28 text-lg font-semibold"
                  >
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="gallery" className="scroll-m-28 py-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Gallery
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Visual artifacts
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {project.gallery.length} assets
              </span>
            </div>
            {project.gallery.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.gallery.slice(0, 8).map((image) => (
                  <ProjectCover
                    key={image.id}
                    src={image.url}
                    alt={image.caption}
                    className="aspect-[1.45/1]"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border bg-card p-6 text-sm text-muted-foreground">
                No Notion gallery images yet. Add image blocks to this project
                page and they will appear here.
              </div>
            )}
          </section>

          <section id="source-notes" className="scroll-m-28">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Source notes
            </p>
            <div className="mt-6">
              <NotionRenderer blocks={project.blocks} />
            </div>
          </section>
        </article>
      </section>
    </main>
  )
}
