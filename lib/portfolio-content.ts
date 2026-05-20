import {
  Bot,
  Boxes,
  Brush,
  Code2,
  Cpu,
  Database,
  Figma,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  Palette,
  PenTool,
  TerminalSquare,
  Activity,
  Zap,
} from "lucide-react"

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/xinyuewangc",
  },
  {
    label: "X",
    href: "https://twitter.com/xinyuewangc",
  },
  {
    label: "Email",
    href: "mailto:hello@cherie.design",
  },
]

export const focusAreas = [
  "Designer × AI Builder",
  "AI interface systems",
  "Workflow orchestration",
  "Design engineering",
]

export const labTopics = [
  {
    title: "AI workflow systems",
    description:
      "Repeatable loops for research synthesis, interface iteration, context handoff, and decision logging.",
    href: "/lab/ai-native-workflow-notes",
    icon: Activity,
  },
  {
    title: "shadcn/ui",
    description:
      "Component primitives as a compact language for product tools, documentation, and operating surfaces.",
    href: "/lab/shadcn-interface-systems",
    icon: Boxes,
  },
  {
    title: "Tailwind",
    description:
      "A styling grammar for spacing rhythm, dense controls, responsive polish, and visual consistency.",
    href: "/lab/tailwind-composition",
    icon: Layers,
  },
  {
    title: "OKLCH",
    description:
      "Color tokens with perceptual control, calmer contrast, and less accidental mood drift.",
    href: "/lab/oklch-token-thinking",
    icon: Palette,
  },
  {
    title: "MCP",
    description:
      "Local tools, Notion, Figma, browser checks, and code changes connected into one working loop.",
    href: "/lab/mcp-design-ops",
    icon: Cpu,
  },
  {
    title: "Design systems",
    description:
      "Rules, components, examples, and content models that make teams faster without feeling boxed in.",
    href: "/lab/design-system-field-notes",
    icon: Brush,
  },
]

export const playgroundDemos = [
  {
    title: "Prompt-to-flow system",
    description:
      "Turns a raw request into actors, surfaces, decisions, risks, and open questions.",
    status: "Prototype",
    icon: Bot,
  },
  {
    title: "Notion case parser",
    description:
      "Turns raw project notes into clearer sections for problem, thinking, decisions, and outcome.",
    status: "Live concept",
    icon: FileText,
  },
  {
    title: "Interface rhythm lab",
    description:
      "A sandbox for spacing, grid density, accent color, motion, and editorial hierarchy.",
    status: "Lab",
    icon: Gauge,
  },
]

export const experience = [
  {
    role: "Designer × AI Builder × System Thinker",
    place: "Independent portfolio system",
    period: "2026",
    description:
      "Building a Notion-backed portfolio and design workflow that treats content, prototypes, and code as one system.",
  },
  {
    role: "Product / UX Designer",
    place: "Enterprise and game platform work",
    period: "Recent",
    description:
      "Designed platform flows, account systems, creator tooling, payment surfaces, and operational interfaces.",
  },
  {
    role: "Design Engineer collaborator",
    place: "Local AI tooling",
    period: "Now",
    description:
      "Using Codex, MCP, shadcn/ui, Tailwind, and Notion to compress the distance between thinking and shipping.",
  },
]

export const toolStack = [
  { label: "Figma", icon: Figma },
  { label: "Notion", icon: Database },
  { label: "Next.js", icon: Code2 },
  { label: "Tailwind", icon: Layers },
  { label: "shadcn/ui", icon: Boxes },
  { label: "Codex", icon: TerminalSquare },
  { label: "GitHub", icon: GitBranch },
  { label: "Writing", icon: PenTool },
]

export const designPrinciples = [
  {
    title: "Systems before screens",
    body: "Good interface work starts with flows, states, ownership, constraints, and reusable decisions.",
  },
  {
    title: "AI as working surface",
    body: "AI should clarify intent, compress routine work, and leave better traces for the next iteration.",
  },
  {
    title: "Notebook over gallery",
    body: "This portfolio should read like product thinking in motion, not a visual gallery trying to win the scroll.",
  },
  {
    title: "Soft motion, hard structure",
    body: "Motion should help the eye understand hierarchy and continuity, while the grid does the heavy lifting.",
  },
]

export const resumeSummary = {
  intro:
    "王馨悦（Cherie Wang）是一名聚焦 AI-native 产品系统、平台工具与设计工程协作的 UX 设计师。她目前在米哈游负责 HoYoPlay 启动器、SDK 支付与账号体系、社区产品、中央站权限与企业效率工具等复杂产品体验，擅长把多端流程、B/C 端场景、设计规范和研发协作整理成可持续迭代的系统。",
  highlights: [
    "在米哈游覆盖启动器、SDK、社区、中央站等核心业务，参与从 0-1 到持续迭代的产品体验设计。",
    "长期处理账号、支付、登录注册、UGC 提现、权限与组织可见性等高复杂度流程，强调链路清晰、状态完整和可落地交付。",
    "推动 SDK 设计规范 2.0、通用组件与 Otaku 组件库在业务中落地，提升多人协作下的复用性与一致性。",
    "具备腾讯位置服务、快手特效产品、BETC HAVAS 创意咨询等实习经历，横跨 B 端系统、移动端产品、内容工具与品牌创意。",
  ],
  experience: [
    {
      company: "miHoYo",
      role: "UX Designer",
      period: "2023.08 - 2025",
      body: "负责 HoYoPlay 启动器、SDK 支付/账号、社区与中央站等业务的体验设计，包含核心流程搭建、MVP 快速迭代、设计规范沉淀与跨职能协作。",
    },
    {
      company: "Kuaishou",
      role: "UX Design Intern",
      period: "2021.06 - 2021.08",
      body: "参与快手特效、快影、一甜相机等产品体验设计，覆盖竞品分析、交互/视觉设计、规范梳理、研发对接与视觉验收。",
    },
    {
      company: "Tencent",
      role: "Product Experience Design Intern",
      period: "2020.12 - 2021.06",
      body: "在腾讯位置服务相关团队参与企业级平台、移动端产品、PC 后台与数据大屏设计，积累复杂信息架构和 B 端系统设计经验。",
    },
  ],
  education:
    "英国皇家艺术学院（RCA）服务设计硕士；伦敦商学院（LBS）创意创新创业课程；江南大学整合创新设计 / 产品设计背景，并有香港理工大学交互设计交换经历。",
  awards:
    "曾获得亚洲创新设计大赛金奖、非遗创新设计大赛优秀作品奖、创青春全国大学生创业大赛二等奖，并拥有家居产品与音乐产品相关实用新型专利。",
}

export const heroSignals = [
  {
    label: "Identity",
    value: "Designer × builder",
  },
  {
    label: "Mode",
    value: "AI + design + code",
  },
  {
    label: "Content",
    value: "Notion",
  },
  {
    label: "Surface",
    value: "Living workspace",
  },
]

export const systemLoop = [
  {
    label: "Capture",
    value: "Notion projects, covers, notes, screenshots, resume material, and project metadata.",
    icon: Database,
  },
  {
    label: "Structure",
    value: "Each project becomes a modular reading system with metadata, sections, and navigation.",
    icon: Zap,
  },
  {
    label: "Ship",
    value: "Next.js pages, MDX notes, shadcn surfaces, motion, dark mode, and Vercel-ready publishing.",
    icon: TerminalSquare,
  },
]
