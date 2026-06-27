"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Briefcase,
  User,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

const links = [
  { href: "/projects", label: "Work", icon: Briefcase },
  { href: "/lab", label: "Lab", icon: Zap },
  { href: "/about", label: "About", icon: User },
]

export function DockNav() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/85 fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center rounded-[8px] border border-border/70 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40 md:hidden"
    >
      <div className="flex items-center gap-1">
        {links.map((item) => {
          const Icon = item.icon
          const active = pathname?.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-muted-foreground transition hover:bg-muted hover:text-foreground sm:w-auto sm:px-3",
                active && "text-foreground"
              )}
              aria-label={item.label}
            >
              {active ? (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-[8px] bg-muted"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <Icon className="relative h-4 w-4" />
              <span className="relative ml-2 hidden text-sm sm:inline">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
