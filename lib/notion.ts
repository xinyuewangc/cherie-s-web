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
const DEFAULT_NOTION_FETCH_TIMEOUT_MS = 2500
const NOTION_PROJECT_PAGES_CACHE_MS = 5 * 60 * 1000
const NOTION_PROJECT_PAGES_FAILURE_CACHE_MS = 60 * 1000

type ProjectPagesCache = {
  expiresAt: number
  pages: NotionPage[]
}

const projectPagesCache = new Map<number, ProjectPagesCache>()
const projectPagesRequests = new Map<number, Promise<NotionPage[]>>()

const dataSelfServiceAgentProject: PortfolioCaseStudy = {
  id: "data-self-service-agent",
  title: "数据自助查询 Agent",
  slug: "agent",
  description:
    "从模糊业务问题到可信数据资产的 AI Native 工作流设计：用澄清、方案确认、证据追溯和资产沉淀，把一次临时问数变成可复用的数据工作对象。",
  tags: ["AI Native Workflow", "Agent UX", "Data Platform", "Workflow UX"],
  collaborator: "miHoYo Data Platform",
  year: "2026",
  url: "#",
  cover: "/images/portfolio/data-agent-cover.png",
  coverAlt: "数据自助查询 Agent case study cover",
  blocks: [],
  attachments: [],
  toc: [],
}

