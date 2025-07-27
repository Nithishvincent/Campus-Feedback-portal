import { type NextRequest, NextResponse } from "next/server"
import { addSampleData } from "../../../../lib/data-store"

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  const token = authHeader.substring(7)
  return token.startsWith("admin-token-")
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  addSampleData()
  return NextResponse.json({ success: true })
}
