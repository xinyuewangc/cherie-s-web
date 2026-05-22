import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"

type StaticMdxPageProps = {
  slug: "privacy" | "terms"
}

export function StaticMdxPage({ slug }: StaticMdxPageProps) {
  const page = allPages.find((item) => item.slugAsParams === slug)

  if (!page) {
    notFound()
  }

  return (
    <main className="container max-w-3xl py-16 md:py-24">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Legal
      </p>
      <h1 className="mt-5 font-heading text-5xl tracking-tight">
        {page.title}
      </h1>
      {page.description ? (
        <p className="mt-5 text-lg leading-7 text-muted-foreground">
          {page.description}
        </p>
      ) : null}
      <article className="mt-12 rounded-2xl border bg-card/70 p-6 md:p-8">
        <Mdx code={page.body.code} />
      </article>
    </main>
  )
}
