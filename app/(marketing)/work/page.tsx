import { Metadata } from "next"

import { getPortfolioProjects } from "@/lib/notion"
import { ProjectCard } from "@/components/portfolio/project-card"
import { MotionGrid, Reveal } from "@/components/portfolio/reveal"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected AI-native UX, product systems, and design engineering case studies.",
}

export const revalidate = 300

export default async function WorkPage() {
  const projects = await getPortfolioProjects()

  return (
    <main className="container py-16 md:py-24">
      <Reveal className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Work
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
          Case studies as living systems.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
          A Notion-backed archive of product work, platform flows, design
          systems, and AI-native workflow experiments.
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
