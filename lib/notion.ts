export type PortfolioProject = {
  id: string
  title: string
  slug: string
  description: string
  tags: string[]
  collaborator: string
  year: string
  url: string
}

type NotionRichText = {
  plain_text?: string
}

type NotionSelectOption = {
  name: string
}

type NotionProperty = {
  type: string
  title?: NotionRichText[]
  rich_text?: NotionRichText[]
  multi_select?: NotionSelectOption[]
  date?: {
    start?: string
  } | null
}

type NotionPage = {
  id: string
  url: string
  created_time?: string
  properties: Record<string, NotionProperty>
}

type NotionQueryResponse = {
  results?: NotionPage[]
}

const NOTION_VERSION = "2022-06-28"

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

function getFirstPropertyByType(
  properties: Record<string, NotionProperty>,
  type: string
) {
  return Object.values(properties).find((property) => property.type === type)
}

function getYear(page: NotionPage) {
  const date = getFirstPropertyByType(page.properties, "date")?.date?.start
  const source = date ?? page.created_time

  return source ? new Date(source).getFullYear().toString() : "Now"
}

function normalizeProject(page: NotionPage): PortfolioProject {
  const titleProperty = getFirstPropertyByType(page.properties, "title")
  const title = textFromRichText(titleProperty?.title) || "Untitled project"
  const description =
    textFromRichText(page.properties.Description?.rich_text) ||
    "A portfolio project synced from Notion."
  const collaborator = textFromRichText(page.properties.Collaborator?.rich_text)
  const tags = page.properties.Tags?.multi_select?.map((tag) => tag.name) ?? []

  return {
    id: page.id,
    title,
    slug: slugify(title) || page.id.replace(/-/g, ""),
    description,
    tags,
    collaborator,
    year: getYear(page),
    url: page.url,
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const token = process.env.NOTION_TOKEN
  const databaseId =
    process.env.NOTION_PROJECTS_DATABASE_ID ?? process.env.NOTION_DATABASE_ID

  if (!token || !databaseId) {
    return []
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Notion-Version": NOTION_VERSION,
        },
        body: JSON.stringify({
          page_size: 12,
        }),
        next: {
          revalidate: 300,
        },
      }
    )

    if (!response.ok) {
      console.error("Failed to load Notion projects", response.status)
      return []
    }

    const data = (await response.json()) as NotionQueryResponse

    return (data.results ?? []).map(normalizeProject)
  } catch (error) {
    console.error("Failed to load Notion projects")
    return []
  }
}
