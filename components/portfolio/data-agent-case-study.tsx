"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  GitBranch,
  Image as ImageIcon,
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
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/portfolio/reveal"

type DataAgentCaseStudyProps = {
  project: PortfolioCaseStudy
}

type IconType = React.ComponentType<{ className?: string }>

const actionAnchors = [
  { id: "hero", label: "Intro" },
  { id: "situation", label: "Situation" },
  { id: "task", label: "Task" },
  { id: "action", label: "Action" },
  { id: "result", label: "Result" },
  { id: "reflection", label: "Reflection" },
]

const pathItems = [
  {
    step: "找",
    title: "找数据",
    text: "用户能不能找到可能有用的数据资产",
    design: "搜索、推荐、数据集市浏览、AI 对话入口",
    icon: Search,
  },
  {
    step: "查",
    title: "查数据",
    text: "用户能不能把需求转化为筛选、查询或联查",
    design: "自然语言输入、意图解析、澄清追问、preflight 确认",
    icon: MessageSquare,
  },
  {
    step: "用",
    title: "用数据",
    text: "用户能不能理解、调整和消费结果",
    design: "思考链展示、数据流转 Tab、筛选/排序/列设置、图表切换",
    icon: Table,
  },
  {
    step: "留",
    title: "留数据",
    text: "用户能不能把一次结果沉淀为下次可复用的资产",
    design: "保存视图、发布 MCP、资产管理中心",
    icon: Save,
  },
]

const trustLayers = [
  {
    title: "思考过程透明",
    text: "Agent 的思考链集中在可折叠容器中。默认收起不打断流程，展开可查看完整推理过程。",
  },
  {
    title: "结果呈现分层",
    text: "统一「结论 + 数据/图表」的分层结构。先给结论，再给明细。",
  },
  {
    title: "数据来源可查",
    text: "三个 Tab：「数据流转」「处理规则」「SQL」，满足不同深度的核实需求。",
  },
  {
    title: "结果可调整",
    text: "支持筛选/排序/列设置调整，以及通过「页面元素选取」让 AI 局部修订。",
  },
  {
    title: "反馈闭环",
    text: "点赞/点踩 + 埋点跟踪调整频率和重置率，反向衡量生成质量。",
  },
]

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {number}
      </span>
      <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground md:text-lg">
        {description}
      </p>
    </Reveal>
  )
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-sm border border-dashed border-primary/25 bg-muted/40 transition duration-300 hover:border-primary/45 hover:bg-accent/60">
      <div className="cover-grid-bg flex min-h-[260px] flex-col items-center justify-center gap-4 p-8 text-center md:min-h-[340px]">
        <span className="flex h-12 w-12 items-center justify-center rounded-sm border bg-background text-muted-foreground shadow-sm">
          <ImageIcon className="h-5 w-5" />
        </span>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  )
}

function ActionTag({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: "insight" | "moves"
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-sm px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]",
        tone === "insight"
          ? "bg-secondary text-secondary-foreground"
          : "bg-primary text-primary-foreground"
      )}
    >
      {children}
    </span>
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
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ActionCard({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-sm border bg-card p-6 shadow-2xl shadow-black/5 dark:shadow-black/20 md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
        <span className="absolute right-6 top-4 font-mono text-6xl font-bold leading-none text-primary/[0.07] md:right-8 md:text-8xl">
          {number}
        </span>
        <h3 className="relative max-w-3xl pr-16 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h3>
        <div className="relative mt-8">{children}</div>
      </article>
    </Reveal>
  )
}

