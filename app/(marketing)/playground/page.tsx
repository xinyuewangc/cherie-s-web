import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { playgroundDemos } from "@/lib/portfolio-content"
import PlaygroundPanel from "@/components/portfolio/playground-panel"
import { MotionGrid, MotionItem, Reveal } from "@/components/portfolio/reveal"

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactive AI-native UX experiments for product thinking and interface systems.",
}

export default function PlaygroundPage() {
  return (
    <main>
      <section className="border-b border-border bg-[#fbf7ef] dark:bg-background">
        <div className="container py-20 md:py-24">
          <Reveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Playground
            </p>
            <h1 className="mt-5 font-heading text-6xl leading-[0.96] tracking-tight md:text-8xl">
              Interactive experiments for thinking through systems.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Live surfaces for theme generation, OKLCH color thinking, prompt
              systems, motion response, and AI-assisted interface concepts.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <PlaygroundPanel />

        <MotionGrid className="mt-12 grid gap-4 md:grid-cols-3">
          {playgroundDemos.map((demo) => {
            const Icon = demo.icon

            return (
              <MotionItem key={demo.title} className="group">
                <Link
                  id={demo.href.split("#")[1]}
                  href={demo.href}
                  className="block h-full scroll-mt-28 rounded-[8px] border border-border bg-card/75 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-black/5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background dark:hover:shadow-black/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                      {demo.status}
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight">
                      {demo.title}
                    </h2>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {demo.description}
                  </p>
                </Link>
              </MotionItem>
            )
          })}
        </MotionGrid>
      </section>
    </main>
  )
}
