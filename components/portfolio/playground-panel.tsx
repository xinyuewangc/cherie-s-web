"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const prompts = [
  "Map a creator payout flow",
  "Audit a launcher settings IA",
  "Turn notes into a case study",
]

const surfaces = ["Actors", "States", "Risks", "Artifacts"]

export function PlaygroundPanel() {
  const [activePrompt, setActivePrompt] = React.useState(prompts[0])
  const [density, setDensity] = React.useState(2)

  return (
    <div className="rounded-2xl border bg-card/70 p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Input
          </p>
          <div className="mt-4 grid gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setActivePrompt(prompt)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-sm transition",
                  activePrompt === prompt
                    ? "border-foreground/30 bg-foreground text-background"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {prompt}
              </button>
            ))}
          </div>
          <label className="mt-6 block text-sm text-muted-foreground">
            Detail density
          </label>
          <input
            type="range"
            min={1}
            max={4}
            value={density}
            onChange={(event) => setDensity(Number(event.target.value))}
            className="mt-3 w-full accent-foreground"
          />
        </div>

        <div className="rounded-xl border bg-background p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Generated map
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{activePrompt}</h2>
            </div>
            <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              live
            </span>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {surfaces.map((surface, index) => (
              <motion.div
                key={`${activePrompt}-${surface}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border bg-card p-4"
              >
                <p className="text-sm font-medium">{surface}</p>
                <div className="mt-4 grid gap-2">
                  {Array.from({ length: density + index }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="h-2 rounded-full bg-muted"
                      style={{ width: `${72 + ((itemIndex * 17) % 24)}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
