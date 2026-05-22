import type * as React from "react"
import Link from "next/link"
import { Check, Circle, ExternalLink, FileText } from "lucide-react"

import { NotionBlock } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { NotionImage } from "@/components/portfolio/notion-media"

type NotionRendererProps = {
  blocks: NotionBlock[]
}

function TextBlock({
  block,
  className,
  renderChildren = true,
}: {
  block: NotionBlock
  className?: string
  renderChildren?: boolean
}) {
  if (!block.text && !block.children?.length) {
    return null
  }

  return (
    <p
      className={cn(
        "my-2 max-w-3xl text-base leading-[1.58] text-muted-foreground md:text-[16.5px]",
        className
      )}
    >
      {block.text}
      {renderChildren ? <NestedBlocks blocks={block.children ?? []} /> : null}
    </p>
  )
}

function Heading({ block, level }: { block: NotionBlock; level: 2 | 3 }) {
  if (!block.text) {
    return null
  }

  if (level === 2) {
    return (
      <section
        id={block.id}
        className="scroll-m-28 border-t border-border/70 pt-8 first:border-t-0 first:pt-0"
      >
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          {block.text}
        </h2>
        <NestedBlocks blocks={block.children ?? []} />
      </section>
    )
  }

  return (
    <section id={block.id} className="scroll-m-28 pt-5">
      <h3 className="max-w-3xl text-xl font-semibold tracking-tight">
        {block.text}
      </h3>
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
      <figure className="my-10 overflow-hidden rounded-xl border bg-card shadow-sm">
        <video src={block.url} controls className="aspect-video w-full bg-black" />
        {block.caption ? (
          <figcaption className="border-t px-4 py-3 text-sm leading-6 text-muted-foreground">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    )
  }

  if (block.type === "embed") {
    return (
      <figure className="my-10 overflow-hidden rounded-xl border bg-card shadow-sm">
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
    <figure className="my-10 overflow-hidden rounded-xl border bg-card shadow-sm">
      <NotionImage
        src={block.url}
        alt={block.caption || "Project artifact"}
        className="w-full"
      />
      {block.caption ? (
        <figcaption className="border-t px-4 py-3 text-sm leading-6 text-muted-foreground">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function FileBlock({ block }: { block: NotionBlock }) {
  if (!block.url) {
    return null
  }

  return (
    <Link
      href={block.url}
      target="_blank"
      rel="noreferrer"
      className="my-6 flex max-w-3xl items-center justify-between gap-4 rounded-xl border bg-card/70 p-4 text-sm transition hover:border-foreground/20 hover:bg-muted/40"
    >
      <span className="flex min-w-0 items-center gap-3">
        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">
          {block.name || block.caption || block.text || "Project attachment"}
        </span>
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}

function ListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="pl-1 text-base leading-[1.58] text-muted-foreground md:text-[16.5px]">
      {block.text}
      <NestedBlocks blocks={block.children ?? []} />
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
      className="my-6 flex max-w-3xl items-center justify-between gap-4 rounded-xl border bg-card/70 p-4 text-sm transition hover:border-foreground/20 hover:bg-muted/40"
    >
      <span className="line-clamp-2">{block.text || block.url}</span>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}

function Todo({ block }: { block: NotionBlock }) {
  return (
    <div className="my-3 flex max-w-3xl gap-3 rounded-lg border bg-card/70 p-3 text-sm leading-6 text-muted-foreground">
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
        <blockquote className="my-4 max-w-3xl border-l-2 pl-5 text-base leading-[1.58] text-muted-foreground md:text-[16.5px]">
          {block.text}
          <NestedBlocks blocks={block.children ?? []} />
        </blockquote>
      )
    case "callout":
      return (
        <aside className="bg-muted/45 my-8 max-w-3xl rounded-xl border p-5">
          <TextBlock
            block={block}
            className="my-0 text-foreground"
            renderChildren={false}
          />
          <NestedBlocks blocks={block.children ?? []} />
        </aside>
      )
    case "bulleted_list_item":
      return (
        <ul className="my-3 ml-5 max-w-3xl list-disc space-y-1">
          <ListItem block={block} />
        </ul>
      )
    case "numbered_list_item":
      return (
        <ol className="my-3 ml-5 max-w-3xl list-decimal space-y-1">
          <ListItem block={block} />
        </ol>
      )
    case "to_do":
      return <Todo block={block} />
    case "image":
    case "video":
    case "embed":
      return <MediaBlock block={block} />
    case "file":
      return <FileBlock block={block} />
    case "bookmark":
    case "link_preview":
      return <Bookmark block={block} />
    case "divider":
      return <hr className="my-10 border-border/70" />
    case "code":
      return (
        <pre className="my-5 max-w-3xl overflow-x-auto rounded-xl border bg-zinc-950 p-4 text-sm leading-6 text-zinc-50">
          <code>{block.text}</code>
        </pre>
      )
    case "column_list":
      return (
        <div className="my-10 grid gap-4 md:grid-cols-2">
          <NestedBlocks blocks={block.children ?? []} />
        </div>
      )
    case "column":
    case "synced_block":
      return (
        <div className="rounded-xl border bg-card/60 p-5">
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

  const nodes: React.ReactNode[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const listType = block.type
      const listBlocks = [block]

      while (blocks[index + 1]?.type === listType) {
        index += 1
        listBlocks.push(blocks[index])
      }

      const ListTag = listType === "numbered_list_item" ? "ol" : "ul"
      const listClass =
        listType === "numbered_list_item" ? "list-decimal" : "list-disc"

      nodes.push(
        <ListTag
          key={block.id}
          className={cn(
            "my-3 ml-5 max-w-3xl space-y-1 marker:text-muted-foreground/70",
            listClass
          )}
        >
          {listBlocks.map((item) => (
            <ListItem
              key={item.id}
              block={item}
            />
          ))}
        </ListTag>
      )
      continue
    }

    nodes.push(<Block key={block.id} block={block} />)
  }

  return <>{nodes}</>
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks.length) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm leading-6 text-muted-foreground">
        This case study is ready for Notion content. Add page notes, headings,
        images, embeds, or videos in Notion and they will render here.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 md:space-y-5">
      <NestedBlocks blocks={blocks} />
    </div>
  )
}
