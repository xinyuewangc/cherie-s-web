import {
  Bot,
  Boxes,
  Code2,
  Database,
  Figma,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  PenTool,
  TerminalSquare,
  Zap,
} from "lucide-react"

type LabTopic = {
  title: string
  description: string
  href: string
  icon: typeof Bot
}

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
    href: "mailto:wangxy19971219@163.com",
  },
]

export const focusAreas = [
  "Complex system UX",
  "AI Native workflows",
  "Platform products",
  "Design engineering",
]

export const labTopics: LabTopic[] = []

export const playgroundDemos = [
  {
    title: "Prompt-to-flow system",
    description:
      "Turns a raw request into actors, surfaces, decisions, risks, and open questions.",
    status: "Prototype",
    href: "/playground#prompt-to-flow-system",
    icon: Bot,
  },
  {
    title: "Notion case parser",
    description:
      "Turns raw project notes into clearer sections for problem, thinking, decisions, and outcome.",
    status: "Live concept",
    href: "/playground#notion-case-parser",
    icon: FileText,
  },
  {
    title: "Interface rhythm lab",
    description:
      "A sandbox for spacing, grid density, accent color, motion, and editorial hierarchy.",
    status: "Lab",
    href: "/playground#interface-rhythm-lab",
    icon: Gauge,
  },
]

