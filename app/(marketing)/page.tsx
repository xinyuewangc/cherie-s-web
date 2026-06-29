import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react"

import { PortfolioProject, getPortfolioProjects } from "@/lib/notion"
import { labTopics } from "@/lib/portfolio-content"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ProjectCover } from "@/components/portfolio/project-cover"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"

export const revalidate = 300

const projectAccents = [
  {
    label: "Data workflow",
    bg: "bg-[#eaf6ff] dark:bg-[#10202d]",
    ink: "text-[#213142] dark:text-[#e7f4ff]",
    chip: "bg-[#f7fbff] dark:bg-white/[0.06]",
  },
  {
    label: "Platform system",
    bg: "bg-[#e8f8ef] dark:bg-[#102318]",
    ink: "text-[#25382d] dark:text-[#e7f8ed]",
    chip: "bg-[#eef7ff] dark:bg-white/[0.06]",
  },
  {
    label: "Learning flow",
    bg: "bg-[#e8ecff] dark:bg-[#171a32]",
    ink: "text-[#2b3040] dark:text-[#eef1ff]",
    chip: "bg-[#fff5f6] dark:bg-white/[0.06]",
  },
  {
    label: "Business tooling",
    bg: "bg-[#fff1dc] dark:bg-[#2a1d13]",
    ink: "text-[#3d3028] dark:text-[#fff1dc]",
    chip: "bg-[#eef8f1] dark:bg-white/[0.06]",
  },
]

const projectStackTops = ["md:top-28", "md:top-32", "md:top-36", "md:top-40"]
const projectStackLayers = ["md:z-[1]", "md:z-[2]", "md:z-[3]", "md:z-[4]"]
const projectStackScales = [
  "md:[--stack-scale:0.955] md:[--stack-hover-scale:0.962]",
  "md:[--stack-scale:0.97] md:[--stack-hover-scale:0.977]",
  "md:[--stack-scale:0.985] md:[--stack-hover-scale:0.992]",
  "md:[--stack-scale:1] md:[--stack-hover-scale:1.005]",
]

const heroMarquee = [
  "Complex system UX",
  "AI Native workflow",
  "Design engineering",
  "B-side tools",
  "Community products",
  "Data assets",
  "Interaction prototypes",
  "Design systems",
]

const homeStats = [
  ["Current", "miHoYo UX"],
  ["Focus", "AI + platform"],
  ["Base", "Shanghai"],
  ["Archive", "Notion synced"],
]

function ProjectVisual({
  project,
  index,
}: {
  project: PortfolioProject
  index: number
}) {
  return (
    <ProjectCover
      src={project.cover}
      alt={project.coverAlt}
      priority={index === 0}
      className="h-full min-h-[240px] rounded-xl border-border"
    />
  )
}

function FeaturedProjectCard({
  project,
  index,
  className,
}: {
  project: PortfolioProject
  index: number
  className?: string
}) {
  const accent = projectAccents[index % projectAccents.length]

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={cn("project-stack-card group block", className)}
    >
      <article
        className={cn(
          "project-stack-card-inner grid min-h-[440px] scale-[var(--stack-scale)] overflow-hidden rounded-xl border border-border shadow-sm transition duration-500 [--stack-hover-scale:1.005] [--stack-scale:1] group-hover:-translate-y-1 group-hover:scale-[var(--stack-hover-scale)] group-hover:shadow-2xl group-hover:shadow-black/10 dark:group-hover:shadow-black/40 md:min-h-[460px] lg:grid-cols-[0.9fr_1.1fr]",
          accent.bg,
          accent.ink,
          projectStackScales[index] ||
            projectStackScales[projectStackScales.length - 1]
        )}
      >
        <div className="flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] opacity-60">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>
          <div className="mt-auto pt-12">
            <p className="text-sm font-medium opacity-60">
              {project.collaborator || "Selected work"}
            </p>
            <h3 className="mt-4 text-4xl font-semibold leading-[1.03] tracking-tight md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-7 opacity-75">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {(project.tags.length ? project.tags : ["Portfolio"])
                .slice(0, 4)
                .map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "border-current/15 rounded-full border px-3 py-1.5 text-xs opacity-75",
                      accent.chip
                    )}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition group-hover:translate-x-1 group-hover:bg-primary/90">
              View case study
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          <ProjectVisual project={project} index={index} />
        </div>
      </article>
    </Link>
  )
}

function WorkList({ projects }: { projects: PortfolioProject[] }) {
  if (!projects.length) {
    return null
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="group grid gap-4 py-5 transition hover:bg-card/70 md:grid-cols-[80px_1fr_160px_auto]"
        >
          <span className="font-mono text-sm text-muted-foreground">
            {String(index + 5).padStart(2, "0")}
          </span>
          <span>
            <span className="block text-xl font-semibold tracking-tight">
              {project.title}
            </span>
            <span className="mt-1 line-clamp-2 block text-sm leading-6 text-muted-foreground">
              {project.description}
            </span>
          </span>
          <span className="text-sm text-muted-foreground">
            {project.collaborator || "Project"}
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Link>
      ))}
    </div>
  )
}

