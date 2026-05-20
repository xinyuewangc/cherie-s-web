"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { ImageLoadingState } from "@/components/portfolio/image-loading-state"

type ProjectCoverProps = {
  src?: string | null
  alt: string
  className?: string
  priority?: boolean
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
      <ImageLoadingState hidden={loaded} />
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
