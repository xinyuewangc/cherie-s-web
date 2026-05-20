import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

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

  const toc = project.toc

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
            <h1 className="mt-6 font-heading text-5xl font-bold leading-tight tracking-tight md:text-7xl">
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
        <div className="mt-8 grid gap-3 border-y py-5 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <span className="block text-foreground">Timeline</span>
            {project.year}
          </div>
          <div>
            <span className="block text-foreground">Context</span>
            {project.collaborator || "Independent"}
          </div>
          <div>
            <span className="block text-foreground">Mode</span>
            Project system
          </div>
        </div>
      </section>

      <section
        className={cn(
          "container grid gap-10 pb-20 xl:gap-14",
          toc.length
            ? "xl:grid-cols-[210px_minmax(0,1fr)]"
            : "max-w-5xl"
        )}
      >
        {toc.length ? (
          <aside className="hidden xl:block">
            <div className="sticky top-28 overflow-hidden rounded-xl border bg-background/80 p-4 shadow-sm backdrop-blur">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Contents
              </p>
              <nav className="mt-4 grid max-h-[calc(100vh-14rem)] gap-1 overflow-y-auto pr-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    title={item.title}
                    className={cn(
                      "block rounded-md p-2 text-xs leading-5 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                      item.level === 3 &&
                        "ml-2 border-l border-border/70 pl-3"
                    )}
                  >
                    <span className="line-clamp-2">{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}

        <article className="min-w-0">
          <NotionRenderer blocks={project.blocks} />
        </article>
      </section>
    </main>
  )
}
