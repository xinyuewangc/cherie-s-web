"use client"

import { useMemo, useState } from "react"
import type { ComponentType, ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Droplets, Flower2, Leaf, Waves } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  useLanguagePreference,
  type SiteLanguage,
} from "@/components/language-toggle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

type OklchColor = {
  model: "oklch"
  l: number
  c: number
  h: number
  a: number
  css: string
}

type HslColor = {
  model: "hsl"
  h: number
  s: number
  l: number
  a: number
  css: string
}

type ColorValue = OklchColor | HslColor

const hueSteps = [0, 30, 60, 90, 120, 150, 180, 210]
const compareHues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
const paletteSteps = [96, 90, 82, 74, 66, 58, 50, 42, 34, 26]

type ColorSystemKey = "blue" | "green" | "rose"

const colorSystems: Array<{
  key: ColorSystemKey
  hue: number
  chroma: number
  pairedHue: number
}> = [
  { key: "blue", hue: 252, chroma: 0.18, pairedHue: 92 },
  { key: "green", hue: 145, chroma: 0.16, pairedHue: 300 },
  { key: "rose", hue: 18, chroma: 0.19, pairedHue: 205 },
]

const articleCopy: Record<SiteLanguage, Record<string, string>> = {
  zh: {
    eyebrowSuffix: "交互文章",
    title: "什么是 OKLCH？",
    intro:
      "OKLCH color 看起来像是一个更现代的 CSS 颜色写法，但我第一次点开资料时，先看到的是一堆公式和坐标空间。",
    wikiTitle: "Wikipedia 说",
    mathTitle: "然后数学出现了",
    complicated: "有点复杂...",
    transition:
      "所以后半段不继续堆概念，直接把它拆成可以拖、可以对比、可以看代码的交互 demo：L、C、H、Alpha 分别控制什么，为什么 OKLCH 比 HSL 更适合做 UI 色阶。",
    back: "所有 Lab 笔记",
  },
  en: {
    eyebrowSuffix: "interactive article",
    title: "What OKLCH is?",
    intro:
      "OKLCH looks like a more modern way to write CSS colors. But the first time I opened the references, what I saw was a pile of formulas and color-space coordinates.",
    wikiTitle: "Wikipedia says",
    mathTitle: "Then the math appears",
    complicated: "A little complicated...",
    transition:
      "So instead of stacking more definitions, the second half turns OKLCH into an interactive demo: drag the values, compare the models, read the generated code, and see why it works better for UI color ramps than HSL.",
    back: "All lab notes",
  },
}