export default async function IndexPage() {
  const projects = await getPortfolioProjects()
  const featuredProjects = projects.slice(0, 4)
  const archiveProjects = projects.slice(4, 12)
  const duplicatedMarquee = [...heroMarquee, ...heroMarquee]

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border bg-[#fbf7ef] dark:bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:py-24">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(380px,0.72fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.68fr)]">
            <div className="mx-auto max-w-5xl text-center lg:mx-0 lg:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                From complex systems to clear working products
              </p>
              <h1 className="mt-5 font-heading text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[6rem] xl:text-[6.7rem]">
                Hi It&apos;s Xinyue Wang
              </h1>
              <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9 lg:max-w-[820px]">
                <p>
                  I&apos;m Xinyue Wang 馨悦 王, an interaction designer with a
                  diverse and interdisciplinary background.
                </p>
                <p>
                  The only thing that matters about design is its relationship
                  with people. I have a keen interest and ability in applying
                  user-centred design, identifying the real hidden problems and
                  developing workable, enjoyable and practical solutions.
                </p>
              </div>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href="#projects"
                  data-work-scroll=""
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 rounded-full px-6"
                  )}
                >
                  View selected work
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2 rounded-full border-border bg-card/60 px-6"
                  )}
                >
                  About Me
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[380px] lg:ml-auto lg:max-w-[440px] xl:max-w-[470px]">
              <div className="relative aspect-[0.82/1] overflow-hidden rounded-[8px] border border-border bg-card shadow-sm">
                <Image
                  src="/images/profile-xinyue-wang.jpg"
                  alt="Xinyue Wang portrait"
                  fill
                  priority
                  sizes="(min-width: 1280px) 470px, (min-width: 1024px) 440px, 76vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mx-auto mt-12 grid max-w-[1240px] grid-cols-2 border-y border-border md:grid-cols-4 lg:mt-14"
          >
            {homeStats.map(([label, value]) => (
              <div key={label} className="p-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-medium">{value}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="bg-card/35 border-y border-border py-5">
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track flex w-max gap-4">
              {duplicatedMarquee.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full border border-border bg-card px-5 py-2 text-sm text-muted-foreground shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="container scroll-m-24 py-12 md:py-14">
        <h2 className="sr-only">Selected projects</h2>
        <MotionGrid className="grid gap-6 md:block md:pb-24">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              className={cn(
                "md:sticky",
                projectStackTops[index] || "md:top-32",
                projectStackLayers[index] || "md:z-[4]",
                index > 0 && "md:mt-10 lg:mt-12"
              )}
            />
          ))}
        </MotionGrid>
      </section>

      <section className="border-y border-border bg-[#f5f4ee] py-20 dark:bg-muted/20">
        <div className="container grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Work List
            </p>
            <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
              Everything else stays findable.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Smaller, older, or still-forming work lives here for scanning. The
              full archive remains synced from Notion.
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition hover:text-muted-foreground"
            >
              Open full work list
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <WorkList projects={archiveProjects} />
          </Reveal>
        </div>
      </section>

      <section id="lab" className="container scroll-m-24 py-20 md:py-24">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Lab
            </p>
            <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
              Notes for the systems behind the work.
            </h2>
          </div>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-muted-foreground"
          >
            Visit lab
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
        {labTopics.length > 0 ? (
          <MotionGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {labTopics.slice(0, 4).map((topic) => {
              const Icon = topic.icon

              return (
                <MotionItem key={topic.title}>
                  <Link
                    href={topic.href}
                    className="group block h-full rounded-[8px] border border-border bg-card/75 p-5 transition duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
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
        ) : null}
      </section>

      <section
        id="about"
        className="border-y border-border bg-[#1f1b1a] py-20 text-white"
      >
        <div className="container">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-heading text-4xl leading-tight tracking-tight md:text-6xl">
              About Me
            </h2>
            <Link
              href="/api/resume"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-fit gap-2 rounded-full px-6"
              )}
            >
              个人简历
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="container scroll-m-24 py-20 md:py-24">
        <Reveal className="grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <h2 className="mt-4 font-heading text-5xl leading-tight tracking-tight md:text-6xl">
              Looking forward to building clear things together.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="mailto:wangxy19971219@163.com"
              className="group rounded-[8px] border border-border bg-card/75 p-5 transition hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30"
            >
              <Mail className="h-5 w-5 text-muted-foreground" />
              <p className="mt-5 text-lg font-semibold">Email</p>
              <p className="mt-2 text-sm text-muted-foreground">
                wangxy19971219@163.com
              </p>
            </Link>
            <Link
              href="/about"
              className="group rounded-[8px] border border-border bg-card/75 p-5 transition hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30"
            >
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <p className="mt-5 text-lg font-semibold">Resume</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Full experience, education, awards, and operating style.
              </p>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
