import { Metadata } from "next"

import { StaticMdxPage } from "@/components/portfolio/mdx-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Cherie's portfolio website.",
}

export default function PrivacyPage() {
  return <StaticMdxPage slug="privacy" />
}
