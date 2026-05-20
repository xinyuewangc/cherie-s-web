import Link from "next/link"
import { ArrowRight, ExternalLink, Zap } from "lucide-react"

import {
  focusAreas,
  heroSignals,
  labTopics,
  playgroundDemos,
  socialLinks,
  systemLoop,
} from "@/lib/portfolio-content"
import { getPortfolioProjects } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { ProjectCard } from "@/components/portfolio/project-card"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"
import { buttonVariants } from "@/components/ui/button"

export const revalidate = 300

export default async function IndexPage() {
  const projects = await getPortfolioProjects()
  const selectedProjects = projects.slice(0, 6)

  return (
    <>
      <section className="container relative grid min-h-[calc(100vh-5rem)] gap-12 py-16 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-24">
        <Reveal className="max-w-3xl">
          <h1 className="font-heading text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Cherie Wang
          </h1>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground/70 md:text-3xl">
            王馨悦
          </p>
          <p className="text-foreground/85 mt-5 text-2xl font-medium tracking-tight md:text-3xl">
            AI Native UX Designer
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            I design calm, system-oriented product experiences where AI helps
            people reason, decide, and move work forward.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="rounded-full border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 bg-background/60"
              )}
            >
              Design philosophy
              <Zap className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 transition hover:text-foreground"
              >
                {link.label}
                {link.href.startsWith("http") ? (
                  <ExternalLink className="h-3.5 w-3.5" />
                ) : null}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-2xl border bg-card/70 p-2 shadow-2xl shadow-black/5 backdrop-blur dark:shadow-black/30">
            <div className="rounded-xl border bg-zinc-950 p-4 text-zinc-100">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-auto text-xs text-zinc-500">
                  portfolio.system
                </span>
              </div>
              <div className="space-y-4 py-5 font-mono text-sm leading-7">
                <p className="text-zinc-500">$ current_focus</p>
                <p>
                  <span className="text-emerald-300">AI UX</span> +{" "}
                  <span className="text-sky-300">design engineering</span> +{" "}
                  <span className="text-amber-200">Notion publishing</span>
                </p>
                <p className="text-zinc-500">$ selected_projects --source notion</p>
                <div className="grid gap-2">
                  {selectedProjects.slice(0, 4).map((project, index) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/[0.07]"
                    >
                      <span>{project.title}</span>
                      <span className="text-zinc-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:grid-cols-4">
                {heroSignals.map((signal) => (
                  <div key={signal.label}>
                    <p className="text-xs text-zinc-500">{signal.label}</p>
                    <p className="mt-1 text-sm">{signal.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="projects" className="container py-20">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Selected Projects
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-tight tracking-tight md:text-5xl">
              Product systems, workflow clarity, and AI-shaped making.
            </h2>
          </div>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-fit gap-2 bg-background/60"
            )}
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <MotionGrid className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {selectedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0 && Boolean(project.cover)}
            />
          ))}
        </MotionGrid>
      </section>

      <section className="border-y bg-muted/25 py-20">
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Lab / Writing
            </p>
            <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
              Field notes from the design-engineering loop.
            </h2>
          </Reveal>
          <MotionGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {labTopics.slice(0, 6).map((topic) => {
              const Icon = topic.icon

              return (
                <MotionItem key={topic.title}>
                  <Link
                    href={topic.href}
                    className="group block h-full rounded-xl border bg-background/70 p-5 transition hover:-translate-y-1 hover:border-foreground/20 hover:bg-background"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
                    <h3 className="mt-5 text-xl font-semibold">
                      {topic.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {topic.description}
                    </p>
                  </Link>
                </MotionItem>
              )
            })}
          </MotionGrid>
        </div>
      </section>

      <section className="container grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Playground
          </p>
          <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
            Small tools for thinking with interfaces.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A preview of experiments that turn design process into usable
            product surfaces.
          </p>
          <Link
            href="/playground"
            className={cn(buttonVariants({ variant: "outline" }), "mt-8 gap-2")}
          >
            Open playground
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <MotionGrid className="grid gap-4">
          {playgroundDemos.map((demo) => {
            const Icon = demo.icon

            return (
              <MotionItem key={demo.title}>
                <div className="rounded-xl border bg-card/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                      {demo.status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{demo.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {demo.description}
                  </p>
                </div>
              </MotionItem>
            )
          })}
        </MotionGrid>
      </section>

      <section className="container pb-20">
        <Reveal className="rounded-2xl border bg-card/70 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                System loop
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Content management that stays close to the work.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {systemLoop.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="rounded-xl border p-4">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="mt-4 font-semibold">{item.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
