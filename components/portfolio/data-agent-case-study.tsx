"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle,
  Code2,
  Database,
  FileText,
  Layers,
  MessageSquare,
  Network,
  Save,
  Search,
  Shield,
  Table,
  Zap,
} from "lucide-react"

import { PortfolioCaseStudy } from "@/lib/notion"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/portfolio/reveal"

type DataAgentCaseStudyProps = {
  project: PortfolioCaseStudy
}

type IconType = React.ComponentType<{ className?: string }>

const sections = [
  { id: "why", label: "Why" },
  { id: "hard", label: "Hard" },
  { id: "how", label: "How" },
  { id: "result", label: "Result" },
  { id: "learned", label: "Learned" },
]

const flowSteps = [
  {
    title: "表达需求",
    description: "用户用业务语言发起查数，不需要先知道表、字段或 SQL。",
    icon: MessageSquare,
  },
  {
    title: "澄清意图",
    description: "Agent 先做轻量意图识别，遇到主体、链路、口径不清时尽早追问。",
    icon: Bot,
  },
  {
    title: "确认方案",
    description: "生成前展示视图类型、核心数据、展示字段、筛选项和链路范围。",
    icon: CheckCircle,
  },
  {
    title: "生成视图",
    description: "产出 SQL、表头、筛选条件、数据流转、处理规则和预览数据。",
    icon: Table,
  },
  {
    title: "保存复用",
    description: "把一次查数沉淀为可再次打开、调整、导出或发布的正式数据视图。",
    icon: Save,
  },
]

