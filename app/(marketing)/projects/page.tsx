import { Metadata } from "next"

import { getPortfolioProjects } from "@/lib/notion"
import { ProjectCard } from "@/components/portfolio/project-card"
import { MotionGrid, Reveal } from "@/components/portfolio/reveal"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A Notion-backed project system for AI-native UX, product systems, and design engineering work.",
}

export const revalidate = 300

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects()

  return (
    <main className="container py-16 md:py-24">
      <Reveal className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Projects
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
          Project systems, not portfolio slides.
        </h1>
        <p className="mt-6 text-lg leading-7 text-muted-foreground md:text-xl md:leading-8">
          A Notion-backed workspace for product projects, platform flows,
          design systems, and AI-native workflow experiments.
        </p>
      </Reveal>

      <MotionGrid className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index === 0 && Boolean(project.cover)}
          />
        ))}
      </MotionGrid>
    </main>
  )
}
