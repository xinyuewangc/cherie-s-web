import { allLabs } from "contentlayer/generated"

import { getNotionPageBlocks, NotionBlock } from "@/lib/notion"

export type LabCategoryKey =
  | "design-engineering"
  | "ai-workflow"
  | "system-thinking"

export type LabNote = {
  id: string
  title: string
  slug: string
  href: string
  description: string
  date: string
  category: string
  categoryKey: LabCategoryKey
  tags: string[]
  source: "mdx" | "notion"
  cover?: string | null
  bodyCode?: string
  blocks?: NotionBlock[]
}

export type LabCategory = {
  key: LabCategoryKey
  label: string
  title: string
  description: string
  tone: string
  modules: string[]
  topics: string[]
}

type NotionRichText = {
  plain_text?: string
}

type NotionSelectOption = {
  name: string
}

type NotionFile = {
  type?: "external" | "file"
  external?: {
    url?: string
  }
  file?: {
    url?: string
  }
}

type NotionProperty = {
  type: string
  title?: NotionRichText[]
  rich_text?: NotionRichText[]
  multi_select?: NotionSelectOption[]
  select?: NotionSelectOption | null
  date?: {
    start?: string
  } | null
  files?: NotionFile[]
}

type NotionPage = {
  id: string
  url: string
  created_time?: string
  last_edited_time?: string
  cover?: NotionFile | null
  properties: Record<string, NotionProperty>
}

type NotionQueryResponse = {
  results?: NotionPage[]
}

const NOTION_VERSION = "2022-06-28"
const DISCOVERED_LAB_DATABASE_ID = "36559cfd-921d-809a-8297-f2dfeb4ed37a"
const labCoverOverrides: Record<string, string> = {
  "basic-of-tailwind-css": "/images/lab/basic-of-tailwind-css-cover.png",
}

export const labCategories: LabCategory[] = [
  {
    key: "design-engineering",
    label: "01",
    title: "Design Engineering",
    description:
      "Interface infrastructure, tokens, component systems, and design-to-code workflow.",
    tone: "Build the UI system like a product surface.",
    modules: [
      "research cards",
      "mini diagrams",
      "token visualization",
      "side-by-side comparisons",
    ],
    topics: [
      "OKLCH research",
      "Tailwind understanding",
      "ShadCN preset system",
      "Figma ↔ Code mapping",
      "Theme architecture",
      "Design token systems",
      "Component architecture",
      "Design-to-code workflow",
      "UI infrastructure thinking",
    ],
  },
  {
    key: "ai-workflow",
    label: "02",
    title: "AI Workflow",
    description:
      "Prompt systems, agent interaction, MCP experiments, and operational AI design loops.",
    tone: "Make the process visible, repeatable, and testable.",
    modules: [
      "workflow graphs",
      "pipeline maps",
      "prompt cards",
      "interaction logs",
    ],
    topics: [
      "Notion → Website pipeline",
      "Prompt systems",
      "MCP experiments",
      "Codex workflow",
      "Agent interaction",
      "AI-assisted design workflow",
      "AI-native tooling",
      "Workflow orchestration",
      "Context systems",
    ],
  },
  {
    key: "system-thinking",
    label: "03",
    title: "System Thinking",
    description:
      "Information architecture, permission logic, enterprise workflows, and scalable abstractions.",
    tone: "Map relationships before polishing the interface.",
    modules: [
      "architecture maps",
      "layered hierarchy",
      "relationship diagrams",
      "structured notes",
    ],
    topics: [
      "IAM thinking",
      "Permission visibility",
      "Data Agent architecture",
      "Workspace logic",
      "Information architecture",
      "Enterprise workflow systems",
      "Modular scalability",
      "System abstraction",
    ],
  },
]

function textFromRichText(value?: NotionRichText[]) {
  return value?.map((item) => item.plain_text ?? "").join("").trim() ?? ""
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/↔/g, "to")
    .replace(/→/g, "to")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function getFileUrl(file?: NotionFile | null) {
  return file?.external?.url ?? file?.file?.url ?? null
}

function isSafeExternalAssetUrl(url?: string | null) {
  if (!url) {
    return false
  }

  try {
    const parsed = new URL(url)

    return parsed.protocol === "https:"
  } catch {
    return false
  }
}

function getExternalFileUrl(file?: NotionFile | null) {
  const url = file?.type === "external" ? file.external?.url : null

  return isSafeExternalAssetUrl(url) ? url ?? null : null
}

function getFirstPropertyByType(
  properties: Record<string, NotionProperty>,
  type: string
) {
  return Object.values(properties).find((property) => property.type === type)
}

function getTitle(properties: Record<string, NotionProperty>) {
  const titleProperty =
    properties.Name ??
    properties.Title ??
    properties["Project Name"] ??
    getFirstPropertyByType(properties, "title")

  return textFromRichText(titleProperty?.title)
}

function getDescription(properties: Record<string, NotionProperty>) {
  return (
    textFromRichText(properties.Description?.rich_text) ||
    textFromRichText(properties.Summary?.rich_text) ||
    textFromRichText(getFirstPropertyByType(properties, "rich_text")?.rich_text)
  )
}

