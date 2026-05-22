import { Metadata } from "next"

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
    <main className="container py-16 md:py-24">
      <Reveal className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Playground
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight md:text-7xl">
          Interactive experiments for thinking through systems.
        </h1>
        <p className="mt-6 text-lg leading-7 text-muted-foreground md:text-xl md:leading-8">
          Live surfaces for theme generation, OKLCH color thinking, prompt
          systems, motion response, and AI-assisted interface concepts.
        </p>
      </Reveal>

      <div className="mt-12">
        <PlaygroundPanel />
      </div>

      <MotionGrid className="mt-12 grid gap-4 md:grid-cols-3">
        {playgroundDemos.map((demo) => {
          const Icon = demo.icon

          return (
            <MotionItem key={demo.title}>
              <div className="h-full rounded-xl border bg-card/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {demo.status}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold">{demo.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {demo.description}
                </p>
              </div>
            </MotionItem>
          )
        })}
      </MotionGrid>
    </main>
  )
}