const challenges = [
  {
    value: "task-model",
    tabLabel: "任务模型",
    kicker: "UX Challenge 1",
    title: "如何把“我要查数”翻译成可设计的任务模型？",
    problem:
      "老版本平台可以按模块拆解：数据集市、订阅、查询、联查、导出。但如果只顺着功能模块优化，很容易变成“每个页面都好用了一点”，却没有回答用户是否真的完成了查数任务。这个阶段我先把问题从页面层拉回任务层：用户不是要点击查询按钮，而是要从一个业务问题得到一份能理解、能验证、能继续使用的数据视图。",
    judgment:
      "我的判断是先建立任务路径，再拆页面和功能。只有当团队先对“查数到底包含哪些阶段”达成共识，后面的搜索、对话、预览、SQL、保存视图才不会变成一堆孤立能力。",
    actions: [
      {
        title: "从功能地图改成用户路径地图",
        text: "把原来“找资产、查询、联查、消费”的平台视角，重组为“找数据、AI 对话构建视图、数据预览与消费、数据资产沉淀与复用”。这让讨论从“有没有这个功能”转向“用户在这一步卡在哪里，系统应该替他完成什么”。",
        visualTitle: "旧功能地图 vs 新任务路径",
        visualIdea:
          "建议放一张左右对比图：左侧是老平台模块地图，右侧是四阶段用户旅程，用高亮标出你重新定义的任务路径。",
      },
      {
        title: "为每个阶段定义体验成功标准",
        text: "找数据看能否发现有用资产，查数据看能否把业务问题转成字段、筛选和关联关系，用数据看用户是否能理解结果来源，留数据看一次生成能否保存为下一次可复用的工作对象。",
        visualTitle: "阶段成功标准矩阵",
        visualIdea:
          "建议放一张表格或看板：横向是找数据、查数据、用数据、留数据，纵向是用户问题、设计响应、验证指标。",
      },
      {
        title: "把证据层提前纳入主流程",
        text: "数据流转、处理规则、SQL 不再被当成高级用户才看的附属页，而是成为用户判断结果可信度的证据。它们未必每次都被打开，但必须作为“可检查”的结构存在。",
        visualTitle: "证据层纳入主流程",
        visualIdea:
          "建议放结果页局部截图或线框：标注数据流转、处理规则、SQL 在主流程中的位置，体现它们不是隐藏的高级功能。",
      },
    ],
    structure: [
      "找数据",
      "AI 对话构建视图",
      "数据预览与消费",
      "资产沉淀与复用",
    ],
    tradeoff:
      "这里的取舍是克制地做 MVP：先证明自然语言到结构化视图的主链路，而不是一开始覆盖所有高级分析。这样项目目标更清楚，也便于后续用漏斗验证每一步的损耗。",
    learning:
      "复杂 B 端项目的第一步经常不是画界面，而是把问题结构讲清楚。设计价值有时先表现为：团队终于用同一种方式理解了这个问题。",
    image: "功能模块地图 → 用户任务路径地图",
    icon: Search,
  },
  {
    value: "clarify",
    tabLabel: "澄清对话",
    kicker: "UX Challenge 2",
    title: "如何设计“从模糊需求到可执行任务”的 AI 对话？",
    problem:
      "自然语言降低了输入门槛，也把不确定性带进了系统。用户说“查一下这个产品的数据”时，可能缺少产品对象、指标口径、时间范围、明细或汇总方式，甚至不知道自己需要哪张表。如果 Agent 不追问，结果会变得不可靠；如果追问太多，又会让 AI 显得不聪明。",
    judgment:
      "我的判断是把“澄清”设计成 AI workflow 的正常环节，而不是失败状态。系统需要承担把模糊语言翻译成结构化任务的责任，并在关键节点让用户用最小成本补齐信息。",
    actions: [
      {
        title: "定义 Agent 什么时候必须追问",
        text: "当意图不清、数据请求信息不完整、工具调用失败且无法合理产出时，Agent 应该停下来问，而不是继续猜。追问本身也要分层：能收敛成少量选项时给选项，选项过多或缺口复杂时再用自然语言补问。",
        visualTitle: "追问触发判断树",
        visualIdea:
          "建议放一张决策树：意图不清、字段缺失、口径冲突、工具失败分别流向选项追问、自然语言追问或错误恢复。",
      },
      {
        title: "把对话拆成一组运行时状态",
        text: "我把 AI 对话拆成初始态、自然语言提问、文件上传提问、思考过程、Agent 追问、结果呈现、基于上文继续追问。这样研发实现时可以按状态验证，而不是只复刻一个聊天框外观。",
        visualTitle: "AI 对话状态流",
        visualIdea:
          "建议放状态流图或多屏拼图：初始态、提问态、上传态、思考态、追问态、结果态、继续追问态各截一帧。",
      },
      {
        title: "把思考过程做成可展开的透明层",
        text: "数据场景需要透明度，但用户不应该被工具调用细节淹没。所以复杂步骤默认收起，只露出最新进度；当用户需要核查时，再展开看到处理链路。",
        visualTitle: "折叠 / 展开思考过程",
        visualIdea:
          "建议放前后状态对比：默认只显示当前进度，展开后展示工具调用、处理步骤、失败重试或数据链路细节。",
      },
      {
        title: "在生成前加入方案确认",
        text: "生成视图前让用户看到视图类型、核心数据、展示字段、筛选项和链路范围。确认卡片只呈现用户需要判断的内容，不暴露内部 payload 和字段映射噪音。",
        visualTitle: "Preflight 方案确认卡片",
        visualIdea:
          "建议放确认卡片设计稿：标注视图类型、数据资产、字段、筛选条件、排序和关联范围，体现生成前的可确认节点。",
      },
    ],
    structure: ["用户表达", "意图识别", "按需澄清", "方案确认", "生成结果"],
    tradeoff:
      "核心取舍是速度和可信度之间的平衡。不是所有模糊点都值得追问，只有会改变数据对象、口径、筛选或链路的缺口才应该打断用户。",
    learning:
      "AI 产品里，不确定性不是边缘状态，而是主流程。设计需要回答的不只是“怎么问”，还有“何时问、问完如何继续、失败后如何恢复”。",
    image: "提问 → 澄清 → 确认 → 生成的对话状态流",
    icon: MessageSquare,
  },
  {
    value: "workbench",
    tabLabel: "可信工作台",
    kicker: "UX Challenge 3",
    title: "如何让 AI 生成结果变成可信、可复用的工作对象？",
    problem:
      "聊天答案很轻，但数据决策很重。用户拿到结果后，还需要看明细、字段、筛选、处理步骤、SQL、趋势图，也需要判断这次结果下次能不能复用。如果结果只停留在一条聊天消息里，它很难进入真实工作流。",
    judgment:
      "我的判断是把生成结果从“回答”升级为“工作对象”：它必须可查看、可修改、可解释、可保存、可复用。对话适合承接需求和调整意图，结构化工作台适合承载复杂结果和证据。",
    actions: [
      {
        title: "采用左对话、右工作台的双区结构",
        text: "左侧保留 AI 对话，用来发起需求、澄清、调整和继续追问；右侧承载明细数据、可视化看板、数据流转、处理规则和 SQL。用户可以一边和 AI 讨论，一边核查结构化结果。",
        visualTitle: "左对话 + 右工作台总览",
        visualIdea:
          "建议放完整页面截图并加注释：左侧标注需求协商，右侧标注明细、看板、证据层，强调双区分工。",
      },
      {
        title: "重组右侧信息架构",
        text: "右侧不是平铺“数据预览、数据流转、处理规则、SQL、看板”，而是先分成明细表和可视化看板；在明细表内部再放明细数据、数据流转、处理规则、SQL。顺序变成“先看结果，再看结果怎么来的”。",
        visualTitle: "右侧 IA 前后对比",
        visualIdea:
          "建议放一张 before / after：旧版平铺 tab 与新版两层结构并排，突出“先看结果，再看来源”的顺序变化。",
      },
      {
        title: "把可信度拆成可检查的证据",
        text: "数据流转回答来源与节点，处理规则回答筛选、聚合、转换，SQL 回答最终查询逻辑。它们不需要强迫用户每次都读完，但要让用户知道结果不是黑箱。",
        visualTitle: "可信证据三件套",
        visualIdea:
          "建议放三联图：数据流转图、处理规则列表、SQL 展示区，分别说明来源、加工逻辑和最终查询。",
      },
      {
        title: "把一次生成沉淀为可复用资产",
        text: "保存到“我的数据资产”后，视图可以再次打开、继续查询、查看字段和规则，也可以发布 MCP，被外部场景调用。AI 的价值从一次性答案转成长期可复用的数据资产。",
        visualTitle: "保存视图到发布 MCP 链路",
        visualIdea:
          "建议放流程图或多屏串联：生成结果、保存到我的数据资产、再次打开复用、发布 MCP、外部调用。",
      },
    ],
    structure: [
      "对话承接意图",
      "明细表核查结果",
      "证据层解释来源",
      "看板辅助分析",
      "保存并发布复用",
    ],
    tradeoff:
      "这里的取舍是避免把结果页做成信息堆叠。用户首先需要确认“这是不是我要的数”，再逐层进入“为什么可信”和“如何继续用”。",
    learning:
      "AI 生成物必须有产品容器。只有当结果可被检查、修改、保存和调用，它才真正进入用户的工作流。",
    image: "对话区 + 结构化工作台 + 资产沉淀链路",
    icon: Layers,
  },
]

