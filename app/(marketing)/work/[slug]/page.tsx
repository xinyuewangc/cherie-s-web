import { redirect } from "next/navigation"

type WorkDetailRedirectPageProps = {
  params: {
    slug: string
  }
}

export default function WorkDetailRedirectPage({
  params,
}: WorkDetailRedirectPageProps) {
  redirect(`/projects/${params.slug}`)
}
