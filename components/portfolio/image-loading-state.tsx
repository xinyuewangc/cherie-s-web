import { cn } from "@/lib/utils"

type ImageLoadingStateProps = {
  hidden: boolean
  as?: "div" | "span"
  title?: string
  subtitle?: string
}

export function ImageLoadingState({
  hidden,
  as = "div",
  title = "Loading preview",
  subtitle = "Hold on...",
}: ImageLoadingStateProps) {
  const Component = as

  return (
    <Component
      aria-hidden="true"
      className={cn(
        "absolute inset-0 grid place-items-center overflow-hidden bg-[#f7f7fa] text-center transition-opacity duration-500 dark:bg-muted",
        hidden ? "opacity-0" : "opacity-100"
      )}
    >
      <span className="cover-grid-bg absolute inset-0 opacity-25" />
      <span className="relative flex flex-col items-center">
        <span className="border-muted-foreground/35 h-9 w-9 animate-spin rounded-full border-2 border-dashed" />
        <span className="mt-5 text-sm font-semibold leading-none text-muted-foreground">
          {title}
        </span>
        <span className="mt-2 text-sm leading-none text-muted-foreground/60">
          {subtitle}
        </span>
      </span>
    </Component>
  )
}
