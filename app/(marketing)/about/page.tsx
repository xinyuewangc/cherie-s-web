import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react"

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

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-border bg-[#fbf7ef] dark:bg-background">
        <div className="container py-20 md:py-24">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-4xl font-heading text-6xl leading-[0.96] tracking-tight md:text-8xl">
              About Me
            </h1>
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

      <section className="container py-20 md:py-24">
        <Reveal className="mb-10">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Experience
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-border border-y border-border">
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

      <section className="container py-8 md:py-12">
        <Reveal className="border-y border-border py-6 md:py-9">
          <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Education
                </p>
              </div>
              <h2 className="mt-2 font-heading text-xl tracking-tight md:mt-3 md:text-3xl">
                A compact design foundation.
              </h2>
            </div>
            <p className="hidden max-w-lg text-sm leading-6 text-muted-foreground md:block md:text-right">
              Service design, prototyping, product design, and interaction
              design across graduate study and focused exchanges.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 md:gap-3 xl:grid-cols-4">
            {resumeSummary.education.map((item) => (
              <article
                key={item.school}
                className="rounded-[8px] border border-border bg-card/75 p-3 transition hover:-translate-y-1 hover:bg-card md:p-4"
              >
                <div className="flex h-full flex-col justify-between gap-3 md:gap-4">
                  <div>
                    <h3 className="text-base font-semibold leading-tight tracking-tight md:text-lg">
                      {item.school}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground md:mt-2 md:text-sm md:leading-6">
                      {[item.program, item.format].filter(Boolean).join("｜")}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs md:text-sm">
                    <p className="text-muted-foreground">{item.period}</p>
                    {item.note ? (
                      <p className="font-medium text-foreground">{item.note}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
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
              <div className="h-full rounded-[8px] border border-border bg-card/75 p-5">
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

      <section className="border-y border-border bg-[#1f1b1a] py-20 text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="text-white/45 text-sm font-medium uppercase tracking-[0.2em]">
              Awards
            </p>
            <h2 className="mt-4 font-heading text-4xl tracking-tight md:text-5xl">
              Recognition across innovation, entrepreneurship, and product craft.
            </h2>
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
                  className="flex items-center gap-3 rounded-[8px] border border-border bg-card/75 p-3 text-sm"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{tool.label}</span>
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-border pt-10">
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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:translate-x-1 hover:bg-primary/90"
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
