import { type NextRequest, NextResponse } from "next/server"
import { feedbacks } from "../../../lib/data-store"

export async function POST(request: NextRequest) {
  try {
    const feedback = await request.json()

    // Add the feedback to our shared storage
    feedbacks.push(feedback)

    return NextResponse.json({ success: true, id: feedback.id })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(feedbacks)
}