const labCopy: Record<SiteLanguage, Record<string, string>> = {
  zh: {
    codeLabel: "对应代码",
    syntaxTitle: "OKLCH 是什么？",
    syntaxBody:
      "OKLCH 用 Lightness、Chroma、Hue 来定义颜色。先不用急着记公式，拖动下面四个值，就能感受到它们各自控制了什么。",
    lightnessNote:
      "保持 C 和 H 不变，只改变 L，可以看到感知亮度从暗到亮连续变化。",
    chromaNote:
      "固定 L 和 H，只改变 C，可以看到颜色从灰感逐渐走向更高饱和度。",
    uniformityTitle: "同样的亮度，在 HSL 里不一定一样亮",
    uniformityBody:
      "HSL 的 50% lightness 会随 hue 产生很强的视觉差异。OKLCH 的 L 更接近人的感知，所以同一个 L 值会更像真的“同样亮”。",
    uniformityNote:
      "两行都共享同一个 lightness 数值。差别在于 HSL 的亮度不是感知均匀的，而 OKLCH 的 L 更可控。",
    paletteTitle: "生成色阶时，OKLCH 更像一个可控旋钮",
    paletteBody:
      "设计系统里的 100 到 1000 色阶，最怕中间突然脏掉或跳亮。固定 hue，再让 lightness 有节奏地变化，OKLCH 的过渡会更均匀。",
    paletteNote:
      "右侧的色阶只需要围绕同一个 hue 和 chroma 组织 lightness，就能形成更稳定的 token ramp。",
    relativeTitle: "从一个基础色推导一组状态色",
    relativeBody:
      "相对色彩让 CSS 可以基于 `--base` 推导 hover、surface、dark、light，不用把每个状态色手写死。",
    relativeNote:
      "这里的核心是保留同一个 hue，只用 `calc(l + x)` 或 `calc(l - x)` 生成状态色。",
    gradientTitle: "渐变也会暴露色彩空间的差异",
    gradientBody:
      "同一组起止色放进不同色彩空间里插值，结果会很不一样。切换下面的色彩系统，可以直接看到 HSL 和 OKLCH 渐变的差别。",
    hslGradientBody:
      "HSL 会沿色相环插值，有时会穿过意外高亮或偏脏的中间色。",
    oklchGradientBody:
      "OKLCH 让感知亮度更稳定，渐变更像被设计过，而不是被色环牵着走。",
    gradientNote: "两条渐变都保留相近的起止方向，差别来自颜色空间的插值方式。",
    derivedBase: "基础色",
    derivedLight: "变亮 +0.18",
    derivedDark: "变暗 -0.15",
    derivedSoft: "柔和表面",
    currentBase: "当前基础色",
    blueSystem: "蓝色系统",
    greenSystem: "绿色系统",
    roseSystem: "玫瑰系统",
    gradientBase: "当前基色",
    gradientPair: "配对色相",
  },
  en: {
    codeLabel: "Code",
    syntaxTitle: "What is OKLCH?",
    syntaxBody:
      "OKLCH defines color with Lightness, Chroma, and Hue. You do not need to memorize the formula first: move the sliders and the four channels start to feel concrete.",
    lightnessNote:
      "Keep C and H stable, change only L, and the perceived brightness moves from dark to light in a steady way.",
    chromaNote:
      "Keep L and H stable, change only C, and the color moves from grayish to more vivid.",
    uniformityTitle: "The same lightness is not always equally bright in HSL",
    uniformityBody:
      "In HSL, 50% lightness can look very different from one hue to another. OKLCH's L is closer to how humans perceive brightness, so the same L value behaves more consistently.",
    uniformityNote:
      "Both rows share the same lightness value. HSL lightness is not perceptually uniform; OKLCH L is easier to control.",
    paletteTitle: "For color ramps, OKLCH behaves like a better control knob",
    paletteBody:
      "In design-system scales from 100 to 1000, the middle tones can easily get muddy or jump in brightness. Keeping hue stable and moving lightness rhythmically makes OKLCH ramps feel more even.",
    paletteNote:
      "The OKLCH ramp organizes lightness around one hue and chroma, which makes token ramps easier to keep stable.",
    relativeTitle: "Derive a family of states from one base color",
    relativeBody:
      "Relative colors let CSS derive hover, surface, dark, and light states from `--base`, instead of hard-coding every state color.",
    relativeNote:
      "The key is to keep the same hue and generate states with `calc(l + x)` or `calc(l - x)`.",
    gradientTitle: "Gradients reveal the color space too",
    gradientBody:
      "Put the same start and end colors into different interpolation spaces, and the result changes quickly. Switch the color systems below to compare HSL and OKLCH directly.",
    hslGradientBody:
      "HSL interpolates around the hue circle, so the midpoint can become unexpectedly bright or muddy.",
    oklchGradientBody:
      "OKLCH keeps perceived lightness steadier, making the gradient feel more intentionally designed.",
    gradientNote:
      "Both gradients keep similar start and end directions; the visible difference comes from the interpolation space.",
    derivedBase: "Base",
    derivedLight: "Light +0.18",
    derivedDark: "Dark -0.15",
    derivedSoft: "Soft surface",
    currentBase: "Current Base",
    blueSystem: "Blue System",
    greenSystem: "Green System",
    roseSystem: "Rose System",
    gradientBase: "Current base",
    gradientPair: "Paired hue",
  },
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const formatNumber = (value: number, digits = 2) =>
  Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1")
    .replace(/^-0$/, "0")

const formatDegrees = (value: number) => `${formatNumber(value)}deg`

const oklchString = (
  lightness: number,
  chroma: number,
  hue: number,
  alpha = 1
) =>
  `oklch(${formatNumber(lightness)}% ${formatNumber(chroma)} ${formatNumber(
    hue
  )} / ${formatNumber(alpha)})`

const hslString = (hue: number, saturation: number, lightness: number) =>
  `hsl(${formatNumber(hue)} ${formatNumber(saturation)}% ${formatNumber(
    lightness
  )}%)`

function makeOklch(
  lightness: number,
  chroma: number,
  hue: number,
  alpha = 1
): OklchColor {
  return {
    model: "oklch",
    l: lightness,
    c: chroma,
    h: hue,
    a: alpha,
    css: oklchString(lightness, chroma, hue, alpha),
  }
}

function makeHsl(
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 1
): HslColor {
  return {
    model: "hsl",
    h: hue,
    s: saturation,
    l: lightness,
    a: alpha,
    css: `hsl(${formatNumber(hue)} ${formatNumber(saturation)}% ${formatNumber(
      lightness
    )}% / ${formatNumber(alpha)})`,
  }
}

function swatchTextColor(color: ColorValue) {
  if (color.model === "hsl") {
    return color.l >= 78 ? "#0a1127" : "#f8fbff"
  }

  if (color.l >= 82) {
    return "#0a1127"
  }

  if (color.l >= 72 && color.c <= 0.14) {
    return "#0a1127"
  }

  return "#f8fbff"
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <header className="grid gap-3">
      <Badge variant="outline" className="w-fit uppercase tracking-[0.18em]">
        {eyebrow}
      </Badge>
      <h2
        className="font-sans text-3xl font-bold leading-tight tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      <div className="max-w-3xl text-base leading-7 text-muted-foreground">
        {children}
      </div>
    </header>
  )
}

function DemoPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Card className="bg-card/70">
      <CardContent className={cn("p-4 md:p-5", className)}>
        {children}
      </CardContent>
    </Card>
  )
}

function RangeControl({
  label,
  value,
  output,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  output: string
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-baseline justify-between gap-3 text-sm font-medium">
        {label}
        <output className="font-mono text-xs text-muted-foreground">
          {output}
        </output>
      </span>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([nextValue]) => {
          if (typeof nextValue === "number") {
            onChange(nextValue)
          }
        }}
      />
    </label>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted/45 overflow-x-auto rounded-md border p-4 text-xs leading-6 text-foreground/90">
      <code>{code}</code>
    </pre>
  )
}

function CodeToggle({
  code,
  children,
  label,
}: {
  code: string
  children: ReactNode
  label: string
}) {
  return (
    <Accordion type="single" collapsible className="rounded-md border px-4">
      <AccordionItem value="code" className="border-0">
        <AccordionTrigger className="py-3 text-sm text-muted-foreground hover:no-underline">
          {label}
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-4">
            <p className="m-0 text-sm leading-6 text-muted-foreground">
              {children}
            </p>
            <CodeBlock code={code} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function Swatch({
  label,
  color,
  className,
}: {
  label: string
  color: ColorValue
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-h-[104px] items-end justify-center rounded-md border p-3 text-center text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5",
        className
      )}
      style={{ background: color.css, color: swatchTextColor(color) }}
      title={color.css}
    >
      {label}
    </div>
  )
}

function PaletteChip({
  label,
  meta,
  color,
}: {
  label: string
  meta: string
  color: ColorValue
}) {
  return (
    <div
      className="flex min-h-[118px] items-end rounded-md border p-3 shadow-sm transition-transform hover:-translate-y-0.5"
      style={{ background: color.css, color: swatchTextColor(color) }}
      title={color.css}
    >
      <div className="grid w-full gap-1 text-center text-sm font-semibold">
        <span>{label}</span>
        <span className="text-xs font-medium opacity-80">{meta}</span>
      </div>
    </div>
  )
}

function ColorSystemButton({
  children,
  active,
  icon: Icon,
  onClick,
}: {
  children: ReactNode
  active: boolean
  icon: ComponentType<{ className?: string }>
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      className="gap-2 rounded-full"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {children}
      {active ? <Check className="h-3.5 w-3.5" /> : null}
    </Button>
  )
}

