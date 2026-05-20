"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  Code2,
  Command,
  Network,
} from "lucide-react"

import { PortfolioProject } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { CommandMenu } from "@/components/portfolio/command-menu"
import { CursorGlow } from "@/components/portfolio/cursor-glow"
import { DockNav } from "@/components/portfolio/dock-nav"

type PortfolioShellProps = {
  children: React.ReactNode
  projects: PortfolioProject[]
}

const labMenuLinks = [
  {
    href: "/lab#design-engineering",
    label: "Design Engineering",
    description: "Tokens, components, theme architecture",
    icon: Code2,
  },
  {
    href: "/lab#ai-workflow",
    label: "AI Workflow",
    description: "Agents, prompts, MCP, Notion pipeline",
    icon: Bot,
  },
  {
    href: "/lab#system-thinking",
    label: "System Thinking",
    description: "IA, permission logic, scalable systems",
    icon: Network,
  },
]

export function PortfolioShell({ children, projects }: PortfolioShellProps) {
  const [open, setOpen] = React.useState(false)
  const [labMenuOpen, setLabMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const topLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "Lab" },
    { href: "/playground", label: "Playground" },
    { href: "/about", label: "About" },
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="portfolio-grid-bg pointer-events-none fixed inset-0 z-0 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[560px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent-soft)/0.42),transparent_54%)]" />
      <CursorGlow />
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-3 top-3 z-40 mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-border/70 bg-background/80 px-3 py-2 text-sm shadow-sm backdrop-blur-xl"
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl border bg-card font-mono text-[11px]">
            CW
          </span>
          <span className="font-medium">Cherie Wang</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {topLinks.map((item) => {
              const active = pathname?.startsWith(item.href)

              if (item.href === "/lab") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setLabMenuOpen(true)}
                    onMouseLeave={() => setLabMenuOpen(false)}
                    onFocusCapture={() => setLabMenuOpen(true)}
                    onBlurCapture={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget as Node | null
                        )
                      ) {
                        setLabMenuOpen(false)
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-xl px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                        active && "bg-muted text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                    <div
                      className={cn(
                        "absolute left-1/2 top-full w-[360px] -translate-x-1/2 pt-3 transition duration-200",
                        labMenuOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-1 opacity-0"
                      )}
                    >
                      <div className="rounded-2xl border border-border/70 bg-background/95 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40">
                        {labMenuLinks.map((link) => {
                          const Icon = link.icon

                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="group/item grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl p-3 transition hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                            >
                              <span className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-muted-foreground transition group-hover/item:text-foreground">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-medium text-foreground">
                                  {link.label}
                                </span>
                                <span className="mt-1 block truncate text-xs text-muted-foreground">
                                  {link.description}
                                </span>
                              </span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover/item:translate-x-1 group-hover/item:text-foreground" />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    active && "bg-muted text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="h-6 w-px bg-border" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <Command className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded-md border bg-background px-1.5 py-0.5 text-[10px] lg:inline">
              ⌘K
            </kbd>
          </button>
          <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <ModeToggle />
          </div>
        </div>
      </motion.header>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 pb-28"
      >
        {children}
      </motion.div>
      <DockNav />
      <CommandMenu open={open} onOpenChange={setOpen} projects={projects} />
    </div>
  )
}
