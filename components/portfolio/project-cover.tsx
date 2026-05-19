"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type ProjectCoverProps = {
  src?: string | null
  alt: string
  className?: string
  priority?: boolean
}

function LoadingVisual({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-500",
        hidden ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="cover-grid-bg opacity-45 absolute inset-0" />
      <div className="cover-loading-breathe absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,hsl(var(--foreground)/0.11),transparent_30%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]" />
      <div className="cover-shimmer via-white/45 absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent to-transparent dark:via-white/10" />
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/30 [animation-delay:160ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/20 [animation-delay:320ms]" />
      </div>
      <div className="absolute inset-x-4 bottom-4 h-px overflow-hidden rounded-full bg-foreground/10">
        <div className="cover-loading-line bg-foreground/35 h-full w-1/3 rounded-full" />
      </div>
    </div>
  )
}

export function ProjectCover({
  src,
  alt,
  className,
  priority = false,
}: ProjectCoverProps) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  if (!src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border bg-[radial-gradient(circle_at_25%_10%,hsl(var(--foreground)/0.14),transparent_32%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]",
          className
        )}
      >
        <div className="cover-grid-bg absolute inset-0 opacity-50" />
        <div className="absolute bottom-4 left-4 rounded-full border bg-background/75 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          Cover pending
        </div>
      </div>
    )
  }

  if (failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border bg-[radial-gradient(circle_at_25%_10%,hsl(var(--foreground)/0.14),transparent_32%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]",
          className
        )}
      >
        <div className="cover-grid-bg absolute inset-0 opacity-50" />
        <div className="absolute bottom-4 left-4 rounded-full border bg-background/75 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          Preview unavailable
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-muted", className)}>
      <LoadingVisual hidden={loaded} />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        sizes="(min-width: 1024px) 45vw, 100vw"
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "object-cover text-transparent opacity-0 transition duration-700 group-hover:scale-[1.03]",
          loaded && "opacity-100"
        )}
      />
    </div>
  )
}
