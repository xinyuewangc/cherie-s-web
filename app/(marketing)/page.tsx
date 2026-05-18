import Link from "next/link"
import {
  ArrowRight,
  Database,
  ExternalLink,
  GitBranch,
  PenTool,
  Rocket,
  TerminalSquare,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { getPortfolioProjects } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const revalidate = 300

const workflow = [
  {
    title: "Notion",
    description: "Project notes, case studies, writing drafts, and publish status.",
    icon: Database,
  },
  {
    title: "GitHub",
    description: "Versioned source code, branches, pull requests, and project history.",
    icon: GitBranch,
  },
  {
    title: "Deploy",
    description: "Automatic previews and production releases from the main branch.",
    icon: Rocket,
  },
  {
    title: "Codex",
    description: "Local development, visual iteration, build checks, and commits.",
    icon: TerminalSquare,
  },
]

const capabilities = [
  "AI product prototyping",
  "Portfolio systems",
  "Knowledge workflows",
  "Interface design",
  "Content operations",
  "Full-stack experiments",
]

export default async function IndexPage() {
  const featuredProjects = await getPortfolioProjects()

  return (
    <>
      <section className="border-b bg-background">
        <div className="container grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20 lg:py-24">
          <div className="flex max-w-[760px] flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Portfolio system in progress
            </div>
            <h1 className="font-heading text-4xl leading-[1.05] tracking-normal sm:text-5xl md:text-6xl">
              Cherie Xinyue builds calm, useful systems for ideas, products, and AI workflows.
            </h1>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-muted-foreground">
              A personal portfolio for selected work, product thinking, and experiments.
              Content will live in Notion, code will live on GitHub, and every update
              should be easy to preview, ship, and keep improving with Codex.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#work"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                View work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#system"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2"
                )}
              >
                See system
                <GitBranch className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid content-center gap-4">
            <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current focus</p>
                  <h2 className="mt-1 text-2xl font-semibold">Portfolio as a living workspace</h2>
                </div>
                <PenTool className="h-6 w-6 text-rose-500" />
              </div>
              <div className="mt-6 grid gap-3">
                {capabilities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <span>{item}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-50">
                <p className="text-sm opacity-70">Content source</p>
                <p className="mt-2 text-xl font-semibold">Notion-ready</p>
              </div>
              <div className="rounded-lg border bg-rose-50 p-4 text-rose-950 dark:bg-rose-950/30 dark:text-rose-50">
                <p className="text-sm opacity-70">Code source</p>
                <p className="mt-2 text-xl font-semibold">GitHub-first</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="container py-12 md:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Selected work
            </p>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl">
              Projects that make thinking easier to move through.
            </h2>
          </div>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            GitHub
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {featuredProjects.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredProjects.slice(0, 6).map((project) => (
              <article
                key={project.id}
                className="flex min-h-[300px] flex-col justify-between rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <span>{project.collaborator || "Notion project"}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.length ? (
                    project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-md border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Portfolio
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">Notion is connected next.</h3>
            <p className="mt-2 leading-7 text-muted-foreground">
              Add the Notion token and projects database ID locally to show your
              real portfolio work here.
            </p>
          </div>
        )}
      </section>

      <section id="system" className="border-y bg-muted/30">
        <div className="container py-12 md:py-20">
          <div className="max-w-[720px]">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Publishing system
            </p>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl">
              A small, durable loop from notes to shipped pages.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {workflow.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-lg border bg-background p-5 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="about" className="container py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              About
            </p>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl">
              Built for ongoing work, not a one-time launch.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              This first version sets the shape: a portfolio home, project
              collection, and publishing workflow. Next, the placeholder projects
              can become real Notion-backed entries with covers, case studies,
              and launch notes.
            </p>
            <p>
              The site should feel personal, editable, and sturdy enough to grow
              with new experiments, essays, and shipped products.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
