import { getPortfolioProjects } from "@/lib/notion"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const projects = await getPortfolioProjects()

  return <PortfolioShell projects={projects}>{children}</PortfolioShell>
}
