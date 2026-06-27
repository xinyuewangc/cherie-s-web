"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Code2,
  Database,
  FileText,
  GitBranch,
  Layers,
  Maximize2,
  MessageSquare,
  Network,
  Save,
  Search,
  Shield,
  Table,
  X,
} from "lucide-react"
import { createPortal } from "react-dom"

import { PortfolioCaseStudy } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/portfolio/reveal"

type DataAgentCaseStudyProps = {
  project: PortfolioCaseStudy
}

type IconType = React.ComponentType<{ className?: string }>

type FigureProps = {
  src: string
  alt: string
  aspect?: string
  frame?: "bordered" | "plain"
  objectFit?: "contain" | "cover"
  className?: string
  reveal?: boolean
  unoptimized?: boolean
}

type PreviewImage = {
  src: string
  alt: string
  unoptimized?: boolean
}

type PathItem = {
  id: string
  title: string
  text: string
  design: string
  icon: IconType
  preview: {
    image: PreviewImage & {
      aspect: string
    }
  }
}

type ClarificationModule = {
  index: string
  title: string
  summary: string
  items: Array<{
    title: string
    text: string
  }>
}

type CollaborationStage = {
  phase: string
  title: string
  summary: string
  artifact: string
  distance: string
  icon: IconType
  flow: string[]
  notes: Array<{
    label: string
    text: string
  }>
}

type ArtifactEvolutionStep = {
  title: string
  text: string
  icon: IconType
}

const sections = [
  { id: "context", label: "Overview & Context" },
  { id: "situation", label: "Situation" },
  { id: "task", label: "Task" },
  { id: "action-1", label: "Action 1" },
  { id: "action-2", label: "Action 2" },
  { id: "action-3", label: "Action 3" },
  { id: "action-4", label: "Action 4" },
  { id: "action-5", label: "Action 5" },
  { id: "result", label: "Result" },
  { id: "reflection", label: "Reflection" },
]

const images = {
  cover: "/images/portfolio/data-agent-cover.png",
  oldPublish: "/images/portfolio/data-agent-old-publish.webp",
  oldMarket: "/images/portfolio/data-agent-old-market.webp",
  oldSubscriptions: "/images/portfolio/data-agent-old-subscriptions.webp",
  userFriction: "/images/portfolio/data-agent-user-friction-cards.webp",
  userWorkflow: "/images/portfolio/data-agent-user-workflow-loop.webp",
  pathFind: "/images/portfolio/data-agent-path-find-placeholder.png",
  pathQuery: "/images/portfolio/data-agent-path-query-placeholder.png",
  pathUse: "/images/portfolio/data-agent-path-use-placeholder.png",
  pathRetain: "/images/portfolio/data-agent-path-retain-placeholder.png",
  clarificationStates: "/images/portfolio/data-agent-clarification-states.webp",
  resultTrust: "/images/portfolio/data-agent-result-trust.webp",
}

const projectFacts = [
  ["产品", "网页平台 | 企业级数据应用"],
  ["能力", "AI Native 工作流、Agent UX、数据平台、UX 策略、设计工程"],
  ["时间", "2024 - 2025"],
  ["团队", "miHoYo 数据平台"],
]

const pathItems: PathItem[] = [
  {
    id: "discover",
    title: "找数据",
    text: "找到可能有用的数据资产",
    design: "搜索、推荐、数据集市浏览、AI 对话入口",
    icon: Search,
    preview: {
      image: {
        src: images.pathFind,
        alt: "找数据：搜索入口和官方数据资产占位图",
        aspect: "aspect-[150/57]",
      },
    },
  },
  {
    id: "query",
    title: "查数据",
    text: "把需求转化为筛选、查询或联查",
    design: "自然语言输入、意图解析、澄清追问、Preflight 确认",
    icon: MessageSquare,
    preview: {
      image: {
        src: images.pathQuery,
        alt: "查数据：自然语言输入、意图解析和澄清追问占位图",
        aspect: "aspect-[150/57]",
      },
    },
  },
  {
    id: "consume",
    title: "用数据",
    text: "理解、调整和消费结果",
    design: "思考链、数据流转 Tab、筛选/排序/列设置、图表切换",
    icon: Table,
    preview: {
      image: {
        src: images.pathUse,
        alt: "用数据：思考链、数据流转和筛选排序占位图",
        aspect: "aspect-[150/57]",
      },
    },
  },
  {
    id: "retain",
    title: "留数据",
    text: "把一次结果沉淀为复用资产",
    design: "保存视图、发布 MCP、资产管理中心",
    icon: Save,
    preview: {
      image: {
        src: images.pathRetain,
        alt: "留数据：保存复用为资产的任务闭环占位图",
        aspect: "aspect-[75/23]",
      },
    },
  },
]

const TASK_PATH_AUTOPLAY_DELAY = 2800

const trustSummaryItems = [
  {
    label: "Insight",
    text: "数据场景的难点不在让 AI 回答，而在让用户敢用。核心判断是：在高可信场景，透明度 > 效率。",
    icon: Shield,
  },
  {
    label: "Moves",
    text: "通过五层可检查机制，从「过程透明」到「结果可调」再到「反馈闭环」。",
    icon: GitBranch,
  },
]

