"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Command } from "lucide-react"

import { PortfolioProject } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { CommandMenu } from "@/components/portfolio/command-menu"

type PortfolioShellProps = {
  children: React.ReactNode
  projects: PortfolioProject[]
}

const topLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/projects", label: "Work", match: "/projects" },
  { href: "/lab", label: "Lab", match: "/lab" },
  { href: "/about", label: "About", match: "/about" },
]

export function PortfolioShell({ children, projects }: PortfolioShellProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="relative min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-background text-sm"
      >
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-5 md:h-[72px] md:grid-cols-[1fr_auto_1fr] md:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white font-mono text-xs font-semibold shadow-sm">
              CW
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate font-semibold leading-none tracking-tight">
                Xinyue Wang
              </span>
              <span className="mt-1 block truncate text-xs text-muted-foreground">
                UX designer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {topLinks.map((item) => {
              const active = item.match ? pathname?.startsWith(item.match) : false

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-muted-foreground transition hover:bg-white/70 hover:text-foreground",
                    active && "bg-white text-foreground shadow-sm"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 text-muted-foreground shadow-sm transition hover:bg-white hover:text-foreground"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden text-sm sm:inline">Search</span>
              <kbd className="hidden rounded-full border border-black/10 bg-background px-1.5 py-0.5 text-[9px] lg:inline">
                Ctrl K
              </kbd>
            </button>
            <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-muted-foreground shadow-sm transition hover:bg-white hover:text-foreground [&_svg]:h-4 [&_svg]:w-4">
              <ModeToggle />
            </div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-black/10 px-5 py-2 md:hidden">
          {topLinks.map((item) => {
            const active = item.match ? pathname?.startsWith(item.match) : false

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-white/70 hover:text-foreground",
                  active && "bg-white text-foreground shadow-sm"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </motion.header>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 pt-[113px] md:pt-[72px]"
      >
        {children}
      </motion.div>

      <CommandMenu open={open} onOpenChange={setOpen} projects={projects} />
    </div>
  )
}