const validationSteps = [
  { label: "需求发起", value: 88, note: "从自然语言问题进入视图生成流程" },
  { label: "澄清完成", value: 72, note: "主体、链路、筛选口径被确认" },
  { label: "生成通过", value: 64, note: "SQL、表头、筛选和 payload 校验通过" },
  { label: "保存复用", value: 49, note: "保存到我的数据，进入后续复用链路" },
]

const learnings = [
  {
    title: "可信不是语气问题，而是证据结构问题",
    description:
      "用户相信一个数据结果，通常不是因为 Agent 说得自信，而是因为能看到字段、规则、SQL、流转和校验边界。",
  },
  {
    title: "AI 产品要先设计“不确定性如何被解决”",
    description:
      "模糊意图、业务术语歧义、资产召回不完整，都不应该被包装成顺滑体验；它们需要被拆成可回答、可确认、可重跑的节点。",
  },
  {
    title: "生成物需要产品容器",
    description:
      "一次生成的 SQL 或表格价值有限。保存、复用、导出、发布 MCP、继续生成看板，才让 AI 输出进入真实工作流。",
  },
]

function ImagePlaceholder({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-dashed bg-muted/30 p-5",
        className
      )}
    >
      <div className="cover-grid-bg opacity-45 absolute inset-0 transition group-hover:opacity-80" />
      <div className="relative flex h-full min-h-[220px] flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <Badge variant="outline" className="bg-background/80">
            图位预留
          </Badge>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight">{title}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