const trustLayers = [
  {
    title: "思考过程透明",
    text: "Agent 的思考链集中在可折叠容器中，默认收起不打断流程；展开后可查看用了哪些表、解析了哪些字段，以及为什么选择这个查询方式。",
    icon: Bot,
  },
  {
    title: "结果呈现分层",
    text: "统一采用「结论 + 数据/图表」结构，先给结论，再给明细表格和可视化图表，帮助用户快速判断结果是否符合预期。",
    icon: Layers,
  },
  {
    title: "数据来源可查",
    text: "数据流转展示数据从哪张表、经过哪些处理步骤到达结果；处理规则展示筛选/计算/联合逻辑；SQL 展示实际执行语句。",
    icon: Database,
  },
  {
    title: "结果可调整",
    text: "支持筛选、排序、列设置，也允许用户通过页面元素选取指定局部区域，让 AI 在已有结果上做局部修订。",
    icon: Table,
  },
  {
    title: "反馈闭环",
    text: "点赞/点踩与埋点持续反向衡量生成质量；结果调整频率和重置率用于发现初始生成质量问题。",
    icon: BarChart3,
  },
]

const clarificationModules: ClarificationModule[] = [
  {
    index: "01",
    title: "定义追问触发条件",
    summary: "当信息不足以可信生成时，让 Agent 主动停下来确认。",
    items: [
      {
        title: "意图识别不清",
        text: "用户输入无法解析为明确查询类型，例如单表查询、联查或文件加工。",
      },
      {
        title: "槽位缺失",
        text: "意图清晰但关键信息不完整，例如缺少时间范围、筛选条件或存在歧义字段。",
      },
      {
        title: "执行失败",
        text: "Skill 或工具调用返回异常，例如表不存在、权限不足或 SQL 报错。",
      },
    ],
  },
  {
    index: "02",
    title: "设计分层追问体验",
    summary: "根据场景选择交互形式：能选择就选择，无法收敛时再开放追问。",
    items: [
      {
        title: "选项式澄清",
        text: "可选范围明确且数量有限时，用选项卡降低认知负担。",
      },
      {
        title: "自然语言追问",
        text: "范围不明确或选项过多时，用开放式问题引导用户补充上下文。",
      },
      {
        title: "Preflight 确认",
        text: "影响较大的生成前，先展示方案摘要，让用户有机会修正方向。",
      },
    ],
  },
  {
    index: "03",
    title: "定义对话节奏规则",
    summary: "澄清不是无限追问，而是持续推进双方对任务目标的共识。",
    items: [
      {
        title: "带着已理解内容追问",
        text: "每次追问都携带已识别的产品、指标、时间等信息，让用户看到 Agent 有进展。",
      },
      {
        title: "澄清和生成交叉",
        text: "先生成初步结果，再允许用户通过“改一下筛选”“加一列”等方式局部修订。",
      },
      {
        title: "目标是建立共识",
        text: "让用户确认“你理解对了”，再进入后续生成与验证。",
      },
    ],
  },
]

const artifactEvolutionSteps: ArtifactEvolutionStep[] = [
  {
    title: "图",
    text: "静态界面与标注",
    icon: Layers,
  },
  {
    title: "Demo",
    text: "可跑通的对话流",
    icon: Code2,
  },
  {
    title: "Commit",
    text: "直接进入研发代码",
    icon: GitBranch,
  },
  {
    title: "Skill",
    text: "可执行的行为规则",
    icon: FileText,
  },
]

const collaborationStages: CollaborationStage[] = [
  {
    phase: "过去",
    title: "传统瀑布模式",
    summary:
      "严格串行流把设计意图压缩成静态截图和标注，默认产品体验可以被固定状态穷举。",
    artifact: "静态设计稿",
    distance: "信息经过多轮传递，研发只能从图片里猜对话节奏",
    icon: Layers,
    flow: [
      "用户想法",
      "产品 PRD",
      "UX 设计稿",
      "前后端实现",
      "测试",
      "上线验收",
    ],
    notes: [
      {
        label: "适用前提",
        text: "核心体验由确定状态构成，可以先画完再交付。",
      },
      {
        label: "Agent 场景失效点",
        text: "非确定性回答、Prompt/Skill 深度耦合、周级迭代，让静态图无法承载决策逻辑。",
      },
    ],
  },
  {
    phase: "现在",
    title: "我的实践：两次缩短距离",
    summary:
      "交付物从图变成可运行 Demo，再进入研发代码本身；设计意图从“传达”变成“执行”。",
    artifact: "Demo + MR",
    distance: "反馈延迟从天缩短到分钟，信息损耗趋近零",
    icon: Code2,
    flow: [
      "MVP：cc-agent-sdk Demo",
      "动态对话流",
      "2.0：Platgit 走查",
      "提交 MR",
    ],
    notes: [
      {
        label: "MVP 阶段",
        text: "用代码代替设计稿，表达动态节奏、Tool Calling 链路和 AI 能力边界。",
      },
      {
        label: "2.0 阶段",
        text: "直接拉取研发分支，在生产代码上走查交互/样式，发现问题就修改并提交。",
      },
    ],
  },
  {
    phase: "未来",
    title: "行为规则成为设计稿",
    summary:
      "当产品本身由 Agent 驱动，设计师的交付物会继续靠近运行时，变成可被执行的 Skill 定义。",
    artifact: "Skill 定义文件",
    distance: "设计直接进入智能体决策逻辑",
    icon: FileText,
    flow: ["intent-skill", "clarify-skill", "generate-skill", "Agent 行为"],
    notes: [
      {
        label: "角色变化",
        text: "从界面设计师转向 AI 行为架构师，定义智能体在什么场景下如何与人协作。",
      },
      {
        label: "边界变化",
        text: "当一个人能定义意图规则、写交互 Demo、在代码上验收，角色就更接近产品体验工程师。",
      },
    ],
  },
]

