import Image from "next/image"
import Link from "next/link"
import { Check, Circle, ExternalLink } from "lucide-react"

import { NotionBlock } from "@/lib/notion"
import { cn } from "@/lib/utils"

type NotionRendererProps = {
  blocks: NotionBlock[]
}

function TextBlock({
  block,
  className,
}: {
  block: NotionBlock
  className?: string
}) {
  if (!block.text && !block.children?.length) {
    return null
  }

  return (
    <p className={cn("text-base leading-8 text-muted-foreground", className)}>
      {block.text}
      <NestedBlocks blocks={block.children ?? []} />
    </p>
  )
}

function Heading({ block, level }: { block: NotionBlock; level: 2 | 3 }) {
  if (!block.text) {
    return null
  }

  if (level === 2) {
    return (
      <section id={block.id} className="scroll-m-28 pt-8">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {block.text}
        </h2>
        <NestedBlocks blocks={block.children ?? []} />
      </section>
    )
  }

  return (
    <section id={block.id} className="scroll-m-28 pt-5">
      <h3 className="text-xl font-semibold tracking-tight">{block.text}</h3>
      <NestedBlocks blocks={block.children ?? []} />
    </section>
  )
}

function MediaBlock({ block }: { block: NotionBlock }) {
  if (!block.url) {
    return null
  }

  if (block.type === "video") {
    return (
      <figure className="my-8 overflow-hidden rounded-xl border bg-card">
        <video src={block.url} controls className="aspect-video w-full bg-black" />
        {block.caption ? (
          <figcaption className="border-t px-4 py-3 text-sm text-muted-foreground">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    )
  }

  if (block.type === "embed") {
    return (
      <figure className="my-8 overflow-hidden rounded-xl border bg-card">
        <iframe
          src={block.url}
          title={block.caption || "Embedded project media"}
          className="aspect-video w-full"
          loading="lazy"
        />
      </figure>
    )
  }

  return (
    <figure className="my-8 overflow-hidden rounded-xl border bg-card">
      <Image
        src={block.url}
        alt={block.caption || "Project artifact"}
        width={1440}
        height={960}
        unoptimized
        className="h-auto w-full bg-muted object-cover"
      />
      {block.caption ? (
        <figcaption className="border-t px-4 py-3 text-sm text-muted-foreground">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function ListItem({
  block,
  ordered,
}: {
  block: NotionBlock
  ordered?: boolean
}) {
  return (
    <li className="pl-1 text-base leading-8 text-muted-foreground">
      {block.text}
      <NestedBlocks blocks={block.children ?? []} />
      {ordered ? null : null}
    </li>
  )
}

function Bookmark({ block }: { block: NotionBlock }) {
  if (!block.url && !block.text) {
    return null
  }

  return (
    <Link
      href={block.url || "#"}
      target="_blank"
      rel="noreferrer"
      className="my-5 flex items-center justify-between gap-4 rounded-xl border bg-card p-4 text-sm transition hover:border-foreground/20 hover:bg-muted/40"
    >
      <span className="line-clamp-2">{block.text || block.url}</span>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}

function Todo({ block }: { block: NotionBlock }) {
  return (
    <div className="my-3 flex gap-3 rounded-lg border bg-card p-3 text-sm text-muted-foreground">
      {block.checked ? (
        <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
      ) : (
        <Circle className="mt-0.5 h-4 w-4" />
      )}
      <span>{block.text}</span>
    </div>
  )
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "heading_1":
    case "heading_2":
      return <Heading block={block} level={2} />
    case "heading_3":
      return <Heading block={block} level={3} />
    case "paragraph":
      return <TextBlock block={block} />
    case "quote":
      return (
        <blockquote className="my-6 border-l pl-5 text-base leading-8 text-muted-foreground">
          {block.text}
          <NestedBlocks blocks={block.children ?? []} />
        </blockquote>
      )
    case "callout":
      return (
        <aside className="my-5 rounded-xl border bg-muted/50 p-5">
          <TextBlock block={block} className="text-foreground" />
          <NestedBlocks blocks={block.children ?? []} />
        </aside>
      )
    case "bulleted_list_item":
      return (
        <ul className="my-3 ml-5 list-disc">
          <ListItem block={block} />
        </ul>
      )
    case "numbered_list_item":
      return (
        <ol className="my-3 ml-5 list-decimal">
          <ListItem block={block} ordered />
        </ol>
      )
    case "to_do":
      return <Todo block={block} />
    case "image":
    case "video":
    case "embed":
      return <MediaBlock block={block} />
    case "bookmark":
    case "link_preview":
      return <Bookmark block={block} />
    case "divider":
      return <hr className="my-10 border-border/70" />
    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-xl border bg-zinc-950 p-4 text-sm text-zinc-50">
          <code>{block.text}</code>
        </pre>
      )
    case "column_list":
      return (
        <div className="my-8 grid gap-4 md:grid-cols-2">
          <NestedBlocks blocks={block.children ?? []} />
        </div>
      )
    case "column":
    case "synced_block":
      return (
        <div className="rounded-xl border bg-card/60 p-4">
          <NestedBlocks blocks={block.children ?? []} />
        </div>
      )
    default:
      return <NestedBlocks blocks={block.children ?? []} />
  }
}

function NestedBlocks({ blocks }: NotionRendererProps) {
  if (!blocks.length) {
    return null
  }

  return (
    <>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </>
  )
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks.length) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm leading-7 text-muted-foreground">
        This case study is ready for Notion content. Add page notes, headings,
        images, embeds, or videos in Notion and they will render here.
      </div>
    )
  }

  return <NestedBlocks blocks={blocks} />
}