export const experience = [
  {
    role: "UX Designer",
    place: "miHoYo",
    period: "2023.08 - Present",
    description:
      "Designing miHoYo community products, SDK payment and account systems, HoYoPlay launcher flows, IAM / aPaaS enterprise tools, and reusable design standards.",
  },
  {
    role: "UX Designer Intern",
    place: "Kuaishou",
    period: "2021.06 - 2021.08",
    description:
      "Worked with the special effects product team on Kwaiying editor flows, sharing paths, design specification cleanup, competitive research, developer handoff, and visual QA.",
  },
  {
    role: "Product Experience Design Intern",
    place: "Tencent",
    period: "2020.12 - 2021.06",
    description:
      "Designed mobile, web, PC admin, and data-screen experiences for Tencent Location Service, including Tencent Indoor Map, Penguin Map, official site pages, and POI collection flows.",
  },
  {
    role: "Creative Designer Intern",
    place: "BETC HAVAS",
    period: "2020.10 - 2020.12",
    description:
      "Supported creative research, English concept presentation, visual design, and packaging design for Michelin, Uni-President, Florasis, Colorkey, and other brand projects.",
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
    "王馨悦（Cherie Wang）是一名关注复杂系统体验、AI Native 工作流与设计工程化的 UX 设计师。目前在米哈游负责 C 端社区、账号体系、游戏平台启动器、B 端企业效率工具与数据资产平台等产品的体验设计。",
  highlights: [
    "围绕 0-1 项目设计、复杂业务建模、交互方案、AI 辅助原型、还原验收与设计规范沉淀展开工作。",
    "在米哈游参与米游社、SDK 业务、HoYoPlay 启动器、IAM / aPaaS、国库数据资产等核心产品。",
    "将模糊业务问题拆解为清晰的产品结构和可验证的体验路径，尤其关注 AI Native 工作流与数据产品。",
    "推动 SDK 设计规范 2.0、Otaku 组件库、响应式适配方法与多篇内部方法论沉淀。",
  ],
  experience: [
    {
      company: "米哈游",
      role: "UX 设计师",
      period: "2023.08 - Present",
      body: [
        "在米哈游，我负责多个核心产品方向的体验设计，覆盖从需求理解、业务建模、交互方案、原型搭建、研发协作到上线验收的完整链路。近期重点投入在数据资产、企业效率工具、账号权限体系、社区产品、SDK 业务与游戏平台启动器等方向。",
      ],
      details: [
        {
          title: "国库与数据自助查询",
          body: "负责国库数据资产与数据自助查询 Agent 的体验设计，将传统“找数、查数、导出、核对、沉淀口径”的分散流程，重构为从模糊业务问题到结构化数据视图、可信验证、资产沉淀与复用的 AI Native 数据工作流。设计覆盖意图澄清、结果可检查、视图保存、MCP 发布与资产管理等关键链路。",
        },
        {
          title: "IAM / 中央线",
          body: "参与 B 端 IAM 账号权限相关设计，负责组织与可见性模块中的复杂交互场景，并优化 OTP / SSO 登录链路体验。在组件建设方面，推动 Otaku 组件库在业务中落地，提升设计资源的复用性与一致性。",
        },
        {
          title: "米游社社区",
          body: "负责日常需求与体验优化，包括米油币红包、发布器改版等核心功能迭代；持续产出 ICON 与设计规范，完善社区交互与视觉体系。",
        },
        {
          title: "SDK 业务",
          body: "长期支持 SDK 充值中心、支付平台与账号通行证等场景，主导通行证新官网与原神 UGC 提现的 0-1 设计落地。参与搭建 SDK 设计规范 2.0，覆盖字体、色彩与组件体系，并在 Tablet 与折叠屏适配中总结出可复用的响应式设计方法，提升跨端体验一致性。",
        },
        {
          title: "游戏启动器",
          body: "参与平台启动器 0-1 搭建与快速 MVP 迭代。该产品是一款聚合米家旗下游戏内容的一站式游戏平台，核心流程包括安装、卸载、更新体验优化，账号前置登录链路，以及设置模块迭代。",
        },
        {
          title: "AI Native 与 AIGC",
          body: "持续探索 AI 与 AIGC 在产品体验和设计工作流中的应用。在国库、专业财务、IAM 等 B 端项目中，使用 AI 工具快速搭建交互 demo，支持日级迭代；搭建 Nexus 产品，并通过 coding 主题切换插件实现代码到设计稿的双向同步；沉淀 PRD to Figma Diagram Skill，用于针对 PRD 快速生成可视化分析。",
        },
        {
          title: "专业沉淀",
          body: "在项目之外，主动总结方法论并多次进行团队内部设计经验分享。围绕 SDK 换肤流程、AI 工作流、ShadCN & TailwindCSS、复杂权限设计等方向，沉淀 10+ 篇规范、指南与复盘文章。",
        },
      ],
    },
    {
      company: "快手科技",
      role: "快手用户体验设计部｜UX 设计师",
      period: "2021.06 - 2021.08",
      body: [
        "实习岗位隶属于快手用户体验设计部特效产品中心，团队主要负责快影、一甜相机及必扬特效平台。实习期间，我主要负责快影产品，参与并完成 10+ 个项目，包括设计改版、设计规范梳理与日常迭代支持，流程覆盖需求理解、竞品分析、交互设计、视觉设计、研发对接、测试与视觉验收。",
      ],
      details: [
        {
          title: "编辑器 UX 设计",
          body: "持续优化编辑器和编辑链路的功能体验。参与编辑器迭代设计专项，提升体验一致性；支持解决上一版本遗留的高优问题，进一步提升新功能体验；参与分享链路和编辑器板块优化，引导用户分享并提升分享成功率。",
        },
        {
          title: "设计规范",
          body: "针对快影 5.42 版本进行设计规范梳理，包括组件库搭建、不同弹框场景分类、操作规范同步，以及字体、颜色、图标、圆角、按钮等基础规范整理。",
        },
        {
          title: "其他工作",
          body: "系统了解剪辑行业并熟练掌握剪辑相关功能；定期进行剪辑行业竞品监测，并多次在部门会议中分享；建立数据与反馈记录文档，收集版本数据与线上反馈。",
        },
      ],
    },
    {
      company: "腾讯科技",
      role: "智能产品用户体验设计部｜产品体验设计师",
      period: "2020.12 - 2021.06",
      body: [
        "实习岗位隶属于智能产品用户体验设计部地图服务设计中心，团队主要负责腾讯位置定位大数据相关的企业级产品设计，包括智慧交通 To B 产品、移动端 To C 产品、PC 后台管理平台和数据大屏。实习期间，我参与 10+ 个项目，其中独立完成 5 个项目并推动测试上线，具备独立承接需求与跨角色沟通协作的经验。",
      ],
      details: [
        {
          title: "移动端 UX",
          body: "参与“鹅厂室内通”和“企鹅汇图”的设计。“鹅厂室内通”基于室内导航新增查看与预定空闲会议室功能，同时完成 UI 升级与设计标准化规范整理，小程序上线后获得同事好评。“企鹅汇图”是腾讯地图类众包产品，我独立参与其中 5 个需求设计，包括消息中心、活动中心、路段快速报错与 POI 采集等。",
        },
        {
          title: "网页 Web",
          body: "参与腾讯位置服务官网改版设计，独立完成“物流解决方案”“服务升级中的配额提升”“坐标拾取器”3 个页面需求的设计输出，工作包含产品需求对接、设计输出、交互视觉评审与还原视觉走查。",
        },
      ],
    },
    {
      company: "BETC HAVAS",
      role: "创意设计部｜创意设计师",
      period: "2020.10 - 2020.12",
      body: [
        "BETC 是法国第一、欧洲第三、全球第十大创意咨询机构，为品牌提供咨询与创意解决方案。实习期间，我参与米其林轮胎、统一、花西子、Colorkey 柯拉琪等项目，能熟练使用英语与同事进行工作交流，并在品牌创意活动中承担关键角色，通过有想象力和说服力的展示获得客户认可。",
        "其中，我全程参与统一新产品 “A-HA 气泡水果饮料” 的创意研发。工作包括宣传目标与效果预期测试、创意头脑风暴、全英文部门方案介绍，以及最终创意方案的视觉与包装设计支持。该产品于 2022 年初量产。",
      ],
    },
  ],
  education:
    "英国皇家艺术学院（RCA）服务设计硕士；伦敦商学院（LBS）创意到原型交换课程；江南大学整合创新设计 / 产品设计背景，并有香港理工大学交互设计交换经历。",
  awards:
    "曾获得亚洲创新设计大赛金奖、非遗创新设计大赛优秀作品奖、创青春全国大学生创业大赛三等奖、蚂蚁设计大赛创新奖，并拥有家居产品与音乐产品相关实用新型专利。",
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
    value:
      "Notion projects, covers, notes, screenshots, resume material, and project metadata.",
    icon: Database,
  },
  {
    label: "Structure",
    value:
      "Each project becomes a modular reading system with metadata, sections, and navigation.",
    icon: Zap,
  },
  {
    label: "Ship",
    value:
      "Next.js pages, MDX notes, shadcn surfaces, motion, dark mode, and Vercel-ready publishing.",
    icon: TerminalSquare,
  },
]
