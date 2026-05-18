"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Beaker,
  Briefcase,
  FileText,
  Home,
  Search,
  User,
  Zap,
} from "lucide-react"

import { PortfolioProject } from "@/lib/notion"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

type CommandMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  projects: PortfolioProject[]
}

const pages = [
  { label: "Home", href: "/", icon: Home, shortcut: "H" },
  { label: "Work", href: "/work", icon: Briefcase, shortcut: "W" },
  { label: "Lab", href: "/lab", icon: Zap, shortcut: "L" },
  { label: "Playground", href: "/playground", icon: Beaker, shortcut: "P" },
  { label: "About", href: "/about", icon: User, shortcut: "A" },
]

export function CommandMenu({
  open,
  onOpenChange,
  projects,
}: CommandMenuProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onOpenChange, open])

  function goTo(href: string) {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, work, lab notes..." />
      <CommandList>
        <CommandEmpty>No result found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {pages.map((page) => {
            const Icon = page.icon

            return (
              <CommandItem
                key={page.href}
                value={page.label}
                onSelect={() => goTo(page.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{page.label}</span>
                <CommandShortcut>{page.shortcut}</CommandShortcut>
              </CommandItem>
            )
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Selected work">
          {projects.slice(0, 8).map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.title} ${project.description}`}
              onSelect={() => goTo(`/work/${project.slug}`)}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{project.title}</span>
              <CommandShortcut>{project.year}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => goTo("/work")}>
            <Search className="mr-2 h-4 w-4" />
            <span>View all work</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