const legacyModules = [
  {
    id: "publish",
    title: "数据发布",
    subtitle: "供给侧：定义“有什么”",
    description:
      "把底层表/国库数据包装成可订阅的数据资产，并维护上架、下架、停用和维表关联。",
    image: images.oldPublish,
    imageAlt: "旧版本数据发布界面",
    icon: Database,
    framework: [
      {
        title: "发布清单",
        items: ["资产名称", "创建人", "状态", "更新时间"],
      },
      {
        title: "发布配置",
        items: ["发布数据资产", "关联维表", "字段口径", "数据来源"],
      },
      {
        title: "生命周期",
        items: ["已上架", "已下架", "国库已停用", "恢复上架"],
      },
      {
        title: "运营反馈",
        items: ["使用统计", "订阅人数", "查询次数", "失效次数"],
      },
    ],
  },
  {
    id: "market",
    title: "数据集市",
    subtitle: "转化侧：发现并订阅",
    description:
      "用分类树、搜索和资产卡片帮助用户发现可用数据，并完成订阅或转入查询。",
    image: images.oldMarket,
    imageAlt: "旧版本数据集市界面",
    icon: Search,
    framework: [
      {
        title: "资产发现",
        items: ["搜索", "最近搜索", "资产推荐", "资产卡片"],
      },
      {
        title: "分类导航",
        items: ["财务域", "采购域", "销售域", "人事域"],
      },
      {
        title: "资产理解",
        items: ["资产名称", "资产描述", "订阅状态", "来源说明"],
      },
      {
        title: "转化动作",
        items: ["订阅", "去查数", "查看详情", "权限申请"],
      },
    ],
  },
  {
    id: "subscriptions",
    title: "我的订阅",
    subtitle: "消费侧：日常查数入口",
    description:
      "沉淀用户已订阅资产与自定义联查，是日常查数和再次进入查询的主路径。",
    image: images.oldSubscriptions,
    imageAlt: "旧版本我的订阅界面",
    icon: Save,
    framework: [
      {
        title: "订阅清单",
        items: ["资产搜索", "订阅数据", "自定义联查"],
      },
      {
        title: "查数入口",
        items: ["查询数据", "修改配置", "新建联查", "字段说明"],
      },
      {
        title: "状态维护",
        items: ["正常", "权限失效", "配置失效", "数据源变更"],
      },
      {
        title: "关系维护",
        items: ["取消订阅", "联查配置", "关联维表", "临时权限"],
      },
    ],
  },
]

