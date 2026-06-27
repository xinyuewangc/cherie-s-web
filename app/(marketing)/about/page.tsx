import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
} from "lucide-react"

import { getResumeCaseStudy } from "@/lib/notion"
import {
  designPrinciples,
  resumeSummary,
  toolStack,
} from "@/lib/portfolio-content"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Cherie Wang, a UX designer working across complex systems, AI Native workflows, and design engineering.",
}

const notionResumeUrl =
  "https://www.notion.so/xinyuewang/Xinyue-Wang-UX-38759cfd921d8076bed6e1fdffd68547?source=copy_link"

const profileFacts = [
  ["Current", "UX Designer at miHoYo"],
  ["Focus", "Complex systems, AI Native workflow, data products"],
  ["Education", "RCA Service Design, LBS exchange, Jiangnan University"],
  ["Mode", "Design, prototype, validate, document, ship"],
]

export default async function AboutPage() {
  const resume = await getResumeCaseStudy()
  const resumePdf = resume?.attachments?.find((attachment) =>
    attachment.name.toLowerCase().endsWith(".pdf")
  )

  return (
    <main>
      <section className="border-b border-black/10 bg-[#fbf7ef]">
        <div className="container grid gap-12 py-20 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              About Cherie
            </p>
            <h1 className="mt-5 max-w-4xl font-heading text-6xl leading-[0.96] tracking-tight md:text-8xl">
              Designer for complex product systems.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              {resumeSummary.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={resume?.url ?? notionResumeUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 rounded-full bg-[#1b1514] px-6"
                )}
              >
                Open Notion resume
                <ExternalLink className="h-4 w-4" />
              </Link>
              {resumePdf ? (
                <Link
                  href="/api/resume"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-black/15 gap-2 rounded-full bg-white/60 px-6"
                  )}
                >
                  Download PDF
                  <Download className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[8px] border border-black/10 bg-white/70 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/10 bg-[#f1f6dd] font-heading text-2xl font-semibold">
                  CW
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Xinyue Wang
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    UX designer, system thinker, AI workflow builder
                  </p>
                </div>
              </div>
              <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
                {profileFacts.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-3 py-4 md:grid-cols-[150px_1fr]"
                  >
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-sm leading-6">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container py-20 md:py-24">
        <Reveal className="mb-10">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Experience
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {resumeSummary.experience.map((item) => (
            <Reveal key={item.company} className="py-8 md:py-10">
              <div
                tabIndex={0}
                className="group grid gap-7 outline-none lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]"
              >
                <div className="lg:pr-6">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.role}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.period}
                  </p>
                </div>

                <div className="space-y-5 text-base leading-8 text-muted-foreground">
                  {item.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {item.details ? (
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <ul className="space-y-4 pt-1 opacity-0 transition duration-500 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2">
                          {item.details.map((detail) => (
                            <li
                              key={detail.title}
                              className="grid gap-2 md:grid-cols-[136px_1fr]"
                            >
                              <span className="font-medium text-foreground">
                                {detail.title}
                              </span>
                              <span>{detail.body}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container grid gap-10 py-20 md:py-24 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Principles
          </p>
          <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
            How the work should feel.
          </h2>
        </Reveal>
        <MotionGrid className="grid gap-4 md:grid-cols-2">
          {designPrinciples.map((principle) => (
            <MotionItem key={principle.title}>
              <div className="h-full rounded-[8px] border border-black/10 bg-white/70 p-5">
                <h3 className="text-xl font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionGrid>
      </section>

      <section className="border-y border-black/10 bg-[#1f1b1a] py-20 text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="text-white/45 text-sm font-medium uppercase tracking-[0.2em]">
              Education and Awards
            </p>
            <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
              A service design base with product craft around it.
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[8px] border border-white/10 bg-white/[0.06] p-5">
                <GraduationCap className="text-white/55 h-5 w-5" />
                <h3 className="mt-5 text-xl font-semibold">Education</h3>
                <p className="text-white/65 mt-3 text-sm leading-7">
                  {resumeSummary.education}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-[8px] border border-white/10 bg-white/[0.06] p-5">
                <Award className="text-white/55 h-5 w-5" />
                <h3 className="mt-5 text-xl font-semibold">Awards</h3>
                <p className="text-white/65 mt-3 text-sm leading-7">
                  {resumeSummary.awards}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Tool Stack
            </p>
            <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
              Tools are part of the thinking surface.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {toolStack.map((tool) => {
              const Icon = tool.icon

              return (
                <div
                  key={tool.label}
                  className="flex items-center gap-3 rounded-[8px] border border-black/10 bg-white/70 p-3 text-sm"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{tool.label}</span>
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-black/10 pt-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-heading text-4xl tracking-tight">
                Let us talk through a messy system.
              </h2>
              <p className="mt-3 text-muted-foreground">
                I am usually happiest where product logic, interface structure,
                and team workflow all need to become clearer.
              </p>
            </div>
            <Link
              href="mailto:wangxy19971219@163.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b1514] px-6 py-3 text-sm font-medium text-white transition hover:translate-x-1"
            >
              <Mail className="h-4 w-4" />
              Email Cherie
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
