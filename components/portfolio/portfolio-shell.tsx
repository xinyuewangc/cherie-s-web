"use client"

import * as React from "react"

import { PortfolioProject } from "@/lib/notion"
import { CommandMenu } from "@/components/portfolio/command-menu"
import { CursorGlow } from "@/components/portfolio/cursor-glow"
import { DockNav } from "@/components/portfolio/dock-nav"

type PortfolioShellProps = {
  children: React.ReactNode
  projects: PortfolioProject[]
}

export function PortfolioShell({ children, projects }: PortfolioShellProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="portfolio-grid-bg pointer-events-none fixed inset-0 z-0 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[560px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent-soft)/0.42),transparent_54%)]" />
      <CursorGlow />
      <div className="relative z-10 pb-28">{children}</div>
      <DockNav onCommandOpen={() => setOpen(true)} />
      <CommandMenu open={open} onOpenChange={setOpen} projects={projects} />
    </div>
  )
}