function ActionVisualPlaceholder({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="relative min-h-[260px] overflow-hidden border-b bg-muted/20 p-4 md:min-h-[320px]">
      <div className="cover-grid-bg absolute inset-0 opacity-40" />
      <div className="relative flex h-full min-h-[228px] flex-col justify-between md:min-h-[288px]">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline" className="bg-background/80">
            配图预留
          </Badge>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            case image
          </span>
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight">{title}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

function FlowStep({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string
  description: string
  icon: IconType
  index: number
}) {
  return (
    <div className="relative rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          0{index + 1}
        </span>
      </div>
      <p className="font-semibold tracking-tight">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function MetricBar({
  label,
  value,
  note,
}: {
  label: string
  value: number
  note: string
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {value}%
        </span>
      </div>
      <Progress value={value} className="h-2" />
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p>
    </div>
  )
}

function ChallengeStructure({
  items,
  value,
}: {
  items: string[]
  value: string
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-sm font-medium">设计转译路径</p>
      <div className="mt-4 grid gap-2">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[11px] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 rounded-md border bg-card px-3 py-2 text-sm font-medium">
              {item}
            </div>
          </div>
        ))}
      </div>
      {value === "task-model" ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          这条路径把“查数”从平台功能列表，改写成用户完成任务的连续旅程。
        </p>
      ) : null}
      {value === "clarify" ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          这条路径把不确定性显性化，让 Agent
          在关键缺口处停下来，而不是直接生成。
        </p>
      ) : null}
      {value === "workbench" ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          这条路径把一次性回答变成可核查、可调整、可保存的工作对象。
        </p>
      ) : null}
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        {description}
      </p>
    </Reveal>
  )
}