export function OklchLabArticle() {
  const [language] = useLanguagePreference()
  const copy = articleCopy[language]

  return (
    <main className="container max-w-6xl py-12 md:py-16">
      <Link
        href="/lab"
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 gap-2 px-0")}
      >
        <ArrowLeft className="h-4 w-4" />
        {copy.back}
      </Link>

      <section className="grid gap-10">
        <div>
          <h1
            className="font-sans text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-muted-foreground">
            {copy.intro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card/80">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {copy.wikiTitle}
              </p>
              <div className="mt-5 grid gap-3 font-mono text-sm leading-7 text-muted-foreground">
                <p>L = perceived lightness</p>
                <p>C = chroma, relative to neutral gray</p>
                <p>H = hue angle in polar coordinates</p>
                <p className="rounded-md bg-muted/60 p-3 text-foreground">
                  OKLCH = cylindrical form of OKLab
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/80">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {copy.mathTitle}
              </p>
              <div className="mt-5 grid gap-3 break-words font-mono text-xs leading-6 text-muted-foreground">
                <p>L = 0.2104542553l + 0.7936177850m - 0.0040720468s</p>
                <p>a = 1.9779984951l - 2.4285922050m + 0.4505937099s</p>
                <p>b = 0.0259040371l + 0.7827717662m - 0.8086757660s</p>
                <p className="rounded-md bg-muted/60 p-3 text-foreground">
                  {copy.complicated}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-3xl bg-card/70">
          <CardContent className="p-5 text-base leading-7 text-muted-foreground">
            {copy.transition}
          </CardContent>
        </Card>
      </section>

      <article className="mt-12">
        <OklchInteractiveLab language={language} />
      </article>
    </main>
  )
}

export function OklchInteractiveLab({
  language,
}: {
  language: SiteLanguage
}) {
  const copy = labCopy[language]
  const [syntax, setSyntax] = useState({
    lightness: 62,
    chroma: 0.18,
    hue: 252,
    alpha: 1,
  })
  const [uniformityLightness, setUniformityLightness] = useState(50)
  const [palette, setPalette] = useState({ hue: 252, chroma: 0.18 })
  const [relative, setRelative] = useState({
    lightness: 60,
    chroma: 0.17,
    hue: 250,
  })
  const [gradientLightness, setGradientLightness] = useState(72)

  const preset = useMemo(() => {
    return (
      colorSystems.find(
        (item) =>
          Math.abs(item.hue - palette.hue) < 0.5 &&
          Math.abs(item.chroma - palette.chroma) < 0.005
      )?.key ?? null
    )
  }, [palette])

  const activeSystem = colorSystems.find((item) => item.key === preset)

  const syntaxLightnessSwatches = [20, 40, 60, 80].map((value) => ({
    label: `${value}%`,
    color: makeOklch(value, syntax.chroma, syntax.hue, syntax.alpha),
  }))

  const syntaxChromaSwatches = [0.4, 0.25, 0.1, 0.02].map((value) => ({
    label: formatNumber(value),
    color: makeOklch(syntax.lightness, value, syntax.hue, syntax.alpha),
  }))

  const syntaxHueSwatches = hueSteps.map((value) => ({
    label: formatDegrees(value),
    color: makeOklch(syntax.lightness, syntax.chroma, value, syntax.alpha),
  }))

  const syntaxAlphaSwatches = [1, 0.75, 0.5, 0.25].map((value) => ({
    label: `${Math.round(value * 100)}%`,
    color: makeOklch(syntax.lightness, syntax.chroma, syntax.hue, value),
  }))

  const uniformityHslSwatches = compareHues.map((hue) => ({
    label: formatDegrees(hue),
    color: makeHsl(hue, 100, uniformityLightness),
  }))

  const uniformityOklchSwatches = compareHues.map((hue) => ({
    label: formatDegrees(hue),
    color: makeOklch(uniformityLightness, 0.18, hue),
  }))

  const hslPalette = paletteSteps.map((lightness, index) => ({
    label: `${(index + 1) * 100}`,
    meta: `L ${lightness}%`,
    color: makeHsl(palette.hue, 100, lightness),
  }))

  const oklchPalette = paletteSteps.map((lightness, index) => ({
    label: `${(index + 1) * 100}`,
    meta: `L ${lightness}%`,
    color: makeOklch(lightness, palette.chroma, palette.hue),
  }))

  const relativeDerived = [
    {
      label: copy.derivedBase,
      color: makeOklch(relative.lightness, relative.chroma, relative.hue),
    },
    {
      label: copy.derivedLight,
      color: makeOklch(
        clamp(relative.lightness + 18, 0, 100),
        relative.chroma,
        relative.hue
      ),
    },
    {
      label: copy.derivedDark,
      color: makeOklch(
        clamp(relative.lightness - 15, 0, 100),
        relative.chroma,
        relative.hue
      ),
    },
    {
      label: copy.derivedSoft,
      color: makeOklch(
        clamp(relative.lightness + 24, 0, 100),
        clamp(relative.chroma - 0.06, 0, 0.4),
        relative.hue
      ),
    },
  ]

  const dynamicPalettes = [
    {
      title: copy.currentBase,
      lightness: relative.lightness,
      chroma: relative.chroma,
      hue: relative.hue,
    },
    { title: "Purple", lightness: 55, chroma: 0.22, hue: 300 },
    { title: "Teal", lightness: 60, chroma: 0.15, hue: 200 },
    { title: "Amber", lightness: 72, chroma: 0.17, hue: 85 },
  ]

  const gradientEndHue = activeSystem?.pairedHue ?? (palette.hue + 180) % 360
  const gradientChroma = clamp(palette.chroma, 0.08, 0.2)
  const gradientHsl = `linear-gradient(90deg, ${hslString(
    palette.hue,
    100,
    gradientLightness
  )}, ${hslString(gradientEndHue, 100, gradientLightness)})`
  const gradientOklch = `linear-gradient(90deg, ${oklchString(
    gradientLightness,
    gradientChroma,
    palette.hue
  )}, ${oklchString(gradientLightness, gradientChroma, gradientEndHue)})`

  const currentSyntaxCode = oklchString(
    syntax.lightness,
    syntax.chroma,
    syntax.hue,
    syntax.alpha
  )

  const lightnessCode = [20, 40, 60, 80]
    .map(
      (value, index) =>
        `.lightness-${index + 1} { background: ${oklchString(
          value,
          syntax.chroma,
          syntax.hue,
          syntax.alpha
        )}; }`
    )
    .join("\n")

  const chromaCode = [0.4, 0.25, 0.1, 0.02]
    .map(
      (value, index) =>
        `.chroma-${index + 1} { background: ${oklchString(
          syntax.lightness,
          value,
          syntax.hue,
          syntax.alpha
        )}; }`
    )
    .join("\n")

  const uniformityCode = [
    `--shared-lightness: ${formatNumber(uniformityLightness)}%;`,
    `.hsl { background: ${hslString(60, 100, uniformityLightness)}; }`,
    `.oklch { background: ${oklchString(uniformityLightness, 0.18, 60)}; }`,
  ].join("\n")

  const paletteCode = [
    `--palette-hue: ${formatNumber(palette.hue)};`,
    `--palette-chroma: ${formatNumber(palette.chroma)};`,
    `.token-500 { background: ${oklchString(
      paletteSteps[4],
      palette.chroma,
      palette.hue
    )}; }`,
  ].join("\n")

  const relativeCode = [
    `--base: ${oklchString(relative.lightness, relative.chroma, relative.hue)};`,
    "--base-light: oklch(from var(--base) calc(l + 0.18) c h);",
    "--base-dark: oklch(from var(--base) calc(l - 0.15) c h);",
    "--base-soft: oklch(from var(--base) calc(l + 0.24) calc(c - 0.06) h);",
  ].join("\n")

  const gradientCode = [
    `.gradient-hsl { background: ${gradientHsl}; }`,
    `.gradient-oklch { background: ${gradientOklch}; }`,
  ].join("\n")

  function applyPreset(systemKey: ColorSystemKey) {
    const system =
      colorSystems.find((item) => item.key === systemKey) ?? colorSystems[0]
    const { hue, chroma } = system

    setSyntax((prev) => ({ ...prev, hue, chroma }))
    setPalette({ hue, chroma })
    setRelative((prev) => ({
      ...prev,
      hue,
      chroma: clamp(chroma - 0.01, 0.08, 0.24),
    }))
  }

  return (
    <div className="grid gap-12">
      <section id="syntax" className="grid scroll-mt-24 gap-6">
        <SectionHeading
          eyebrow="01 / Syntax"
          title={copy.syntaxTitle}
        >
          <p>{copy.syntaxBody}</p>
        </SectionHeading>

        <DemoPanel className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <RangeControl
              label="Lightness (L)"
              value={syntax.lightness}
              output={`${formatNumber(syntax.lightness)}%`}
              min={0}
              max={100}
              onChange={(lightness) =>
                setSyntax((prev) => ({ ...prev, lightness }))
              }
            />
            <RangeControl
              label="Chroma (C)"
              value={syntax.chroma}
              output={formatNumber(syntax.chroma)}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(chroma) => setSyntax((prev) => ({ ...prev, chroma }))}
            />
            <RangeControl
              label="Hue (H)"
              value={syntax.hue}
              output={formatDegrees(syntax.hue)}
              min={0}
              max={360}
              onChange={(hue) => setSyntax((prev) => ({ ...prev, hue }))}
            />
            <RangeControl
              label="Alpha"
              value={syntax.alpha}
              output={formatNumber(syntax.alpha)}
              min={0}
              max={1}
              step={0.01}
              onChange={(alpha) => setSyntax((prev) => ({ ...prev, alpha }))}
            />
          </div>
          <CodeBlock code={currentSyntaxCode} />
        </DemoPanel>

        <div className="grid gap-5 md:grid-cols-2">
          <DemoPanel className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Lightness
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {syntaxLightnessSwatches.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
            <CodeToggle code={lightnessCode} label={copy.codeLabel}>
              {copy.lightnessNote}
            </CodeToggle>
          </DemoPanel>

          <DemoPanel className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Chroma
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {syntaxChromaSwatches.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
            <CodeToggle code={chromaCode} label={copy.codeLabel}>
              {copy.chromaNote}
            </CodeToggle>
          </DemoPanel>

          <DemoPanel className="grid gap-4 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Hue
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {syntaxHueSwatches.map((item) => (
                <Swatch key={item.label} className="min-h-[88px]" {...item} />
              ))}
            </div>
          </DemoPanel>

          <DemoPanel className="grid gap-4 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Alpha / Opacity
            </p>
            <div
              className="grid grid-cols-2 gap-3 rounded-lg border p-4 sm:grid-cols-4"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
                backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
                backgroundSize: "24px 24px",
              }}
            >
              {syntaxAlphaSwatches.map((item) => (
                <Swatch key={item.label} className="min-h-[92px]" {...item} />
              ))}
            </div>
          </DemoPanel>
        </div>
      </section>

      <section id="uniformity" className="grid scroll-mt-24 gap-6">
        <SectionHeading
          eyebrow="02 / Perceptual Uniformity"
          title={copy.uniformityTitle}
        >
          <p>{copy.uniformityBody}</p>
        </SectionHeading>

        <DemoPanel className="grid gap-5">
          <RangeControl
            label="Shared Lightness"
            value={uniformityLightness}
            output={`${formatNumber(uniformityLightness)}%`}
            min={10}
            max={90}
            onChange={setUniformityLightness}
          />
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-[72px_1fr] md:items-center">
              <strong className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                HSL
              </strong>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
                {uniformityHslSwatches.map((item) => (
                  <Swatch
                    key={`hsl-${item.label}`}
                    className="min-h-[84px] text-xs"
                    {...item}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-[72px_1fr] md:items-center">
              <strong className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                OKLCH
              </strong>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
                {uniformityOklchSwatches.map((item) => (
                  <Swatch
                    key={`oklch-${item.label}`}
                    className="min-h-[84px] text-xs"
                    {...item}
                  />
                ))}
              </div>
            </div>
          </div>
          <CodeToggle code={uniformityCode} label={copy.codeLabel}>
            {copy.uniformityNote}
          </CodeToggle>
        </DemoPanel>
      </section>

      <section id="palette" className="grid scroll-mt-24 gap-6">
        <SectionHeading
          eyebrow="03 / Color Palettes"
          title={copy.paletteTitle}
        >
          <p>{copy.paletteBody}</p>
        </SectionHeading>

        <DemoPanel className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <RangeControl
              label="Base Hue"
              value={palette.hue}
              output={formatDegrees(palette.hue)}
              min={0}
              max={360}
              onChange={(hue) => setPalette((prev) => ({ ...prev, hue }))}
            />
            <RangeControl
              label="Base Chroma"
              value={palette.chroma}
              output={formatNumber(palette.chroma)}
              min={0.08}
              max={0.26}
              step={0.01}
              onChange={(chroma) => setPalette((prev) => ({ ...prev, chroma }))}
            />
          </div>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <strong className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                HSL
              </strong>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
                {hslPalette.map((item) => (
                  <PaletteChip key={`hsl-${item.label}`} {...item} />
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <strong className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                OKLCH
              </strong>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
                {oklchPalette.map((item) => (
                  <PaletteChip key={`oklch-${item.label}`} {...item} />
                ))}
              </div>
            </div>
          </div>
          <CodeToggle code={paletteCode} label={copy.codeLabel}>
            {copy.paletteNote}
          </CodeToggle>
        </DemoPanel>
      </section>

      <section id="relative" className="grid scroll-mt-24 gap-6">
        <SectionHeading
          eyebrow="04 / Relative Colors"
          title={copy.relativeTitle}
        >
          <p>{copy.relativeBody}</p>
        </SectionHeading>

        <DemoPanel className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-3">
            <RangeControl
              label="Base Lightness"
              value={relative.lightness}
              output={`${formatNumber(relative.lightness)}%`}
              min={24}
              max={78}
              onChange={(lightness) =>
                setRelative((prev) => ({ ...prev, lightness }))
              }
            />
            <RangeControl
              label="Base Chroma"
              value={relative.chroma}
              output={formatNumber(relative.chroma)}
              min={0.08}
              max={0.24}
              step={0.01}
              onChange={(chroma) => setRelative((prev) => ({ ...prev, chroma }))}
            />
            <RangeControl
              label="Base Hue"
              value={relative.hue}
              output={formatDegrees(relative.hue)}
              min={0}
              max={360}
              onChange={(hue) => setRelative((prev) => ({ ...prev, hue }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {relativeDerived.map((item) => (
              <Swatch key={item.label} {...item} />
            ))}
          </div>

          <div className="grid gap-4">
            {dynamicPalettes.map((row) => (
              <div className="grid gap-3 md:grid-cols-[112px_1fr]" key={row.title}>
                <strong className="text-sm text-muted-foreground">
                  {row.title}
                </strong>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {[
                    { label: "+30%", offset: 30 },
                    { label: "+15%", offset: 15 },
                    { label: "Base", offset: 0 },
                    { label: "-15%", offset: -15 },
                    { label: "-30%", offset: -30 },
                  ].map((item) => (
                    <PaletteChip
                      key={`${row.title}-${item.label}`}
                      label={item.label}
                      meta={item.offset === 0 ? "base" : `L ${item.label}`}
                      color={makeOklch(
                        clamp(row.lightness + item.offset, 0, 100),
                        row.chroma,
                        row.hue
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <CodeToggle code={relativeCode} label={copy.codeLabel}>
            {copy.relativeNote}
          </CodeToggle>
        </DemoPanel>
      </section>

      <section id="gradients" className="grid scroll-mt-24 gap-6">
        <SectionHeading
          eyebrow="05 / Gradient Quality"
          title={copy.gradientTitle}
        >
          <p>{copy.gradientBody}</p>
        </SectionHeading>

        <DemoPanel className="grid gap-5">
          <div className="flex flex-wrap gap-2">
            <ColorSystemButton
              active={preset === "blue"}
              icon={Droplets}
              onClick={() => applyPreset("blue")}
            >
              {copy.blueSystem}
            </ColorSystemButton>
            <ColorSystemButton
              active={preset === "green"}
              icon={Leaf}
              onClick={() => applyPreset("green")}
            >
              {copy.greenSystem}
            </ColorSystemButton>
            <ColorSystemButton
              active={preset === "rose"}
              icon={Flower2}
              onClick={() => applyPreset("rose")}
            >
              {copy.roseSystem}
            </ColorSystemButton>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Swatch
              label={copy.gradientBase}
              className="min-h-[72px]"
              color={makeOklch(gradientLightness, gradientChroma, palette.hue)}
            />
            <Swatch
              label={copy.gradientPair}
              className="min-h-[72px]"
              color={makeOklch(
                gradientLightness,
                gradientChroma,
                gradientEndHue
              )}
            />
          </div>

          <RangeControl
            label="Shared Lightness"
            value={gradientLightness}
            output={`${formatNumber(gradientLightness)}%`}
            min={45}
            max={84}
            onChange={setGradientLightness}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-3 rounded-lg border bg-background/60 p-4">
              <h3 className="flex items-center gap-2 text-base font-bold">
                <Waves className="h-4 w-4" />
                HSL Gradient
              </h3>
              <div
                className="h-28 rounded-md border"
                style={{ background: gradientHsl }}
              />
              <p className="text-sm leading-6 text-muted-foreground">
                {copy.hslGradientBody}
              </p>
            </div>
            <div className="grid gap-3 rounded-lg border bg-background/60 p-4">
              <h3 className="flex items-center gap-2 text-base font-bold">
                <Waves className="h-4 w-4" />
                OKLCH Gradient
              </h3>
              <div
                className="h-28 rounded-md border"
                style={{ background: gradientOklch }}
              />
              <p className="text-sm leading-6 text-muted-foreground">
                {copy.oklchGradientBody}
              </p>
            </div>
          </div>

          <CodeToggle code={gradientCode} label={copy.codeLabel}>
            {copy.gradientNote}
          </CodeToggle>
        </DemoPanel>
      </section>
    </div>
  )
}
