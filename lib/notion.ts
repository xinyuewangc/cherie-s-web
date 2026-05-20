export type PortfolioProject = {
  id: string
  title: string
  slug: string
  description: string
  tags: string[]
  collaborator: string
  year: string
  url: string
  cover: string | null
  coverAlt: string
}

export type NotionBlock = {
  id: string
  type: string
  text: string
  name?: string
  caption?: string
  url?: string
  language?: string
  checked?: boolean
  children?: NotionBlock[]
}

export type NotionAttachment = {
  id: string
  name: string
  url: string
}

export type PortfolioCaseStudy = PortfolioProject & {
  blocks: NotionBlock[]
  attachments?: NotionAttachment[]
  toc: Array<{
    id: string
    title: string
    level: 2 | 3
  }>
}

type NotionRichText = {
  plain_text?: string
}

type NotionSelectOption = {
  name: string
}

type NotionFile = {
  name?: string
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
  files?: NotionFile[]
  date?: {
    start?: string
  } | null
}

type NotionPage = {
  id: string
  url: string
  created_time?: string
  cover?: NotionFile | null
  properties: Record<string, NotionProperty>
}

type NotionBlockResponse = {
  results?: RawNotionBlock[]
  has_more?: boolean
  next_cursor?: string | null
}

type NotionQueryResponse = {
  results?: NotionPage[]
}

type NotionRetrieveBlockResponse = RawNotionBlock

type RawNotionBlock = {
  id: string
  type: string
  has_children?: boolean
  [key: string]: any
}

const NOTION_VERSION = "2022-06-28"
const MAX_BLOCK_DEPTH = 3

