import { NextRequest, NextResponse } from "next/server"

import { getResumeCaseStudy } from "@/lib/notion"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const resume = await getResumeCaseStudy()
  const pdf = resume?.attachments?.find((attachment) =>
    attachment.name.toLowerCase().endsWith(".pdf")
  )

  if (!pdf) {
    return NextResponse.json(
      { error: "Resume PDF was not found." },
      { status: 404 }
    )
  }

  const pdfUrl = pdf.url.startsWith("/")
    ? new URL(pdf.url, request.nextUrl.origin).toString()
    : pdf.url
  const response = await fetch(pdfUrl)

  if (!response.ok) {
    return NextResponse.json(
      { error: "Resume PDF could not be loaded." },
      { status: 502 }
    )
  }

  const fileName = encodeURIComponent(pdf.name || "cherie-wang-resume.pdf")

  return new NextResponse(response.body, {
    headers: {
      "Cache-Control": "private, max-age=300",
      "Content-Disposition": `attachment; filename*=UTF-8''${fileName}`,
      "Content-Type": "application/pdf",
    },
  })
}
