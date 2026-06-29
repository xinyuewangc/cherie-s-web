import { Metadata } from "next"

import { getPortfolioProjects } from "@/lib/notion"
import { ProjectCard } from "@/components/portfolio/project-card"

export const metadata: Metadata = {
  title: "Work List",
  description:
    "A Notion-backed work list for product projects, platform flows, design systems, and AI-native workflow experiments.",
}

export const revalidate = 300

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects()

  return (
    <main>
      <section className="border-b border-border bg-[#fbf7ef] pb-8 pt-10 dark:bg-background md:pb-10 md:pt-12">
        <div className="container">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Work
          </p>
          <h1 className="mt-5 font-heading text-6xl leading-[0.96] tracking-tight md:text-8xl">
            MY PROJECTS
          </h1>
        </div>
      </section>

      <section className="portfolio-grid-bg pb-16 pt-6 md:pb-20 md:pt-8">
        <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}
