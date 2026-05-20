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
  MapPin,
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
    { href: "/projects", label: "Work" },
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
        className="fixed inset-x-0 top-0 z-40 bg-background/80 text-sm backdrop-blur-xl"
      >
        <div className="mx-auto grid h-20 max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-7">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-card font-mono text-xs shadow-sm">
              CW
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate font-semibold leading-none tracking-tight">
                Cherie Wang
              </span>
              <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                AI-native systems
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
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
                        "relative isolate rounded-full px-3.5 py-2 text-muted-foreground transition-colors duration-300 hover:bg-muted/60 hover:text-foreground",
                        active && "text-foreground hover:bg-transparent"
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="top-nav-active"
                          className="absolute inset-0 rounded-full bg-muted"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                            mass: 0.7,
                          }}
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
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
                    "relative isolate rounded-full px-3.5 py-2 text-muted-foreground transition-colors duration-300 hover:bg-muted/60 hover:text-foreground",
                    active && "text-foreground hover:bg-transparent"
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="top-nav-active"
                      className="absolute inset-0 rounded-full bg-muted"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                        mass: 0.7,
                      }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-3">
            <div className="hidden items-center gap-2 border-r border-border/80 pr-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:flex">
              <MapPin className="h-3.5 w-3.5" />
              <span>Shanghai, China</span>
              <span className="text-muted-foreground/45">UTC+8</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 items-center gap-2 rounded-full border bg-card px-3 text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden text-sm sm:inline">Search</span>
              <kbd className="hidden rounded-full border bg-background px-1.5 py-0.5 text-[9px] lg:inline">
                ⌘K
              </kbd>
            </button>
            <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground [&_svg]:h-4 [&_svg]:w-4">
              <ModeToggle />
            </div>
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
