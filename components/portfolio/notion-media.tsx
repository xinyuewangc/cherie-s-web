"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { ImageLoadingState } from "@/components/portfolio/image-loading-state"

type NotionImageProps = {
  src: string
  alt: string
  className?: string
}

type MdxImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt?: string
  wrapperClassName?: string
}

function useLoadingVisibility(loaded: boolean) {
  const [canHide, setCanHide] = React.useState(false)

  React.useEffect(() => {
    if (!loaded) {
      setCanHide(false)
      return
    }

    const timer = window.setTimeout(() => setCanHide(true), 450)

    return () => window.clearTimeout(timer)
  }, [loaded])

  return loaded && canHide
}

function aspectRatioFromProps({
  width,
  height,
}: Pick<MdxImageProps, "width" | "height">) {
  const numericWidth = Number(width)
  const numericHeight = Number(height)

  if (
    Number.isFinite(numericWidth) &&
    Number.isFinite(numericHeight) &&
    numericWidth > 0 &&
    numericHeight > 0
  ) {
    return `${numericWidth} / ${numericHeight}`
  }

  return "16 / 10"
}

export function NotionImage({ src, alt, className }: NotionImageProps) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const hideLoading = useLoadingVisibility(loaded)

  if (failed) {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] w-full items-end overflow-hidden rounded-xl border bg-[radial-gradient(circle_at_25%_10%,hsl(var(--foreground)/0.14),transparent_32%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]",
          className
        )}
      >
        <div className="cover-grid-bg absolute inset-0 opacity-50" />
        <div className="relative m-4 max-w-[calc(100%-2rem)] rounded-xl border bg-background/80 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <span className="block font-medium text-foreground">
            Preview unavailable
          </span>
          <span className="mt-1 block">
            The source may be private, expired, or blocked by the host.
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <ImageLoadingState hidden={hideLoading} />
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={960}
        unoptimized
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "h-auto w-full object-cover text-transparent opacity-0 transition duration-700",
          loaded && "opacity-100"
        )}
      />
    </div>
  )
}

export function MdxImage({
  src,
  alt = "",
  className,
  wrapperClassName,
  width,
  height,
  onLoad,
  onError,
  ...props
}: MdxImageProps) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const hideLoading = useLoadingVisibility(loaded)

  const ratio = aspectRatioFromProps({ width, height })

  if (failed) {
    return (
      <span
        className={cn(
          "relative my-8 flex w-full items-end overflow-hidden rounded-xl border bg-[radial-gradient(circle_at_25%_10%,hsl(var(--foreground)/0.14),transparent_32%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]",
          wrapperClassName
        )}
        style={{ aspectRatio: ratio }}
      >
        <span className="cover-grid-bg absolute inset-0 opacity-50" />
        <span className="relative m-4 max-w-[calc(100%-2rem)] rounded-xl border bg-background/80 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <span className="block font-medium text-foreground">
            Preview unavailable
          </span>
          <span className="mt-1 block">
            The source may be private, expired, or blocked by the host.
          </span>
        </span>
      </span>
    )
  }

  return (
    <span
      className={cn(
        "relative my-8 block w-full overflow-hidden rounded-xl border bg-card shadow-sm",
        wrapperClassName
      )}
      style={{ aspectRatio: ratio }}
    >
      <ImageLoadingState hidden={hideLoading} as="span" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        onError={(event) => {
          setFailed(true)
          onError?.(event)
        }}
        className={cn(
          "absolute inset-0 h-full w-full bg-background object-contain text-transparent opacity-0 transition duration-700",
          loaded && "opacity-100",
          className
        )}
        {...props}
      />
    </span>
  )
}
