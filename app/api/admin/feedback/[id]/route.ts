import { type NextRequest, NextResponse } from "next/server"
import { feedbacks } from "../../../../../lib/data-store"

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  const token = authHeader.substring(7)
  return token.startsWith("admin-token-")
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params
  const initialLength = feedbacks.length
  const index = feedbacks.findIndex((f) => f.id === id)

  if (index > -1) {
    feedbacks.splice(index, 1)
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: "Feedback not found" }, { status: 404 })
  }
}
