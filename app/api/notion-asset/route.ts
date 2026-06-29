import { NextRequest, NextResponse } from "next/server"

import {
  getFreshNotionBlockFileUrl,
  getFreshNotionPageCoverUrl,
} from "@/lib/notion"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function isSafeNotionAssetUrl(url: string) {
  try {
    const parsed = new URL(url)

    return (
      parsed.protocol === "https:" &&
      (parsed.hostname === "prod-files-secure.s3.us-west-2.amazonaws.com" ||
        parsed.hostname.endsWith(".amazonaws.com") ||
        parsed.hostname.endsWith(".notion.so"))
    )
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const pageId = searchParams.get("pageId")
  const blockId = searchParams.get("blockId")
  const kind = searchParams.get("kind")

  const assetUrl =
    blockId && !pageId
      ? await getFreshNotionBlockFileUrl(blockId)
      : pageId && kind === "cover"
        ? await getFreshNotionPageCoverUrl(pageId)
        : null

  if (!assetUrl || !isSafeNotionAssetUrl(assetUrl)) {
    return NextResponse.json(
      { error: "Notion asset was not found." },
      { status: 404 }
    )
  }

  const response = await fetch(assetUrl)

  if (!response.ok) {
    return NextResponse.json(
      { error: "Notion asset could not be loaded." },
      { status: 502 }
    )
  }

  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream"
  const body = Buffer.from(await response.arrayBuffer())

  if (contentType.startsWith("image/") && contentType !== "image/gif") {
    try {
      const { default: sharp } = await import("sharp")
      const optimized = await sharp(body)
        .rotate()
        .resize({
          width: 1800,
          height: 1800,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 86 })
        .toBuffer()

      return new NextResponse(optimized, {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
          "Content-Length": optimized.byteLength.toString(),
          "Content-Type": "image/webp",
        },
      })
    } catch (error) {
      console.warn("Notion asset optimization failed; serving original asset.")
    }
  }

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      "Content-Length": body.byteLength.toString(),
      "Content-Type": contentType,
    },
  })
}
