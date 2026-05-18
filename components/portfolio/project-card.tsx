import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { PortfolioProject } from "@/lib/notion"
import { ProjectCover } from "@/components/portfolio/project-cover"
import { MotionItem } from "@/components/portfolio/reveal"

type ProjectCardProps = {
  project: PortfolioProject
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <MotionItem className={featured ? "group md:col-span-2" : "group"}>
      <Link
        href={`/work/${project.slug}`}
        className={
          featured
            ? "grid h-full gap-2 rounded-xl border border-border/70 bg-card/70 p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-card hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/30 md:grid-cols-[1.05fr_0.95fr]"
            : "block h-full rounded-xl border border-border/70 bg-card/70 p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-card hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/30"
        }
      >
        <ProjectCover
          src={project.cover}
          alt={project.coverAlt}
          className={
            featured
              ? "aspect-[1.35/1] md:aspect-auto md:min-h-[360px]"
              : "aspect-[1.35/1]"
          }
          priority={featured}
        />
        <div className={featured ? "flex flex-col p-4 md:p-6" : "p-4"}>
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span>{project.collaborator || "Case study"}</span>
            <span>{project.year}</span>
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight">
              {project.title}
            </h3>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(project.tags.length ? project.tags : ["Portfolio"])
              .slice(0, 4)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </Link>
    </MotionItem>
  )
}
