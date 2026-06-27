import { Metadata } from "next"

import { getPortfolioProjects } from "@/lib/notion"
import { ProjectCard } from "@/components/portfolio/project-card"
import { MotionGrid, Reveal } from "@/components/portfolio/reveal"

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
      <section className="border-b border-black/10 bg-[#fbf7ef]">
        <div className="container py-20 md:py-24">
          <Reveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Work List
            </p>
            <h1 className="mt-5 font-heading text-6xl leading-[0.96] tracking-tight md:text-8xl">
              A quieter archive for everything beyond the four main cases.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              The homepage keeps the spotlight tight. This page keeps the rest
              of the work visible, searchable, and synced from Notion.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-grid-bg py-16 md:py-20">
        <MotionGrid className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </MotionGrid>
      </section>
    </main>
  )
}
