import { Metadata } from "next"

import { StaticMdxPage } from "@/components/portfolio/mdx-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Cherie's portfolio website.",
}

export default function TermsPage() {
  return <StaticMdxPage slug="terms" />
}