function CaseStudyNextBubble() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    let frameId = 0

    const updateActiveIndex = () => {
      const anchor = window.innerHeight * 0.46
      let nextIndex = 0

      sections.forEach((item, index) => {
        const section = document.getElementById(item.id)

        if (!section) {
          return
        }

        const rect = section.getBoundingClientRect()

        if (rect.top <= anchor) {
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(updateActiveIndex)
    }

    updateActiveIndex()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
    }
  }, [])

  const nextSection = sections[Math.min(activeIndex + 1, sections.length - 1)]

  if (!nextSection || activeIndex >= sections.length - 1) {
    return null
  }

  return (
    <a
      href={`#${nextSection.id}`}
      className="group fixed bottom-6 left-1/2 z-40 hidden max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-card/95 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur transition hover:border-foreground/20 hover:text-foreground md:inline-flex"
      aria-label={`Jump to ${nextSection.label}`}
    >
      <span className="truncate">Next · {nextSection.label}</span>
      <ArrowDown className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-y-0.5" />
    </a>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mb-8 max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

function DetailRows() {
  return (
    <div className="mt-8 space-y-5 rounded-lg bg-muted/40 p-5 md:p-6">
      {projectFacts.map(([label, value]) => (
        <div key={label} className="grid gap-2 md:grid-cols-[180px_1fr]">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </p>
          <p className="text-sm leading-7 text-foreground/80 md:text-base">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}

function ImagePreviewDialog({
  image,
  onClose,
}: {
  image: PreviewImage
  onClose: () => void
}) {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  if (typeof document === "undefined") {
    return null
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out"
        aria-label="Close image preview"
        onClick={onClose}
      />
      <div className="pointer-events-none absolute inset-4 md:inset-8">
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized={image.unoptimized}
            sizes="100vw"
            priority
            className="object-contain text-transparent"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/95 text-muted-foreground backdrop-blur transition hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Close image preview"
      >
        <X className="h-4 w-4" />
      </button>
    </div>,
    document.body
  )
}

function Figure({
  src,
  alt,
  aspect = "aspect-[16/9]",
  frame = "bordered",
  objectFit = "contain",
  className,
  reveal = true,
  unoptimized = false,
}: FigureProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const content = (
    <>
      <figure
        className={cn(
          "overflow-hidden rounded-lg",
          frame === "bordered" && "border border-border bg-card"
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group block w-full cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          aria-label={`Open image preview: ${alt}`}
        >
          <div className={cn("relative bg-muted/40", aspect)}>
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized={unoptimized}
              sizes="(min-width: 1024px) 960px, 100vw"
              className={cn(
                "text-transparent",
                objectFit === "cover" ? "object-cover" : "object-contain"
              )}
            />
            <span
              className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            >
              <Maximize2 className="h-4 w-4" />
            </span>
          </div>
        </button>
      </figure>

      {isOpen ? (
        <ImagePreviewDialog
          image={{ src, alt, unoptimized }}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  )

  if (!reveal) {
    return <div className={className}>{content}</div>
  }

  return (
    <Reveal className={className}>
      {content}
    </Reveal>
  )
}

function TextBlock({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      {title ? (
        <h3 className="text-xl font-semibold leading-tight text-foreground md:text-2xl">
          {title}
        </h3>
      ) : null}
      <div className={cn("space-y-4", title && "mt-4")}>{children}</div>
    </Reveal>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-8 text-muted-foreground md:text-base">
      {children}
    </p>
  )
}

function LeadText({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-3xl text-xl font-semibold leading-tight text-foreground md:text-2xl">
      {children}
    </h2>
  )
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 text-sm leading-7 text-muted-foreground"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ClarificationModules() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-lg border border-border bg-card/70">
        {clarificationModules.map((module, index) => (
          <section
            key={module.title}
            className={cn(
              "grid gap-5 p-5 md:grid-cols-[280px_1fr] md:p-7",
              index > 0 && "border-t border-border"
            )}
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {module.index}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-tight text-foreground md:text-2xl">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {module.summary}
              </p>
            </div>

            <ul className="grid gap-4">
              {module.items.map((item) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-muted-foreground md:text-base md:leading-8"
                >
                  <span
                    className="mt-1 flex h-6 w-6 items-center justify-center text-foreground"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="font-medium text-foreground">
                      {item.title}
                    </span>
                    <span>：{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Reveal>
  )
}

function Callout({
  children,
  icon: Icon,
  compact = false,
  reveal = true,
}: {
  children: React.ReactNode
  icon?: IconType
  compact?: boolean
  reveal?: boolean
}) {
  const content = (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/70",
        compact ? "p-4 md:p-4" : "p-5 md:p-6"
      )}
    >
      <div
        className={cn("flex", Icon ? "items-start gap-3" : "items-center")}
      >
        {Icon ? (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
            aria-hidden="true"
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        <p
          className={cn(
            "font-medium text-foreground",
            compact
              ? "text-sm leading-7 md:text-base"
              : "text-base leading-8 md:text-lg"
          )}
        >
          {children}
        </p>
      </div>
    </div>
  )

  if (!reveal) {
    return content
  }

  return (
    <Reveal>
      {content}
    </Reveal>
  )
}

function InlineNote({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn("max-w-4xl", className)}>
      <p className="text-foreground/85 border-l-2 border-foreground/20 bg-muted/30 px-5 py-4 text-sm font-medium leading-8 md:text-base">
        {children}
      </p>
    </Reveal>
  )
}

function LegacyCapabilityMap() {
  const [activeImage, setActiveImage] = React.useState<PreviewImage | null>(
    null
  )

  return (
    <Reveal>
      <div className="grid gap-4">
        {legacyModules.map((module) => {
          const Icon = module.icon

          return (
            <article
              key={module.id}
              className="group overflow-hidden rounded-lg border border-border bg-card transition focus-within:border-foreground/20 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background hover:border-foreground/20 lg:grid lg:grid-cols-[1.08fr_0.92fr]"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveImage({ src: module.image, alt: module.imageAlt })
                }
                className="relative block aspect-[4332/2412] w-full cursor-zoom-in overflow-hidden bg-muted text-left focus:outline-none"
                aria-label={`Open image preview: ${module.imageAlt}`}
              >
                <Image
                  src={module.image}
                  alt={module.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover text-transparent transition duration-500 group-focus-within:scale-[1.015] group-hover:scale-[1.015]"
                />
                <span
                  className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground opacity-0 backdrop-blur transition group-focus-within:opacity-100 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>

              <div className="relative border-t border-border p-5 lg:border-l lg:border-t-0 lg:p-6">
                <div className="transition duration-300 lg:group-focus-within:opacity-0 lg:group-hover:opacity-0">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold leading-tight text-foreground">
                        {module.title}
                      </p>
                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {module.description}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 lg:absolute lg:inset-0 lg:mt-0 lg:overflow-y-auto lg:p-6 lg:opacity-0 lg:transition lg:duration-300 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Module Framework
                    </p>
                    <h4 className="mt-3 text-lg font-semibold leading-tight text-foreground">
                      {module.title}
                    </h4>
                  </div>
                  {module.framework.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-lg border border-border bg-background/60 p-3"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {group.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-muted px-2.5 py-1 text-xs leading-5 text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="text-xs leading-6 text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {activeImage ? (
        <ImagePreviewDialog
          image={activeImage}
          onClose={() => setActiveImage(null)}
        />
      ) : null}
    </Reveal>
  )
}

function PathGrid() {
  const [activeId, setActiveId] = React.useState(pathItems[0].id)
  const [isPaused, setIsPaused] = React.useState(false)
  const [activeImage, setActiveImage] = React.useState<PreviewImage | null>(
    null
  )
  const activeItem =
    pathItems.find((item) => item.id === activeId) ?? pathItems[0]
  const activeIndex = pathItems.findIndex((item) => item.id === activeItem.id)

  React.useEffect(() => {
    if (isPaused || activeImage) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setActiveId((currentId) => {
        const currentIndex = pathItems.findIndex(
          (item) => item.id === currentId
        )
        const nextIndex =
          currentIndex >= 0 ? (currentIndex + 1) % pathItems.length : 0

        return pathItems[nextIndex].id
      })
    }, TASK_PATH_AUTOPLAY_DELAY)

    return () => window.clearTimeout(timer)
  }, [activeId, activeImage, isPaused])

  return (
    <Reveal>
      <div
        className="space-y-5 md:space-y-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          const nextTarget = event.relatedTarget as Node | null

          if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
            setIsPaused(false)
          }
        }}
      >
        <div
          className="grid gap-4 md:grid-cols-4"
          role="tablist"
          aria-label="用户任务路径"
        >
          {pathItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeItem.id

            return (
              <button
                key={item.id}
                type="button"
                id={`task-path-${item.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="task-path-preview"
                onClick={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={cn(
                  "group relative min-h-full rounded-lg border p-5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                  isActive
                    ? "z-10 -translate-y-1 border-foreground/40 bg-card shadow-lg ring-1 ring-foreground/10"
                    : "border-border bg-card/70 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition duration-300",
                    isActive && "scale-110 shadow-md"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-5 text-base font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
                  {item.design}
                </p>
              </button>
            )
          })}
        </div>

        <div
          id="task-path-preview"
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={`task-path-${activeItem.id}`}
          className="overflow-hidden rounded-lg border border-border bg-card p-3 md:p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3 px-1 md:mb-4">
            <div className="flex min-w-0 items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground">
              <span className="text-muted-foreground">
                0{activeIndex + 1} / 0{pathItems.length}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
              <span className="truncate">{activeItem.title}</span>
            </div>
            <div className="flex shrink-0 gap-1.5" aria-hidden="true">
              {pathItems.map((item, index) => (
                <span
                  key={item.id}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-muted-foreground/25 transition",
                    index === activeIndex && "bg-foreground"
                  )}
                />
              ))}
            </div>
          </div>
          <button
            key={activeItem.id}
            type="button"
            onClick={() => setActiveImage(activeItem.preview.image)}
            className="group block w-full cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`Open image preview: ${activeItem.preview.image.alt}`}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-md bg-muted/40",
                activeItem.preview.image.aspect
              )}
            >
              <Image
                src={activeItem.preview.image.src}
                alt={activeItem.preview.image.alt}
                fill
                sizes="(min-width: 1024px) 1080px, 100vw"
                className="object-contain text-transparent transition duration-500 group-hover:scale-[1.01] group-focus-visible:scale-[1.01]"
              />
              <span
                className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <Maximize2 className="h-4 w-4" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {activeImage ? (
        <ImagePreviewDialog
          image={activeImage}
          onClose={() => setActiveImage(null)}
        />
      ) : null}
    </Reveal>
  )
}

function PatternGrid({
  items,
}: {
  items: Array<{ title: string; text: string; icon: IconType }>
}) {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-card/70 p-5"
            >
              <Icon className="h-5 w-5 text-muted-foreground" />
              <h4 className="mt-4 text-base font-semibold leading-6 text-foreground">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.text}
              </p>
            </article>
          )
        })}
      </div>
    </Reveal>
  )
}

function TrustSummary() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {trustSummaryItems.map((item) => {
        const Icon = item.icon

        return (
          <article
            key={item.label}
            className="rounded-lg border border-border bg-card/70 p-5 md:p-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {item.label}
              </p>
            </div>
            <p className="mt-4 text-sm font-medium leading-8 text-foreground md:text-base">
              {item.text}
            </p>
          </article>
        )
      })}
    </div>
  )
}

function TrustStack({ reveal = true }: { reveal?: boolean }) {
  const content = (
    <div className="grid gap-3 md:grid-cols-2">
      {trustLayers.map((item, index) => {
        const Icon = item.icon

        return (
          <article
            key={item.title}
            className={cn(
              "rounded-lg border border-border bg-card/70 p-5",
              index === trustLayers.length - 1 && "md:col-span-2"
            )}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  0{index + 1}
                </p>
                <h4 className="mt-2 text-base font-semibold leading-6 text-foreground">
                  {item.title}
                </h4>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {item.text}
            </p>
          </article>
        )
      })}
    </div>
  )

  if (!reveal) {
    return content
  }

  return (
    <Reveal>
      {content}
    </Reveal>
  )
}

function TrustDesignModule() {
  return (
    <Reveal>
      <div className="space-y-3">
        <TrustSummary />

        <Figure
          src={images.resultTrust}
          alt="思考链、数据流转和筛选排序设计"
          aspect="aspect-[4500/1712]"
          reveal={false}
        />

        <TrustStack reveal={false} />
      </div>
    </Reveal>
  )
}

function CollaborationTimeline() {
  return (
    <div className="space-y-6 md:space-y-7">
      <Reveal>
        <div className="rounded-lg border border-border bg-card/70 p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Deliverable Evolution
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-tight text-foreground md:text-2xl">
                交付物不断靠近产品运行时
              </h3>
            </div>
            <p className="text-sm font-medium text-foreground/80">
              图 -&gt; Demo -&gt; Commit -&gt; Skill
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
            {artifactEvolutionSteps.map((step, index) => {
              const Icon = step.icon

              return (
                <React.Fragment key={step.title}>
                  <div className="flex min-h-[118px] flex-col justify-between rounded-md bg-background/70 p-4">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="mt-5 text-base font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </div>
                  {index < artifactEvolutionSteps.length - 1 ? (
                    <div className="hidden items-center text-muted-foreground md:flex">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  ) : null}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </Reveal>

      <div className="relative">
        <div className="absolute inset-y-6 left-5 hidden w-px bg-border md:block" />
        <div className="space-y-5">
          {collaborationStages.map((stage, stageIndex) => {
            const Icon = stage.icon

            return (
              <Reveal key={stage.phase}>
                <article className="relative rounded-lg border border-border bg-card/70 p-5 md:pl-16">
                  <span className="absolute left-5 top-5 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground md:flex">
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        0{stageIndex + 1} / {stage.phase}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-tight text-foreground">
                        {stage.title}
                      </h3>
                      <div className="mt-4 space-y-2 text-sm leading-7">
                        <p className="text-foreground">
                          <span className="text-muted-foreground">
                            交付物：
                          </span>
                          {stage.artifact}
                        </p>
                        <p className="text-muted-foreground">
                          {stage.distance}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                        {stage.summary}
                      </p>

                      <div
                        className="mt-5 flex flex-wrap items-center gap-2"
                        aria-label={`${stage.phase}协作流程`}
                      >
                        {stage.flow.map((item, index) => (
                          <React.Fragment key={item}>
                            <span className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium leading-5 text-foreground">
                              {item}
                            </span>
                            {index < stage.flow.length - 1 ? (
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : null}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="mt-5 divide-y divide-border border-t border-border">
                        {stage.notes.map((note) => (
                          <div
                            key={note.label}
                            className="grid gap-2 py-4 text-sm leading-7 md:grid-cols-[128px_1fr]"
                          >
                            <p className="font-semibold text-foreground">
                              {note.label}
                            </p>
                            <p className="text-muted-foreground">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Reveal>
        <div className="border-foreground/15 rounded-lg border bg-foreground p-5 text-background md:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">
            Core Insight
          </p>
          <p className="mt-3 text-lg font-semibold leading-8 md:text-xl">
            AI Native 对设计师的真正影响，不是用 AI
            更快生成设计稿，而是重新定义“设计交付物”本身。
          </p>
          <p className="mt-3 text-sm leading-7 opacity-75 md:text-base md:leading-8">
            当产品体验由智能体决策逻辑驱动，设计的对象就不只是界面状态，而是人和
            Agent 协作的规则。
          </p>
        </div>
      </Reveal>
    </div>
  )
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-14 md:py-16", className)}>
      <div className="container max-w-6xl">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="space-y-8 md:space-y-10">{children}</div>
      </div>
    </section>
  )
}

export function DataAgentCaseStudy({ project }: DataAgentCaseStudyProps) {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CaseStudyNextBubble />

      <section
        id="hero"
        className="container max-w-6xl pb-12 pt-8 md:pb-16 md:pt-12"
      >
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-10 w-fit gap-2 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Work
        </Link>

        <Reveal>
          <p className="text-sm leading-7 text-muted-foreground">
            数据自助查询 | AI Native Workflow | 2024 - 2025
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold leading-tight text-foreground md:text-5xl md:leading-[1.08]">
            数据自助查询 Agent Host
          </h1>
        </Reveal>

        <Figure
          src={project.cover ?? images.cover}
          alt={project.coverAlt}
          aspect="aspect-[5/3]"
          objectFit="cover"
          unoptimized
          className="mt-12"
        />
      </section>

      <section id="context" className="container max-w-6xl pb-8 md:pb-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Overview & Context
          </p>
          <div className="mt-3">
            <LeadText>
              数据自助查询是一个我真正觉得接近 AI Native Workflow
              的项目。它不是简单地把聊天框接进数据平台，而是将用户原本散落在&quot;找数、问人、导出、Excel加工、反复核对、沉淀口径&quot;里的工作，重新组织成一条可以被
              AI 参与、被用户验证、被系统沉淀的完整工作流。
            </LeadText>
          </div>
        </Reveal>

        <DetailRows />
      </section>

      <section
        id="situation"
        className="scroll-mt-24 pb-14 pt-10 md:pb-16 md:pt-12"
      >
        <div className="container max-w-6xl">
          <Reveal className="mb-5 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Situation
            </p>
          </Reveal>

          <div className="space-y-14 md:space-y-16">
            <div className="space-y-5 md:space-y-6">
              <TextBlock title="从工具视角看：旧平台的困境已有“查数能力”，但用户完成任务困难">
                <BodyText>
                  数据自助查询平台的原始目标是成为&quot;一站式查数工具&quot;，替代用户线下用
                  Excel
                  查数、对数的习惯。从功能上看，它已经具备数据资产浏览、订阅、查询、筛选、联查、导出等能力。
                </BodyText>
              </TextBlock>

              <LegacyCapabilityMap />
            </div>

            <div className="space-y-5 md:space-y-6">
              <TextBlock
                title="从用户视角看：查数不是一个动作，而是一条链路"
                className="max-w-none"
              >
                <p className="text-sm font-medium leading-8 text-foreground md:text-base">
                  用户是谁：财务 BP、财务分析、经营分析、业务同学。
                </p>
                <BodyText>
                  在接手当前平台，和第一波用户对话后，我更深层的发现是：用户的真实查数过程并不是从“打开一个已知数据表”开始，而是从一个不完整的业务问题开始。
                </BodyText>
                <BodyText>
                  例如，他们想看某个产品的数据，但不知道对应哪个数据资产；知道大概的业务问题，但不确定字段、口径和时间范围；查到了数据，最终还是导出到
                  Excel 自己做筛选、联表、加工和验证。
                </BodyText>
                <BodyText>
                  因此，旧平台的问题不是单个页面不好用，而是用户完成一次查数任务的路径仍然太长、太依赖经验，也较难沉淀。
                </BodyText>
              </TextBlock>

              <Figure
                src={images.userFriction}
                alt="用户摩擦问题卡片"
                aspect="aspect-[4500/1260]"
                frame="plain"
                className="mx-auto max-w-3xl"
              />

              <InlineNote className="max-w-none">
                对这些用户而言，查数包含五个连续动作：找到正确的数据、理解字段/口径/数据关系、根据业务问题筛选/联查/加工、判断结果是否可信、把有价值的结果留到下次继续用。
              </InlineNote>

              <Figure
                src={images.userWorkflow}
                alt="AI Native 数据查询工作流"
                aspect="aspect-[4500/1410]"
                className="mx-auto max-w-3xl"
              />

              <InlineNote className="max-w-none">
                传统数据平台更多支撑第 1-3 步；AI Native
                的机会，是把理解口径、任务执行、结果验证和资产沉淀重新串起来。AI
                负责理解需求、规划任务、调用工具、生成视图，用户负责确认、追问、调整、验证和沉淀。
              </InlineNote>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="task"
        eyebrow="Task"
        title="不是做一个 AI 查数助手，而是设计一套新的数据工作方式"
        description="项目目标是让用户用自然语言表达模糊需求，让 Agent 在需求不完整时主动澄清，并把 AI 的结果呈现为可检查的数据视图，而不是只给一段答案。"
      >
        <Callout>
          把一次临时查数，转化为一个可验证、可调整、可保存、可复用的数据资产。
        </Callout>

        <PatternGrid
          items={[
            {
              title: "自然语言表达",
              text: "用户可以先说一个不完整的业务问题，而不是先学习表、字段、筛选器。",
              icon: MessageSquare,
            },
            {
              title: "可检查结果",
              text: "结果需要能展示数据来源、处理规则和 SQL，让用户建立可信度。",
              icon: Shield,
            },
            {
              title: "资产沉淀",
              text: "一次问数结果可以保存为我的数据资产，并进一步复用或发布为 MCP。",
              icon: Save,
            },
          ]}
        />
      </Section>

      <Section
        id="action-1"
        eyebrow="Action 1"
        title="用户任务建模：从功能地图转向路径地图"
        description="如果按功能模块优化，很容易变成每个页面都改一点，却无法判断用户完成任务的能力是否真的变强。核心判断是先建立查数任务路径，而不是先拆页面。"
      >
        <PathGrid />
      </Section>

      <Section
        id="action-2"
        eyebrow="Action 2"
        title="AI 对话交互设计：设计从模糊到明确的澄清机制"
        description="澄清不是失败，而是 AI 工作流的一部分。自然语言降低了输入门槛，也带来了不确定性；不追问，答案不可信；追问太多，用户又会觉得 AI 没帮上忙。"
      >
        <ClarificationModules />
      </Section>

      <Section
        id="action-3"
        eyebrow="Action 3"
        title="结果可信性设计：让用户敢用 AI 的结果"
        description="数据场景的难点不在让 AI 回答，而在让用户敢用。财务同学查的数据会进入汇报、进入决策；如果无法核实，就不会信任。"
      >
        <TrustDesignModule />
      </Section>

      <Section
        id="action-4"
        eyebrow="Action 4"
        title="资产沉淀闭环：从一次性问数到可复用资产"
        description="如果每次问数都是一次性的，产品只是一个智能搜索框。真正的价值在于一次问数的结果能否被沉淀下来，变成可复用的数据资产，甚至被其他系统调用。"
      >
        <PatternGrid
          items={[
            {
              title: "临时会话 -> 保存视图",
              text: "表格、筛选条件、排序规则可以保存为我的数据资产，解决重复查数。",
              icon: Save,
            },
            {
              title: "保存视图 -> 发布 MCP",
              text: "有价值的视图发布为 MCP 接口，从个人工具变成组织能力。",
              icon: Network,
            },
            {
              title: "官方资产管理",
              text: "验证过的高质量查询模板推荐给其他用户，降低新用户冷启动门槛。",
              icon: Database,
            },
          ]}
        />
      </Section>

      <Section
        id="action-5"
        eyebrow="Action 5"
        title="AI Native 协作方式：从交付界面到定义行为"
        description="这个项目里，协作方式经历了从静态图到可运行 Demo、再到生产代码和 Skill 规则的演化。本质不是设计流程变快了，而是设计交付物不断靠近产品真正运行的地方。"
      >
        <CollaborationTimeline />
      </Section>

      <Section
        id="result"
        eyebrow="Result"
        title="成果与度量"
        description="项目结果不只是一组页面，而是一套能被产品和工程继续使用的工作流框架：从 Demo、交互规则、Skill 架构到埋点体系，都围绕找、查、用、留四段任务路径组织。"
      >
        <PatternGrid
          items={[
            {
              title: "MVP 全流程",
              text: "完成数据 Agent 全流程交互设计与 Demo 开发，支持自然语言问数、文件上传加工、数据联查、结果可视化。",
              icon: Bot,
            },
            {
              title: "2.0 工作流平台",
              text: "完成从问数工具到数据工作流平台的转型，引入视图沉淀、MCP 发布、官方资产管理等闭环能力。",
              icon: Network,
            },
            {
              title: "19+ 真实财务场景",
              text: "从单表查询到多表联查、从文件加工到异常检测，围绕真实场景验证关键链路。",
              icon: BarChart3,
            },
          ]}
        />

        <Reveal>
          <div className="divide-y divide-border rounded-lg border border-border bg-card/70">
            {[
              ["找数据", "搜索无结果率、搜索点击转化率、入口使用分布"],
              [
                "AI 对话构建",
                "视图生成前问答次数、视图生成时间、终止思考频率、点赞/点踩比",
              ],
              [
                "数据消费",
                "查询成功率、查询后调整频率、重置率、明细/图表 Tab 使用偏好",
              ],
              ["资产沉淀", "视图保存率、复用率、MCP 发布量、临时会话转化率"],
            ].map(([label, text]) => (
              <div
                key={label}
                className="grid gap-2 p-5 md:grid-cols-[180px_1fr]"
              >
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-sm leading-7 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section
        id="reflection"
        eyebrow="Reflection"
        title="我的 AI Native 思考"
        description="这个项目让我明确：AI Native 对设计师的真正影响不是“用 AI 提效”，而是重新定义交付物。当产品本身由 Agent 驱动，设计师的价值在于定义智能体如何与人协作。"
        className="pb-24 md:pb-28"
      >
        <PatternGrid
          items={[
            {
              title: "设计师角色变化",
              text: "工作范围覆盖用户任务建模、埋点体系设计、Skill 架构定义、交互 Demo 开发、代码走查与 Merge。",
              icon: Code2,
            },
            {
              title: "AI Native 产品原则",
              text: "不是给功能加 AI，而是用 AI 重新组织任务流；在高可信场景，可检查性大于流畅性。",
              icon: Shield,
            },
            {
              title: "迭代判断",
              text: "先找到重复且繁琐、或原本做不到的高价值场景做深，再扩展到更通用的能力。",
              icon: GitBranch,
            },
          ]}
        />

        <Callout>
          数据自助查询 2.0 不是一个 AI
          问数入口，而是一条从模糊业务问题到结构化数据视图，再到可信验证、资产沉淀与复用的
          AI Native 数据工作流。
        </Callout>
      </Section>
    </main>
  )
}
