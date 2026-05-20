import { Metadata } from "next"
import Link from "next/link"
import { Download, ExternalLink } from "lucide-react"

import { getResumeCaseStudy } from "@/lib/notion"
import { cn } from "@/lib/utils"
import {
  designPrinciples,
  experience,
  resumeSummary,
  toolStack,
} from "@/lib/portfolio-content"
import { ProjectCover } from "@/components/portfolio/project-cover"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Cherie Wang, AI Native UX Designer focused on systems thinking and product workflows.",
}

export default async function AboutPage() {
  const resume = await getResumeCaseStudy()
  const resumePdf = resume?.attachments?.find((attachment) =>
    attachment.name.toLowerCase().endsWith(".pdf")
  )

  return (
    <main className="container py-16 md:py-24">
      <Reveal className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
          Design for systems that help people think.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
          I work at the intersection of UX, product structure, content systems,
          and AI-assisted making. My bias is toward quiet interfaces, strong
          information architecture, and workflows that become easier to operate
          over time.
        </p>
      </Reveal>

      <section className="mt-16 grid gap-8 rounded-2xl border bg-card/70 p-5 md:p-8 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Resume
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {resume?.title ?? "王馨悦个人简历"}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            The resume is synced from the dedicated Notion document, separate
            from the Projects case-study archive.
          </p>
          {resume ? (
            <>
              <ProjectCover
                src={resume.cover}
                alt={resume.coverAlt}
                className="mt-6 aspect-[1.35/1]"
              />
              <Link
                href={resume.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition hover:text-muted-foreground"
              >
                Open Notion resume
                <ExternalLink className="h-4 w-4" />
              </Link>
              {resumePdf ? (
                <Link
                  href="/api/resume"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-5 w-full gap-2"
                  )}
                >
                  Download PDF Resume
                  <Download className="h-4 w-4" />
                </Link>
              ) : null}
            </>
          ) : null}
        </Reveal>

        <div className="min-w-0 rounded-xl border bg-background/70 p-5 md:p-7">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Resume Snapshot
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {resumeSummary.intro}
          </p>
          <div className="mt-6 grid gap-3">
            {resumeSummary.highlights.map((item) => (
              <div
                key={item}
                className="rounded-lg border bg-card/70 px-4 py-3 text-sm leading-7 text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-4">
            {resumeSummary.experience.map((item) => (
              <div key={item.company} className="border-t pt-4">
                <div className="flex flex-col justify-between gap-1 md:flex-row">
                  <div>
                    <h3 className="font-semibold">{item.company}</h3>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-4 border-t pt-5 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Education</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {resumeSummary.education}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Awards</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {resumeSummary.awards}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">
            Design philosophy
          </h2>
          <p className="mt-4 text-muted-foreground">
            Less performance, more operating system. The portfolio should feel
            like a tool for understanding the work.
          </p>
        </Reveal>
        <MotionGrid className="grid gap-4 md:grid-cols-2">
          {designPrinciples.map((principle) => (
            <MotionItem key={principle.title}>
              <div className="h-full rounded-xl border bg-card/70 p-5">
                <h3 className="text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionGrid>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
        </Reveal>
        <div className="grid gap-4">
          {experience.map((item) => (
            <div key={item.role} className="rounded-xl border bg-card/70 p-5">
              <div className="flex flex-col justify-between gap-2 md:flex-row">
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.place}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border bg-card/70 p-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Skills / Tool stack
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {toolStack.map((tool) => {
            const Icon = tool.icon

            return (
              <div
                key={tool.label}
                className="flex items-center gap-3 rounded-xl border bg-background p-3"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{tool.label}</span>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
