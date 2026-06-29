import { readFile } from "fs/promises"
import path from "path"

import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const resumeFileName = "王馨悦 个人简历17766476119.pdf"
const resumePath = path.join(process.cwd(), "public", "resume", resumeFileName)

export async function GET() {
  try {
    const file = await readFile(resumePath)
    const fileName = encodeURIComponent(resumeFileName)

    return new NextResponse(file, {
      headers: {
        "Cache-Control": "private, max-age=300",
        "Content-Disposition": `inline; filename*=UTF-8''${fileName}`,
        "Content-Length": String(file.byteLength),
        "Content-Type": "application/pdf",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Resume PDF was not found." },
      { status: 404 }
    )
  }
}