const fallbackProjects: PortfolioCaseStudy[] = [
  {
    id: "ai-workflow-os",
    title: "AI Workflow OS",
    slug: "ai-workflow-os",
    description:
      "A system for turning messy product questions into reusable AI-assisted design workflows.",
    tags: ["AI workflow", "Systems", "Prototype"],
    collaborator: "Independent",
    year: "2026",
    url: "#",
    cover: null,
    coverAlt: "AI Workflow OS cover",
    blocks: [],
    toc: [],
  },
  {
    id: "design-system-lab",
    title: "Design System Lab",
    slug: "design-system-lab",
    description:
      "A component language for clean, dense interfaces with strong defaults and low ceremony.",
    tags: ["Design systems", "shadcn/ui", "Tailwind"],
    collaborator: "Studio",
    year: "2026",
    url: "#",
    cover: null,
    coverAlt: "Design System Lab cover",
    blocks: [],
    toc: [],
  },
  {
    id: "notion-publishing-loop",
    title: "Notion Publishing Loop",
    slug: "notion-publishing-loop",
    description:
      "A portfolio content model that lets notes, covers, tags, and case studies become live pages.",
    tags: ["Notion", "Content ops", "MDX"],
    collaborator: "Codex",
    year: "2026",
    url: "#",
    cover: null,
    coverAlt: "Notion Publishing Loop cover",
    blocks: [],
    toc: [],
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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function getFileUrl(file?: NotionFile | null) {
  if (!file) {
    return null
  }

  return file.external?.url ?? file.file?.url ?? null
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

function getDateProperty(properties: Record<string, NotionProperty>) {
  return properties["日期"]?.date?.start ?? getFirstPropertyByType(properties, "date")?.date?.start
}

function getYear(page: NotionPage) {
  const source = getDateProperty(page.properties) ?? page.created_time

  return source ? new Date(source).getFullYear().toString() : "Now"
}

function getProjectCover(page: NotionPage) {
  const coverProperty = page.properties.cover?.files?.[0]
  const externalCover =
    getExternalFileUrl(page.cover) ?? getExternalFileUrl(coverProperty)

  if (externalCover) {
    return externalCover
  }

  if (page.cover || coverProperty) {
    return `/api/notion-asset?pageId=${page.id}&kind=cover`
  }

  return null
}

function normalizeProject(page: NotionPage): PortfolioProject {
  const titleProperty =
    page.properties["Project Name"] ?? getFirstPropertyByType(page.properties, "title")
  const title = textFromRichText(titleProperty?.title) || "Untitled project"
  const description =
    textFromRichText(page.properties.Description?.rich_text) ||
    "A portfolio project synced from Notion."
  const collaborator = textFromRichText(page.properties.Collaborator?.rich_text)
  const tags = page.properties.Tags?.multi_select?.map((tag) => tag.name) ?? []

  return {
    id: page.id,
    title,
    slug: slugify(title) || `project-${page.id.replace(/-/g, "").slice(-8)}`,
    description,
    tags,
    collaborator,
    year: getYear(page),
    url: page.url,
    cover: getProjectCover(page),
    coverAlt: `${title} cover`,
  }
}

function isResumeProject(project: Pick<PortfolioProject, "title" | "tags">) {
  const title = project.title.toLowerCase()
  const tags = project.tags.map((tag) => tag.toLowerCase())

  return (
    project.title.includes("个人简历") ||
    title.includes("resume") ||
    title.includes("curriculum vitae") ||
    tags.some((tag) => tag.includes("resume") || tag.includes("简历"))
  )
}

function getTextFromBlock(block: RawNotionBlock) {
  const value = block[block.type]
  return textFromRichText(value?.rich_text)
}

function normalizeBlock(block: RawNotionBlock, children: NotionBlock[] = []): NotionBlock {
  const value = block[block.type] ?? {}
  const mediaUrl = getFileUrl(value)
  const isNotionManagedFile = value.type === "file" && Boolean(value.file?.url)
  const proxiedUrl =
    mediaUrl &&
    isNotionManagedFile &&
    (block.type === "image" || block.type === "file")
      ? `/api/notion-asset?blockId=${block.id}`
      : mediaUrl

  return {
    id: block.id,
    type: block.type,
    text: getTextFromBlock(block),
    name: value.name,
    caption: textFromRichText(value.caption),
    url: proxiedUrl ?? value.url ?? "",
    language: value.language,
    checked: value.checked,
    children,
  }
}

function getNotionConfig() {
  const token = process.env.NOTION_TOKEN
  const databaseId =
    process.env.NOTION_PROJECTS_DATABASE_ID ?? process.env.NOTION_DATABASE_ID

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
      console.error("Failed to load Notion data", response.status)
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    console.error("Failed to load Notion data")
    return null
  }
}

export async function getFreshNotionPageCoverUrl(pageId: string) {
  const page = await notionFetch<NotionPage>(`/pages/${pageId}`)

  if (!page) {
    return null
  }

  const coverProperty = page.properties.cover?.files?.[0]

  return getFileUrl(page.cover) ?? getFileUrl(coverProperty)
}

export async function getFreshNotionBlockFileUrl(blockId: string) {
  const block = await notionFetch<NotionRetrieveBlockResponse>(
    `/blocks/${blockId}`
  )

  if (!block) {
    return null
  }

  const value = block[block.type] ?? {}

  return getFileUrl(value) ?? value.url ?? null
}

async function queryProjectPages(pageSize = 50) {
  const config = getNotionConfig()

  if (!config) {
    return []
  }

  const data = await notionFetch<NotionQueryResponse>(
    `/databases/${config.databaseId}/query`,
    {
      method: "POST",
      body: JSON.stringify({
        page_size: pageSize,
      }),
    }
  )

  return data?.results ?? []
}

async function getBlockChildren(
  blockId: string,
  depth = 0
): Promise<NotionBlock[]> {
  if (depth > MAX_BLOCK_DEPTH) {
    return []
  }

  const blocks: RawNotionBlock[] = []
  let cursor: string | null | undefined

  do {
    const query = cursor ? `&start_cursor=${cursor}` : ""
    const data = await notionFetch<NotionBlockResponse>(
      `/blocks/${blockId}/children?page_size=100${query}`
    )

    blocks.push(...(data?.results ?? []))
    cursor = data?.has_more ? data.next_cursor : null
  } while (cursor)

  return Promise.all(
    blocks.map(async (block) => {
      const children = block.has_children
        ? await getBlockChildren(block.id, depth + 1)
        : []

      return normalizeBlock(block, children)
    })
  )
}

export async function getNotionPageBlocks(pageId: string) {
  return getBlockChildren(pageId)
}

function flattenBlocks(blocks: NotionBlock[]): NotionBlock[] {
  return blocks.flatMap((block) => [
    block,
    ...flattenBlocks(block.children ?? []),
  ])
}

function buildAttachments(blocks: NotionBlock[]): NotionAttachment[] {
  return flattenBlocks(blocks)
    .filter((block) => block.type === "file" && block.url)
    .map((block) => ({
      id: block.id,
      name: block.name || block.caption || "attachment",
      url: block.url || "",
    }))
}

function buildToc(blocks: NotionBlock[]) {
  return flattenBlocks(blocks)
    .filter((block) => block.type === "heading_2" || block.type === "heading_3")
    .filter((block) => block.text)
    .slice(0, 12)
    .map((block) => ({
      id: block.id,
      title: block.text,
      level: block.type === "heading_2" ? 2 : (3 as 2 | 3),
    }))
}

function toCaseStudy(
  project: PortfolioProject,
  blocks: NotionBlock[] = []
): PortfolioCaseStudy {
  return {
    ...project,
    blocks,
    attachments: buildAttachments(blocks),
    toc: buildToc(blocks),
  }
}

export function getFallbackProjects() {
  return fallbackProjects
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const pages = await queryProjectPages()

  if (!pages.length) {
    return fallbackProjects
  }

  return pages.map(normalizeProject).filter((project) => !isResumeProject(project))
}

export async function getPortfolioCaseStudies(): Promise<PortfolioCaseStudy[]> {
  const pages = await queryProjectPages()

  if (!pages.length) {
    return fallbackProjects
  }

  return Promise.all(
    pages
      .map(normalizeProject)
      .filter((project) => !isResumeProject(project))
      .map(async (project) => {
        const blocks = await getBlockChildren(project.id)

        return toCaseStudy(project, blocks)
      })
  )
}

export async function getResumeCaseStudy() {
  const pages = await queryProjectPages()

  if (!pages.length) {
    return null
  }

  const project = pages.map(normalizeProject).find(isResumeProject)

  if (!project) {
    return null
  }

  const blocks = await getBlockChildren(project.id)

  return toCaseStudy(project, blocks)
}

export async function getPortfolioCaseStudy(slug: string) {
  const projects = await getPortfolioProjects()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return null
  }

  if (project.id.startsWith("ai-") || project.url === "#") {
    return toCaseStudy(project)
  }

  const blocks = await getBlockChildren(project.id)

  return toCaseStudy(project, blocks)
}
