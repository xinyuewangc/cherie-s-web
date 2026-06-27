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

const PROJECT_PLACEHOLDER_SRC = "/images/project-placeholder.png"

export function ProjectCover({
  src,
  alt,
  className,
  priority = false,
}: ProjectCoverProps) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const usesPlaceholder = !src || failed
  const imageSrc = usesPlaceholder ? PROJECT_PLACEHOLDER_SRC : src

  React.useEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [src])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-muted",
        className
      )}
    >
      {!usesPlaceholder ? <ImageLoadingState hidden={loaded} /> : null}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        sizes="(min-width: 1024px) 45vw, 100vw"
        onLoadingComplete={() => setLoaded(true)}
        onError={() => {
          if (!usesPlaceholder) {
            setFailed(true)
          }
        }}
        className={cn(
          "object-cover text-transparent transition duration-700 group-hover:scale-[1.03]",
          usesPlaceholder ? "opacity-100" : "opacity-0",
          loaded && "opacity-100"
        )}
      />
    </div>
  )
}