function PathGrid() {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-4">
      {pathItems.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.step}
            className="rounded-sm border bg-background p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border bg-muted text-sm font-bold text-foreground">
              {item.step}
            </span>
            <Icon className="mx-auto mt-5 h-4 w-4 text-muted-foreground" />
            <h4 className="mt-4 font-semibold text-foreground">{item.title}</h4>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {item.text}
            </p>
            <p className="mt-4 border-t pt-4 text-[11px] leading-5 text-muted-foreground">
              {item.design}
            </p>
          </div>
        )
      })}
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-sm border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(var(--accent-soft)/0.18),transparent_34%),radial-gradient(circle_at_82%_0%,hsl(var(--primary)/0.08),transparent_30%)]" />
      <div className="relative border-b px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Agent workflow preview
          </span>
        </div>
      </div>
      <div className="relative grid min-h-[460px] gap-0 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="border-b p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-muted text-foreground">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">SDA Agent</p>
              <p className="text-xs text-muted-foreground">
                clarify before generate
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-sm border bg-background p-4">
              <p className="text-sm leading-6 text-foreground">
                查一下 2024 Q4 项目 A 的收入、成本和毛利，按区域拆分。
              </p>
            </div>
            <div className="rounded-sm border bg-accent p-4 text-accent-foreground">
              <p className="text-xs font-medium">Agent 追问</p>
              <p className="mt-2 text-sm leading-6">
                我理解你要做经营分析。请确认收入口径是否包含税费？
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["含税", "不含税", "沿用上次口径"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border bg-background/70 px-3 py-1 text-xs text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">可信数据视图</p>
              <p className="mt-1 text-xs text-muted-foreground">
                result, evidence, SQL, reusable asset
              </p>
            </div>
            <Badge variant="secondary">
              Ready to save
            </Badge>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["收入", "128.4M", "+12.8%"],
              ["成本", "74.2M", "+5.1%"],
              ["毛利", "54.2M", "+21.4%"],
            ].map(([label, value, change]) => (
              <div
                key={label}
                className="rounded-sm border bg-background p-4"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-2 text-xl font-semibold text-foreground">
                  {value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{change}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-sm border">
            <div className="grid grid-cols-4 border-b bg-muted/50 text-xs text-muted-foreground">
              {["区域", "收入", "成本", "毛利"].map((item) => (
                <span key={item} className="px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
            {[
              ["华东", "46.2M", "25.8M", "20.4M"],
              ["华南", "35.1M", "19.7M", "15.4M"],
              ["海外", "28.6M", "17.2M", "11.4M"],
            ].map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-4 border-b text-xs text-muted-foreground last:border-b-0"
              >
                {row.map((cell) => (
                  <span key={cell} className="px-3 py-3">
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["数据流转", "SDA MCP -> fact table -> regional view"],
              ["处理规则", "按区域聚合，排除测试订单"],
              ["SQL", "SELECT region, SUM(revenue)..."],
            ].map(([label, text]) => (
              <div
                key={label}
                className="rounded-sm border bg-background p-3"
              >
                <p className="text-xs font-medium text-foreground">{label}</p>
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingToc() {
  return (
    <aside
      aria-label="Case study contents"
      className="group/toc fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 items-center xl:flex"
    >
      <div className="flex h-[440px] w-8 flex-col items-center justify-center gap-3 rounded-full border border-transparent bg-background/20 backdrop-blur-sm transition group-hover/toc:border-border group-hover/toc:bg-background/85 group-hover/toc:shadow-2xl group-hover/toc:shadow-black/10 group-focus-within/toc:border-border group-focus-within/toc:bg-background/85 group-focus-within/toc:shadow-2xl group-focus-within/toc:shadow-black/10">
        {actionAnchors.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block h-0.5 rounded-full bg-muted-foreground/25 transition hover:bg-foreground focus-visible:bg-foreground focus-visible:outline-none",
              index === 0 ? "w-5 bg-foreground" : "w-3"
            )}
            aria-label={item.label}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute right-11 top-1/2 w-[340px] -translate-y-1/2 translate-x-3 opacity-0 transition duration-200 group-hover/toc:pointer-events-auto group-hover/toc:translate-x-0 group-hover/toc:opacity-100 group-focus-within/toc:pointer-events-auto group-focus-within/toc:translate-x-0 group-focus-within/toc:opacity-100">
        <div className="rounded-lg border bg-background/95 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/10 dark:shadow-black/40">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Contents
          </p>
          <nav className="mt-4 grid gap-1">
            {actionAnchors.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

export function DataAgentCaseStudy({ project }: DataAgentCaseStudyProps) {
  return (
    <main
      id="hero"
      className="relative isolate overflow-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--accent-soft)/0.22),transparent_44%),radial-gradient(ellipse_at_78%_16%,hsl(var(--primary)/0.06),transparent_34%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 cover-grid-bg opacity-[0.10] dark:opacity-[0.06]" />
      <FloatingToc />

      <section className="relative min-h-screen border-b pt-28">
        <div className="container pb-20 md:pb-28">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "mb-10 w-fit gap-2 px-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Work
          </Link>

          <div className="grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-end">
            <Reveal>
              <Badge
                variant="outline"
                className="bg-background/70"
              >
                UX Design x AI Native Workflow
              </Badge>
              <h1 className="mt-7 font-heading text-5xl font-semibold leading-none tracking-tight text-foreground md:text-7xl">
                数据自助查询
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
                从模糊业务问题到可信数据资产的 AI Native 工作流设计
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <span>Senior UX Designer</span>
                <span className="text-muted-foreground/50">/</span>
                <span>2024 - 2025</span>
                <span className="text-muted-foreground/50">/</span>
                <span>Enterprise Data Platform</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="min-w-0 space-y-24">
            <Reveal>
              <div className="max-w-4xl">
                <p className="text-2xl font-medium leading-10 text-foreground md:text-3xl md:leading-[1.65]">
                  数据自助查询是一个我真正觉得接近 AI Native Workflow
                  的项目。它不是简单地把聊天框接进数据平台，而是将用户原本散落在&quot;找数、问人、导出、Excel加工、反复核对、沉淀口径&quot;里的工作，重新组织成一条可以被
                  AI 参与、被用户验证、被系统沉淀的完整工作流。
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-sm border bg-card p-6 md:p-8">
                <p className="text-sm leading-8 text-muted-foreground md:text-base">
                  这个项目让我思考两件事。第一，当 AI
                  进入高可信的企业数据场景，如何重新定义用户任务、交互节奏与结果可信度。第二，产品、设计与开发的边界是否还有意义——Lee
                  Robinson 提过一个观点：AI
                  时代不再需要严格的角色分工，而是需要能端到端交付用户价值的
                  Builder。在这个项目中我切实体验到了这种融合：写交互
                  Demo、在代码分支上走查提交、定义 Agent
                  行为逻辑。这不是设计师「跨界」，而是 AI Native
                  语境下角色边界自然消融的结果。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="situation" className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="min-w-0">
            <SectionHeader number="01" title="Situation" description="背景与问题" />

            <Reveal>
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  从工具视角看：旧平台已有&quot;查数能力&quot;，但用户完成任务困难
                </h3>
                <p className="text-sm leading-8 text-muted-foreground md:text-base">
                  数据自助查询平台的原始目标是成为&quot;一站式查数工具&quot;，替代用户线下用
                  Excel
                  查数、对数的习惯。从功能上看，它已经具备数据资产浏览、订阅、查询、筛选、联查、导出等能力。但灰测后暴露的核心问题是：
                </p>
                <BulletList
                  items={[
                    "用户到底有没有真正用起来？",
                    "哪些功能在用，哪些被忽略？",
                    "核心能力（如联查）对用户是“有用但难用”，还是“压根没被理解”？",
                  ]}
                />
                <p className="text-sm leading-8 text-muted-foreground md:text-base">
                  更深层的发现是：用户的真实查数过程并不是从&quot;打开一个已知数据表&quot;开始，而是从一个不完整的业务问题开始。
                </p>
              </div>
            </Reveal>

            <Reveal>
              <ImagePlaceholder label="配图：旧平台问题示意 / 用户旅程痛点地图" />
            </Reveal>

            <Reveal>
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  从用户视角看：查数不是一个动作，而是一条链路
                </h3>
                <p className="text-sm leading-8 text-muted-foreground md:text-base">
                  <strong className="font-semibold text-foreground">用户是谁：</strong>
                  财务BP、财务分析、经营分析、业务同学
                </p>
                <p className="text-sm leading-8 text-muted-foreground md:text-base">
                  对这些用户而言，查数包含五个连续动作：①找到正确的数据
                  ②理解字段、口径和数据关系 ③根据业务问题筛选/联查/加工
                  ④判断结果是否可信 ⑤把有价值的结果留到下次继续用。
                </p>
                <p className="text-sm leading-8 text-muted-foreground md:text-base">
                  传统数据平台只支撑第1~3步，而 AI Native
                  的机会在于把第2、3、4、5步重新串起来。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="task" className="border-y border-border py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="min-w-0">
            <SectionHeader number="02" title="Task" description="项目目标与约束" />

            <Reveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  不是做一个 AI 查数助手，而是设计一套新的数据工作方式
                </h3>
                <BulletList
                  items={[
                    "让用户可以用自然语言表达模糊需求",
                    "让 Agent 在需求不完整时主动澄清",
                    "让系统把 AI 的结果呈现为可检查的数据视图",
                    "让用户可以理解数据来源、处理规则和 SQL，建立可信度",
                    "让一次临时问数可以保存为“我的数据资产”，并进一步被复用或发布为 MCP",
                  ]}
                />
                <div className="rounded-sm border-l-2 border-primary bg-card p-5">
                  <p className="text-base font-medium leading-8 text-foreground">
                    一句话概括：把一次临时查数，转化为一个可验证、可调整、可保存、可复用的数据资产。
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 rounded-sm border border-border bg-card p-6 md:p-8">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  核心约束：数据场景天然高风险
                </h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground md:text-base">
                  在财务和经营数据场景里，AI
                  不能只回答得流畅。用户真正关心的是：数据是不是取对了、口径是不是正确、过滤条件有没有漏、联查关系是否合理、结果能不能用于汇报或决策。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="action" className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="min-w-0">
            <SectionHeader number="03" title="Action" description="设计行动" />

            <div className="space-y-16">
              <ActionCard
                number="01"
                title="用户任务建模 — 从功能地图转向路径地图"
              >
                <div className="rounded-sm border-l-2 border-primary bg-muted/40 p-5">
                  <ActionTag tone="insight">Insight</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    旧平台有数据集市、订阅、查询、联查、导出等功能。如果按功能模块来优化，很容易变成「每个页面都改一点」，但不知道是否真正改善了用户完成任务的能力。核心判断：先建立查数任务路径，而不是先拆页面。
                  </p>
                </div>

                <div className="mt-8">
                  <ActionTag tone="moves">Moves</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    我把用户任务拆成四段路径：
                  </p>
                  <PathGrid />
                </div>

                <ImagePlaceholder label="配图：四段路径模型图 / 用户任务流程图" />
              </ActionCard>

              <ActionCard
                number="02"
                title="AI 对话交互设计 — 设计“从模糊到明确”的澄清机制"
              >
                <div className="rounded-sm border-l-2 border-primary bg-muted/40 p-5">
                  <ActionTag tone="insight">Insight</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    自然语言降低了输入门槛，但也带来了不确定性。不追问，答案不可信；追问太多，用户觉得
                    AI
                    没帮上忙。核心判断：澄清不是失败，而是 AI 工作流的一部分。
                  </p>
                </div>

                <div className="mt-8">
                  <ActionTag tone="moves">Moves</ActionTag>

                  <div className="mt-6 space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        1. 定义追问触发条件
                      </h4>
                      <p className="mt-3 text-sm leading-8 text-muted-foreground">
                        Agent 在三种情况下主动澄清：
                      </p>
                      <BulletList
                        items={[
                          <span key="intent">
                            <strong className="font-semibold text-foreground">
                              意图识别不清：
                            </strong>
                            用户输入无法解析为明确的 queryType，Agent
                            主动追问意图方向
                          </span>,
                          <span key="slot">
                            <strong className="font-semibold text-foreground">
                              槽位缺失：
                            </strong>
                            意图清晰但关键信息不完整，Agent
                            用选项卡或自然语言补问
                          </span>,
                          <span key="fail">
                            <strong className="font-semibold text-foreground">
                              执行失败：
                            </strong>
                            Skill/工具调用返回异常，Agent
                            向用户解释原因并引导修正
                          </span>,
                        ]}
                      />
                    </div>

                    <ImagePlaceholder label="配图：三种追问触发场景的对话示例截图" />

                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        2. 设计分层追问体验
                      </h4>
                      <BulletList
                        items={[
                          <span key="options">
                            <strong className="font-semibold text-foreground">
                              选项卡（结构化选择）：
                            </strong>
                            可选范围明确且数量有限时，如「含税/不含税」「确认时间范围」。点一下就能继续
                          </span>,
                          <span key="free">
                            <strong className="font-semibold text-foreground">
                              自然语言追问：
                            </strong>
                            范围不明确或选项过多时，用开放式问句引导补充
                          </span>,
                          <span key="preflight">
                            <strong className="font-semibold text-foreground">
                              Preflight 确认：
                            </strong>
                            意图已完整但结果影响较大时，生成前先展示方案摘要让用户确认
                          </span>,
                        ]}
                      />
                    </div>

                    <ImagePlaceholder label="配图：选项卡 / 自然语言追问 / Preflight 确认的 UI 对比" />

                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        3. 定义对话节奏规则
                      </h4>
                      <BulletList
                        items={[
                          "每次追问都携带已理解的部分，让用户感知到进展",
                          "澄清和生成可以交叉进行——先生成初步结果，用户再通过局部修订（revise-skill）迭代",
                        ]}
                      />
                    </div>

                    <ImagePlaceholder label="配图：完整对话流程截图 — 展示澄清→生成→修订的节奏" />
                  </div>
                </div>
              </ActionCard>

              <ActionCard
                number="03"
                title="结果可信性设计 — 让用户敢用 AI 的结果"
              >
                <div className="rounded-sm border-l-2 border-primary bg-muted/40 p-5">
                  <ActionTag tone="insight">Insight</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    数据场景的难点不在让 AI
                    回答，而在让用户敢用。财务同学查的数据会进入汇报、进入决策。如果无法核实，就不会信任。核心判断：在高可信场景，透明度
                    &gt; 效率。
                  </p>
                </div>

                <div className="mt-8">
                  <ActionTag tone="moves">Moves</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    五层可检查机制：
                  </p>

                  <div className="mt-5 divide-y divide-border rounded-sm border bg-background">
                    {trustLayers.map((layer, index) => (
                      <div
                        key={layer.title}
                        className="grid gap-4 p-5 md:grid-cols-[44px_1fr]"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {layer.title}
                          </h4>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            {layer.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <ImagePlaceholder label="配图：结果页面全貌 — 展示思考链容器、分层结果、三个 Tab" />
                <ImagePlaceholder label="配图：局部修订交互 — 「页面元素选取」功能演示" />
              </ActionCard>

              <ActionCard
                number="04"
                title="资产沉淀闭环 — 从一次性问数到可复用资产"
              >
                <div className="rounded-sm border-l-2 border-primary bg-muted/40 p-5">
                  <ActionTag tone="insight">Insight</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    如果每次问数都是一次性的，那产品只是一个「智能搜索框」。真正的价值在于沉淀。核心判断：沉淀是价值的放大器，它把「一次性工作」转化为「组织资产」。
                  </p>
                </div>

                <div className="mt-8">
                  <ActionTag tone="moves">Moves</ActionTag>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    三级沉淀与复用机制：
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
                    {[
                      {
                        title: "临时会话 → 保存视图",
                        text: "一次问数生成的视图可保存为「我的数据资产」，解决重复查数问题。",
                        icon: Save,
                      },
                      {
                        title: "保存视图 → 发布 MCP",
                        text: "有价值的视图发布为 MCP 接口，从「个人工具」变成「组织能力」。",
                        icon: Network,
                      },
                      {
                        title: "官方资产管理",
                        text: "经过验证的高质量模板推荐给其他用户，降低新用户冷启动门槛。",
                        icon: Database,
                      },
                    ].map((item, index) => {
                      const Icon = item.icon

                      return (
                        <React.Fragment key={item.title}>
                          <div className="rounded-sm border border-border bg-background p-5 text-center">
                            <Icon className="mx-auto h-6 w-6 text-muted-foreground" />
                            <h4 className="mt-4 font-semibold text-foreground">
                              {item.title}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {item.text}
                            </p>
                          </div>
                          {index < 2 ? (
                            <ArrowRight className="mx-auto hidden h-full w-5 text-muted-foreground md:block" />
                          ) : null}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>

                <ImagePlaceholder label="配图：资产沉淀流程图 / 保存视图 → MCP 发布的界面截图" />
              </ActionCard>

              <ActionCard
                number="05"
                title="AI Native 协作方式 — 设计师如何重新定义自己的交付物"
              >
                <div className="relative pl-8">
                  <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-border via-primary to-border" />
                  {[
                    {
                      label: "过去",
                      title: "传统瀑布模式",
                      body: "严格串行流：用户想法 → PRD → UX设计稿 → 前后端实现 → 测试 → 上线。设计师交付「静态设计稿」。但在 AI Agent 产品中，非确定性输出 + 深度耦合 Prompt/Skill 架构 + 以周为单位的迭代，让这个前提失效了。",
                    },
                    {
                      label: "现在",
                      title: "我的实践",
                      body: null,
                      current: true,
                    },
                    {
                      label: "未来",
                      title: "我的思考",
                      body: null,
                    },
                  ].map((item) => (
                    <div key={item.label} className="relative pb-10 last:pb-0">
                      <span
                        className={cn(
                          "absolute -left-[37px] top-1 h-3 w-3 rounded-full border-2 border-background bg-muted-foreground",
                          item.current && "bg-primary shadow-lg shadow-primary/30"
                        )}
                      />
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground0">
                        {item.label}
                      </p>
                      <h4 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h4>
                      {item.body ? (
                        <p className="mt-3 text-sm leading-8 text-muted-foreground">
                          {item.body}
                        </p>
                      ) : null}
                      {item.label === "现在" ? (
                        <div className="mt-3 space-y-3">
                          <BulletList
                            items={[
                              <span key="mvp">
                                <strong className="font-semibold text-foreground">
                                  MVP 阶段：
                                </strong>
                                用代码代替设计稿。基于自研 cc-agent-sdk
                                直接写交互 Demo，表达动态节奏、Tool Calling 链路、AI 能力边界
                              </span>,
                              <span key="v2">
                                <strong className="font-semibold text-foreground">
                                  2.0 阶段：
                                </strong>
                                直接在研发代码上做交付。通过 Platgit
                                拉取分支，走查交互/样式后直接提交
                                MR。设计意图从「传达」变成「执行」
                              </span>,
                            ]}
                          />
                          <div className="rounded-sm border bg-muted/40 p-4">
                            <p className="text-sm font-medium leading-7 text-foreground">
                              本质：设计师与产品实现之间的「距离」在不断缩短。信息损耗趋近零。
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {item.label === "未来" ? (
                        <BulletList
                          items={[
                            "设计师核心产出从「界面」转向「规则」——Skill 定义文件即「行为设计稿」",
                            "AI Native 的真正影响不是「用 AI 提效」，而是「重新定义交付物」",
                            "设计师、产品、研发边界模糊 → 产品体验工程师",
                          ]}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </ActionCard>
            </div>
          </div>
        </div>
      </section>

      <section id="result" className="border-y border-border py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="min-w-0">
            <SectionHeader number="04" title="Result" description="成果与度量" />
            <Reveal>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-sm border border-border bg-card p-6">
                  <BarChart3 className="h-5 w-5 text-foreground0" />
                  <h4 className="mt-5 text-xl font-semibold text-foreground">
                    产品成果
                  </h4>
                  <BulletList
                    items={[
                      "MVP：完成数据 Agent 全流程交互设计与 Demo 开发",
                      '2.0：从"问数工具"转型为"数据工作流平台"',
                      "Skill 三层架构设计",
                      "19+ 真实财务场景验证",
                    ]}
                  />
                </div>
                <div className="rounded-sm border border-border bg-card p-6">
                  <FileText className="h-5 w-5 text-foreground0" />
                  <h4 className="mt-5 text-xl font-semibold text-foreground">
                    度量体系
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    围绕四条任务路径建立埋点：
                  </p>
                  <BulletList
                    items={[
                      <span key="find">
                        <strong className="font-semibold text-foreground">
                          找：
                        </strong>
                        搜索无结果率、点击转化率
                      </span>,
                      <span key="query">
                        <strong className="font-semibold text-foreground">
                          查：
                        </strong>
                        问答次数、生成时间、终止频率
                      </span>,
                      <span key="use">
                        <strong className="font-semibold text-foreground">
                          用：
                        </strong>
                        成功率、调整频率、重置率
                      </span>,
                      <span key="keep">
                        <strong className="font-semibold text-foreground">
                          留：
                        </strong>
                        保存率、复用率、MCP 发布量
                      </span>,
                    ]}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="reflection" className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="min-w-0">
            <SectionHeader
              number="05"
              title="Reflection"
              description="我的 AI Native 思考"
            />

            <Reveal>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-sm border border-border bg-card p-6">
                  <Code2 className="h-5 w-5 text-foreground0" />
                  <h4 className="mt-5 font-semibold text-foreground">
                    关于设计师角色
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    工作范围覆盖了用户任务建模、埋点体系设计、Skill
                    架构定义、交互 Demo 开发、代码走查与 Merge。AI
                    时代的设计师需要同时具备：产品思维、工程能力、AI 理解。
                  </p>
                </div>
                <div className="rounded-sm border border-border bg-card p-6">
                  <Shield className="h-5 w-5 text-foreground0" />
                  <h4 className="mt-5 font-semibold text-foreground">
                    关于设计原则
                  </h4>
                  <BulletList
                    items={[
                      "不是给功能加 AI，而是用 AI 重新组织任务流",
                      "可检查性 > 流畅性",
                      "沉淀是价值的放大器",
                      "埋点跟着任务走，不跟着功能走",
                    ]}
                  />
                </div>
                <div className="rounded-sm border border-border bg-card p-6">
                  <GitBranch className="h-5 w-5 text-foreground0" />
                  <h4 className="mt-5 font-semibold text-foreground">
                    关于迭代思维
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    AI 产品的验证逻辑是&quot;先找到一个刮骨场景做到极致，再扩展&quot;，而不是&quot;先做完整再优化&quot;。
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 rounded-sm border border-border bg-gradient-to-br from-card to-background p-8 text-center">
                <CheckCircle2 className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mx-auto mt-5 max-w-4xl text-lg font-medium leading-9 text-foreground">
                  数据自助查询 2.0 不是一个 AI
                  问数入口，而是一条从模糊业务问题到结构化数据视图，再到可信验证、资产沉淀与复用的
                  AI Native 数据工作流。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