const cachedNotionProjects: PortfolioCaseStudy[] = [
  {
    id: "37259cfd-921d-8094-bd03-ea82fdaa31a3",
    title: "访客系统设计",
    slug: "project-fdaa31a3",
    description: "A portfolio project synced from Notion.",
    tags: [],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/37259cfd921d8094bd03ea82fdaa31a3",
    cover: null,
    coverAlt: "访客系统设计 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "37259cfd-921d-80c3-bd60-e1e8f948e779",
    title: "Elearning线上学习平台",
    slug: "elearning",
    description: "A portfolio project synced from Notion.",
    tags: [],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/Elearning-37259cfd921d80c3bd60e1e8f948e779",
    cover: null,
    coverAlt: "Elearning线上学习平台 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "37259cfd-921d-803b-b055-c3478e7f75af",
    title: "收入线上化0-1 项目",
    slug: "0-1",
    description: "A portfolio project synced from Notion.",
    tags: [],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/0-1-37259cfd921d803bb055c3478e7f75af",
    cover: null,
    coverAlt: "收入线上化0-1 项目 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "37259cfd-921d-80e8-9b35-e67e03bff8d7",
    title: "电子档案0-1 项目",
    slug: "0-1",
    description: "A portfolio project synced from Notion.",
    tags: [],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/0-1-37259cfd921d80e89b35e67e03bff8d7",
    cover: null,
    coverAlt: "电子档案0-1 项目 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-81e0-a6be-c27c1b10c7d3",
    title: "Babyjump",
    slug: "babyjump",
    description:
      "“BABYJUMP” is a parent-child interactive product that integrates vision and hearing to guide and help children exercise while playing. To better supervise and promote the physical quality and health of children, and to stimulate their enthusiasm for exercise.",
    tags: ["🍎本科时期"],
    collaborator: "Self-Led Project",
    year: "2026",
    url: "https://app.notion.com/p/Babyjump-36459cfd921d81e0a6bec27c1b10c7d3",
    cover: null,
    coverAlt: "Babyjump cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8107-acff-f6f7b68b5e5c",
    title: "Buro Market",
    slug: "buro-market",
    description:
      "Buro is a Market in your pocket. It's suite of microservices that enables Market Traders to learn and connect with their customers both in person and remotely, while generating shopping data that will help shape Borough Market.",
    tags: ["🎓研究生时期"],
    collaborator: "Borough Market · London",
    year: "2026",
    url: "https://app.notion.com/p/Buro-Market-36459cfd921d8107acfff6f7b68b5e5c",
    cover: null,
    coverAlt: "Buro Market cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8145-aabb-c477db9657a5",
    title: "VENTURE",
    slug: "venture",
    description:
      "Venture is a service that help 11-to-15-year-old teenagers understand the life impact of saving by simulation, establish habits in a safe environment, and apply to the real world.",
    tags: ["🎓研究生时期"],
    collaborator: "Natwest · London",
    year: "2026",
    url: "https://app.notion.com/p/VENTURE-36459cfd921d8145aabbc477db9657a5",
    cover: null,
    coverAlt: "VENTURE cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-816f-924a-c821494c7561",
    title: "腾讯项目",
    slug: "project-494c7561",
    description:
      "During the internship, the position belonged to the Intelligent Product User Experience Design Department - Map Service Design Center. The team was mainly responsible for the design of enterprise level products related to Tencent's location-based big data, including the design of intelligent transportation To B type products, mobile To C products, PC backend management platform and data big screen.",
    tags: ["🧸实习项目"],
    collaborator: "腾讯-北京快手科技有限公司",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d816f924ac821494c7561",
    cover: null,
    coverAlt: "腾讯项目 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8106-954e-eb9c2de0b3bf",
    title: "A Future perspective of PLAY",
    slug: "a-future-perspective-of-play",
    description: "The Ministry of Play",
    tags: ["🎓研究生时期"],
    collaborator: "London Play",
    year: "2026",
    url: "https://app.notion.com/p/A-Future-perspective-of-PLAY-36459cfd921d8106954eeb9c2de0b3bf",
    cover: null,
    coverAlt: "A Future perspective of PLAY cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-815a-91e9-d1af942ee549",
    title: "启动器设置优化",
    slug: "project-942ee549",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d815a91e9d1af942ee549",
    cover: null,
    coverAlt: "启动器设置优化 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8180-8333-f7543e2e8056",
    title: "米哈游充值中心",
    slug: "project-3e2e8056",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d81808333f7543e2e8056",
    cover: null,
    coverAlt: "米哈游充值中心 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-818c-9313-cc86eff1ed19",
    title: "UGC提现需求",
    slug: "ugc",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/UGC-36459cfd921d818c9313cc86eff1ed19",
    cover: null,
    coverAlt: "UGC提现需求 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8191-bebd-dd5e217d95df",
    title: "米哈游启动器",
    slug: "project-217d95df",
    description:
      "平台启动器是一款聚合米家旗下游戏内容的一站式游戏平台。我参与了启动器0-1的搭建与快速MVP迭代，核心流程设计包括安装/卸载/更新体验优化、账号前置登录链路与设置模块迭代。",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d8191bebddd5e217d95df",
    cover: null,
    coverAlt: "米哈游启动器 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8196-9bcc-df9522e3c588",
    title: "组件mob",
    slug: "mob",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/mob-36459cfd921d81969bccdf9522e3c588",
    cover: null,
    coverAlt: "组件mob cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-819f-973a-e341300b0ab4",
    title: "SDK设计规范2.0",
    slug: "sdk-2-0",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/SDK-2-0-36459cfd921d819f973ae341300b0ab4",
    cover: null,
    coverAlt: "SDK设计规范2.0 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-81ea-ae81-c1da319ab02d",
    title: "米游社其他内容",
    slug: "project-319ab02d",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d81eaae81c1da319ab02d",
    cover: null,
    coverAlt: "米游社其他内容 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8130-b498-d1862d68c1c4",
    title: "米油币红包",
    slug: "project-2d68c1c4",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d8130b498d1862d68c1c4",
    cover: null,
    coverAlt: "米油币红包 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-813e-90d4-c31ac1c4fb37",
    title: "可见性管理",
    slug: "project-c1c4fb37",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d813e90d4c31ac1c4fb37",
    cover: null,
    coverAlt: "可见性管理 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8180-8247-fc04748aff05",
    title: "官网通行证重构",
    slug: "project-748aff05",
    description: "A portfolio project synced from Notion.",
    tags: ["👩🏻‍💻米哈游工作项目"],
    collaborator: "",
    year: "2026",
    url: "https://app.notion.com/p/36459cfd921d81808247fc04748aff05",
    cover: null,
    coverAlt: "官网通行证重构 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
  {
    id: "36459cfd-921d-8151-be37-de7a1cd03106",
    title: "快影App项目",
    slug: "app",
    description:
      "岗位隶属于快手用户体验设计部-特效产品中心，团队主要负责快手其特效产品：快手快影、一甜相机及必扬特效平台。实习期间主要负责快影产品，一共参与并完成了10+项目，包括设计改版、设计规范梳理、支持日常迭代。其流程覆盖了对需求的内容、竞品分析、交互设计、视觉设计、研发对接、测试与视觉走查。1.编辑器UX设计：持续优化编辑器和编辑链路的功能体验。(1)参与了编辑器迭代设计专项，为提升体验一致性；(2)支持解决上一版本遗留的高优问题，进一步提升新功能体验；(3)参与了分享链路和编辑器板块的优化，引导用户分享，提升分享成功率。2.设计规范：为提升体验的一致性，针对快影5.42版本进行设计规范梳理。(1)组件库的搭建，不同情况下出现的弹框进行分类，同步规范到每一个操作；(2)梳理产品的字体、颜色、图标、圆角、按钮等规范。3.其他工作：(1)实习期间，了解了剪辑行业，并熟练掌握剪辑各功能。(2)定期对剪辑行业进行竞品检测，并多次在部门会议中与大家分享内容。(3)建立数据&反馈记录文档，针对版本中的数据和线上反馈进行收集记录。",
    tags: ["🧸实习项目"],
    collaborator: "快影-北京快手科技有限公司",
    year: "2026",
    url: "https://app.notion.com/p/App-36459cfd921d8151be37de7a1cd03106",
    cover: null,
    coverAlt: "快影App项目 cover",
    blocks: [],
    attachments: [],
    toc: [],
  },
]

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
  return (
    value
      ?.map((item) => item.plain_text ?? "")
      .join("")
      .trim() ?? ""
  )
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
  return (
    properties["日期"]?.date?.start ??
    getFirstPropertyByType(properties, "date")?.date?.start
  )
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
    page.properties["Project Name"] ??
    getFirstPropertyByType(page.properties, "title")
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

function normalizeBlock(
  block: RawNotionBlock,
  children: NotionBlock[] = []
): NotionBlock {
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

function readPositiveNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function getNotionFetchTimeoutMs() {
  return readPositiveNumber(
    process.env.NOTION_FETCH_TIMEOUT_MS,
    DEFAULT_NOTION_FETCH_TIMEOUT_MS
  )
}

async function notionFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T | null> {
  const config = getNotionConfig()

  if (!config) {
    return null
  }

  const controller = new AbortController()
  const timeoutMs = getNotionFetchTimeoutMs()
  let timedOut = false
  let timeout: ReturnType<typeof setTimeout> | undefined

  try {
    const request = fetch(`https://api.notion.com/v1${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
        ...(init?.headers ?? {}),
      },
      next: {
        revalidate: 300,
      },
    } as RequestInit & { next: { revalidate: number } }).catch((error) => {
      if (timedOut) {
        return null
      }

      throw error
    })

    const response = await Promise.race([
      request,
      new Promise<null>((resolve) => {
        timeout = setTimeout(() => {
          timedOut = true
          controller.abort()
          console.error(
            `Failed to load Notion data: timed out after ${timeoutMs}ms`
          )
          resolve(null)
        }, timeoutMs)
      }),
    ])

    if (!response) {
      return null
    }

    if (!response.ok) {
      console.error("Failed to load Notion data", response.status)
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    if ((error as Error).name === "AbortError" || timedOut) {
      console.error(`Failed to load Notion data: timed out after ${timeoutMs}ms`)
    } else {
      console.error("Failed to load Notion data")
    }

    return null
  } finally {
    if (timeout) {
      clearTimeout(timeout)
    }
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

  const cached = projectPagesCache.get(pageSize)

  if (cached && cached.expiresAt > Date.now()) {
    return cached.pages
  }

  const activeRequest = projectPagesRequests.get(pageSize)

  if (activeRequest) {
    return activeRequest
  }

  const request = notionFetch<NotionQueryResponse>(
    `/databases/${config.databaseId}/query`,
    {
      method: "POST",
      body: JSON.stringify({
        page_size: pageSize,
      }),
    }
  )
    .then((data) => {
      const pages = data?.results ?? []
      const cacheMs = pages.length
        ? NOTION_PROJECT_PAGES_CACHE_MS
        : NOTION_PROJECT_PAGES_FAILURE_CACHE_MS

      projectPagesCache.set(pageSize, {
        expiresAt: Date.now() + cacheMs,
        pages,
      })

      return pages
    })
    .finally(() => {
      projectPagesRequests.delete(pageSize)
    })

  projectPagesRequests.set(pageSize, request)

  return request
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
  const offlineProjects = cachedNotionProjects.length
    ? cachedNotionProjects
    : fallbackProjects

  return [dataSelfServiceAgentProject, ...offlineProjects]
}

function mergeCuratedProjects(projects: PortfolioProject[]) {
  const curated = [dataSelfServiceAgentProject]
  const curatedSlugs = new Set(curated.map((project) => project.slug))
  const curatedIds = new Set(curated.map((project) => project.id))

  return [
    ...curated,
    ...projects.filter(
      (project) =>
        !curatedSlugs.has(project.slug) && !curatedIds.has(project.id)
    ),
  ]
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const pages = await queryProjectPages()

  if (!pages.length) {
    return getFallbackProjects()
  }

  return mergeCuratedProjects(
    pages.map(normalizeProject).filter((project) => !isResumeProject(project))
  )
}

export async function getPortfolioCaseStudies(): Promise<PortfolioCaseStudy[]> {
  const pages = await queryProjectPages()

  if (!pages.length) {
    return getFallbackProjects()
  }

  const notionStudies = await Promise.all(
    pages
      .map(normalizeProject)
      .filter((project) => !isResumeProject(project))
      .filter((project) => project.slug !== dataSelfServiceAgentProject.slug)
      .map(async (project) => {
        const blocks = await getBlockChildren(project.id)

        return toCaseStudy(project, blocks)
      })
  )

  return [dataSelfServiceAgentProject, ...notionStudies]
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
  if (slug === dataSelfServiceAgentProject.slug) {
    return dataSelfServiceAgentProject
  }

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