function getTags(properties: Record<string, NotionProperty>) {
  return (
    properties.Tags?.multi_select?.map((tag) => tag.name) ??
    properties.Category?.multi_select?.map((tag) => tag.name) ??
    []
  )
}

function getDate(page: NotionPage) {
  const dateProperty =
    page.properties.Date?.date?.start ??
    page.properties.date?.date?.start ??
    getFirstPropertyByType(page.properties, "date")?.date?.start

  return dateProperty ?? page.last_edited_time ?? page.created_time ?? new Date().toISOString()
}

function textIncludes(value: string, terms: string[]) {
  const normalized = value.toLowerCase()

  return terms.some((term) => normalized.includes(term.toLowerCase()))
}

export function inferLabCategory(input: {
  title: string
  category?: string
  tags?: string[]
}): LabCategoryKey {
  const value = [input.title, input.category, ...(input.tags ?? [])].join(" ")

  if (
    textIncludes(value, [
      "oklch",
      "tailwind",
      "shadcn",
      "figma",
      "token",
      "theme",
      "component",
      "design system",
      "design engineering",
      "ui infrastructure",
    ])
  ) {
    return "design-engineering"
  }

  if (
    textIncludes(value, [
      "ai",
      "mcp",
      "codex",
      "agent",
      "prompt",
      "workflow",
      "notion",
      "openclaw",
      "pipeline",
      "context",
    ])
  ) {
    return "ai-workflow"
  }

  return "system-thinking"
}

function fallbackDescription(categoryKey: LabCategoryKey) {
  return labCategories.find((category) => category.key === categoryKey)?.tone ?? ""
}

function getNotionConfig() {
  const token = process.env.NOTION_TOKEN
  const databaseId =
    process.env.NOTION_LAB_DATABASE_ID || DISCOVERED_LAB_DATABASE_ID

  if (!token || !databaseId) {
    return null
  }

  return { token, databaseId }
}

async function notionFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const config = getNotionConfig()

  if (!config) {
    return null
  }

  try {
    const response = await fetch(`https://api.notion.com/v1${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
        ...(init?.headers ?? {}),
      },
      next: {
        revalidate: 300,
      },
    } as RequestInit & { next: { revalidate: number } })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

async function getNotionLabNotes(): Promise<LabNote[]> {
  const config = getNotionConfig()

  if (!config) {
    return []
  }

  const data = await notionFetch<NotionQueryResponse>(
    `/databases/${config.databaseId}/query`,
    {
      method: "POST",
      body: JSON.stringify({
        page_size: 50,
      }),
    }
  )

  return (data?.results ?? [])
    .map((page) => {
      const title = getTitle(page.properties)

      if (!title) {
        return null
      }

      const tags = getTags(page.properties)
      const category = page.properties.Category?.select?.name ?? tags[0] ?? "Lab"
      const categoryKey = inferLabCategory({ title, category, tags })
      const description =
        getDescription(page.properties) || fallbackDescription(categoryKey)
      const slug = slugify(title) || `notion-${page.id.replace(/-/g, "").slice(-8)}`
      const coverProperty = page.properties.cover?.files?.[0]
      const externalCover =
        getExternalFileUrl(page.cover) ?? getExternalFileUrl(coverProperty)
      const cover =
        labCoverOverrides[slug] ??
        externalCover ??
        (page.cover || coverProperty
          ? `/api/notion-asset?pageId=${page.id}&kind=cover`
          : getFileUrl(page.cover) ?? getFileUrl(coverProperty))

      return {
        id: page.id,
        title,
        slug,
        href: `/lab/${slug}`,
        description,
        date: getDate(page),
        category,
        categoryKey,
        tags,
        source: "notion" as const,
        cover,
      }
    })
    .filter(Boolean) as LabNote[]
}

function getMdxLabNotes(): LabNote[] {
  return allLabs.map((note) => {
    const tags = [note.category].filter(Boolean)
    const categoryKey = inferLabCategory({
      title: note.title,
      category: note.category,
      tags,
    })
    const cover = note.cover ?? labCoverOverrides[note.slugAsParams]

    return {
      id: note._id,
      title: note.title,
      slug: note.slugAsParams,
      href: note.slug,
      description: note.description,
      date: note.date,
      category: note.category,
      categoryKey,
      tags,
      source: "mdx",
      cover,
      bodyCode: note.body.code,
    }
  })
}

export async function getLabNotes() {
  const [notionNotes, mdxNotes] = await Promise.all([
    getNotionLabNotes(),
    Promise.resolve(getMdxLabNotes()),
  ])
  const seen = new Set<string>()

  return [...mdxNotes, ...notionNotes]
    .filter((note) => {
      const key = note.slug

      if (seen.has(key)) {
        return false
      }

      seen.add(key)
      return true
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export async function getLabNoteBySlug(slug: string) {
  const notes = await getLabNotes()
  const note = notes.find((item) => item.slug === slug)

  if (!note) {
    return null
  }

  if (note.source === "notion") {
    return {
      ...note,
      blocks: await getNotionPageBlocks(note.id),
    }
  }

  return note
}