export function DataAgentCaseStudy({ project }: DataAgentCaseStudyProps) {
  return (
    <main className="font-sans">
      <section className="container py-10 md:py-16">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-8 w-fit gap-2 px-0"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Work
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-background/70">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              从“用户自己找表查数”，转向“Agent
              帮用户把业务问题变成可验证、可保存、可复用的数据视图”。
              这个项目真正让我把 AI Native workflow 当作产品系统来设计。
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="border-b p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Agent Workflow Map</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      预留后续配图：产品流程、界面截图或 Agent pipeline
                    </p>
                  </div>
                  <Badge variant="secondary">2026</Badge>
                </div>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {[
                  ["输入", "自然语言问题"],
                  ["判断", "intent-first triage"],
                  ["确认", "preflight summary"],
                  ["产出", "view / SQL / trace"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-md border bg-background p-4"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-2 font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <ImagePlaceholder
                title="主视觉图位"
                description="建议放一张组合图：左侧自然语言查数对话，右侧数据预览、流转图、SQL 与看板，强调它不是聊天机器人，而是一个可落库的数据工作台。"
                className="m-4 mt-0"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-3 border-y py-5 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <span className="block text-foreground">Role</span>
            Product UX / AI workflow design / front-end validation
          </div>
          <div>
            <span className="block text-foreground">Context</span>
            {project.collaborator}
          </div>
          <div>
            <span className="block text-foreground">Status</span>
            MVP to 2.0, with research and tracking plan
          </div>
        </div>
      </section>

      <section className="container grid gap-10 pb-20 xl:grid-cols-[210px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden xl:block">
          <div className="sticky top-28 overflow-hidden rounded-lg border bg-background/80 p-4 shadow-sm backdrop-blur">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contents
            </p>
            <nav className="mt-4 grid gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 space-y-24">
          <section id="why" className="scroll-mt-28">
            <SectionHeading
              eyebrow="Why"
              title="为什么这个项目值得做"
              description="数据自助查询的核心矛盾不是“有没有数据”，而是业务用户很难把一个自然语言问题稳定地转成正确的数据资产、字段、筛选、链路和结果解释。项目的目标，是把查数从工具操作变成一个可被 Agent 承接、可被用户确认、可被平台保存的工作流。"
            />

            <Reveal delay={0.08} className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "用户痛点",
                  text: "用户知道自己想问什么，却不一定知道该找哪张表、哪个字段、什么业务口径。",
                  icon: MessageSquare,
                },
                {
                  title: "平台痛点",
                  text: "数据资产、查询、分析、保存分散在不同路径里，查数结果难以沉淀为下一次可复用的视图。",
                  icon: Database,
                },
                {
                  title: "AI 机会",
                  text: "Agent 可以承担从问题理解到结构化视图生成的中间层，但前提是边界、证据和确认机制被设计清楚。",
                  icon: Bot,
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <Card key={item.title}>
                    <CardHeader>
                      <Icon className="mb-3 h-5 w-5 text-muted-foreground" />
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="leading-6">
                        {item.text}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </Reveal>

            <Reveal delay={0.12} className="mt-6">
              <div className="rounded-lg border bg-card p-5">
                <div className="grid gap-3 md:grid-cols-5">
                  {flowSteps.map((step, index) => (
                    <FlowStep key={step.title} {...step} index={index} />
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section id="hard" className="scroll-mt-28">
            <SectionHeading
              eyebrow="What's hard"
              title="真正难的是让 AI 查数可控"
              description="这个项目里最值得讲的挑战，不是做一个漂亮的 demo，而是把高风险的数据生成过程拆成可控的产品节点：什么时候问、问什么、什么时候确认、证据从哪里来、结果如何复用。"
            />

            <Reveal className="mt-10 grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-xl font-semibold tracking-tight">
                    信任边界
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  数据资产真相只能来自 SDA MCP，表关系只能来自关系文档，跨
                  catalog 的 SQL 联查需要被禁止。设计上不能把“AI
                  会生成”误导成“AI 可以随意生成”。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-3">
                  <Network className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-xl font-semibold tracking-tight">
                    协作落差
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  早期 demo
                  到研发实现之间会损失很多运行时细节。后来更有效的方式，是直接在研发分支上做交互和样式验收，把状态、文案、边界情况一起验证掉。
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-6">
              <ImagePlaceholder
                title="挑战地图图位"
                description="建议用一张 2x2 图说明：业务术语歧义、资产召回不完整、生成结果可信度、跨团队实现还原度。"
              />
            </Reveal>
          </section>

          <section id="how" className="scroll-mt-28">
            <SectionHeading
              eyebrow="How"
              title="三个 UX Challenge 与设计决策"
              description="这里不按流程罗列产出物，而按真正影响体验质量的岔路口来讲：如何定义查数任务、Agent 如何处理不确定性、AI 生成结果如何被用户验证并继续使用。"
            />

            <Reveal className="mt-10">
              <Tabs defaultValue="task-model" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1 md:grid-cols-3">
                  {challenges.map((challenge) => (
                    <TabsTrigger
                      key={challenge.value}
                      value={challenge.value}
                      className="justify-start whitespace-normal px-4 py-3 text-left"
                    >
                      <span>
                        <span className="block text-xs text-muted-foreground">
                          {challenge.kicker}
                        </span>
                        <span className="mt-1 block">{challenge.tabLabel}</span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {challenges.map((challenge) => {
                  const Icon = challenge.icon

                  return (
                    <TabsContent
                      key={challenge.value}
                      value={challenge.value}
                      className="mt-6"
                    >
                      <div className="rounded-lg border bg-card p-5 md:p-6">
                        <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
                          <div>
                            <div className="flex items-start gap-4">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-muted">
                                <Icon className="h-5 w-5" />
                              </span>
                              <div>
                                <Badge variant="secondary">
                                  {challenge.kicker}
                                </Badge>
                                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                                  {challenge.title}
                                </h3>
                              </div>
                            </div>

                            <div className="mt-8 grid gap-5">
                              <div>
                                <p className="text-sm font-medium">问题定义</p>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                  {challenge.problem}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">我的判断</p>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                  {challenge.judgment}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-4">
                            <ChallengeStructure
                              items={challenge.structure}
                              value={challenge.value}
                            />
                            <div className="rounded-lg border bg-background p-4">
                              <p className="text-sm font-medium">设计取舍</p>
                              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {challenge.tradeoff}
                              </p>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                              <p className="text-sm font-medium">方法沉淀</p>
                              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {challenge.learning}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 border-t pt-6">
                          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                我具体做了什么
                              </p>
                              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                把 Notion
                                里的项目思考转成可落地的体验决策和研发验收点。
                              </p>
                            </div>
                            <Badge variant="outline" className="w-fit">
                              decision log
                            </Badge>
                          </div>

                          <div className="mt-5 grid gap-4">
                            {challenge.actions.map((action, index) => (
                              <div
                                key={action.title}
                                className="overflow-hidden rounded-lg border bg-background"
                              >
                                <ActionVisualPlaceholder
                                  title={action.visualTitle}
                                  description={action.visualIdea}
                                />
                                <div className="p-4">
                                  <div className="mb-3 flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold">
                                      {action.title}
                                    </p>
                                    <span className="font-mono text-xs text-muted-foreground">
                                      {String(index + 1).padStart(2, "0")}
                                    </span>
                                  </div>
                                  <p className="text-sm leading-7 text-muted-foreground">
                                    {action.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
                          <div className="rounded-lg border bg-background p-4">
                            <div className="flex items-center gap-3">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">
                                可以配合展示的材料
                              </p>
                            </div>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                              {challenge.image}
                            </p>
                          </div>
                          <ImagePlaceholder
                            title={challenge.image}
                            description="这里可以放对应阶段的线框、前后对比、流程图或真实界面截图。页面已预留稳定比例，后续替换图片不会破坏版式。"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </Reveal>
          </section>

          <section id="result" className="scroll-mt-28">
            <SectionHeading
              eyebrow="So what"
              title="结果不是一个页面，而是一条验证链路"
              description="2.0 阶段更适合把结果讲成“可验证的漏斗”和“可持续优化的埋点框架”。在还没有公开精确指标时，页面不虚构数字，而是说明应该如何判断这个 Agent 是否真的降低了查数成本。"
            />

            <Reveal className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold tracking-tight">
                  建议沉淀的验证口径
                </h3>
                <div className="mt-6 grid gap-6">
                  {validationSteps.map((step) => (
                    <MetricBar key={step.label} {...step} />
                  ))}
                </div>
                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  这里的百分比是页面展示占位，不作为真实业务数据；后续可替换为
                  2.0 调研与埋点中的实际漏斗。
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    title: "生成成功不等于任务成功",
                    text: "需要同时看澄清完成率、方案确认调整率、校验失败原因、保存率和二次打开率。",
                    icon: Code2,
                  },
                  {
                    title: "用户反馈要贴近工作流节点",
                    text: "与其问“AI 好不好用”，不如问“哪一步让你不敢继续”“哪一段证据不够解释结果”。",
                    icon: FileText,
                  },
                  {
                    title: "看板与导出体现后续价值",
                    text: "如果用户愿意在当前结果集内继续做派生字段、透视表、图表或导出，说明视图已经从答案变成工作资产。",
                    icon: BarChart3,
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <Card key={item.title}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Icon className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                          <div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className="mt-2 leading-6">
                              {item.text}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-6">
              <ImagePlaceholder
                title="埋点漏斗与反馈样本图位"
                description="建议放 2.0 调研与埋点中的漏斗图、关键事件表或用户反馈摘录，用来支撑“哪些环节被验证、哪些仍需优化”。"
              />
            </Reveal>
          </section>

          <section id="learned" className="scroll-mt-28">
            <SectionHeading
              eyebrow="What I learned"
              title="可以迁移到下个 AI 产品的原则"
              description="这个项目最有价值的部分，是它逼着设计从界面层往工作流层移动：AI 不是一个更聪明的输入框，而是一组需要被约束、确认、验证和沉淀的协作机制。"
            />

            <Reveal className="mt-10">
              <Accordion type="single" collapsible defaultValue="trust">
                {learnings.map((learning, index) => (
                  <AccordionItem
                    key={learning.title}
                    value={index === 0 ? "trust" : `item-${index}`}
                  >
                    <AccordionTrigger className="text-left text-lg">
                      {learning.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                        {learning.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-xl font-semibold tracking-tight">
                    对作品集讲述的取舍
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  前半段用 STAR-R
                  的变体讲清楚项目合理性、挑战和关键决策；后半段再讲协作方式的变化。这样不会把页面写成过程流水账，也能保留“我如何用
                  AI Native 的方式做设计与验收”的个人判断。
                </p>
              </div>
            </Reveal>
          </section>
        </div>
      </section>
    </main>
  )
}
