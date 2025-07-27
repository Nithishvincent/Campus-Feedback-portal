import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Simple authentication (replace with proper auth in production)
    if (username === "admin" && password === "admin123") {
      const token = "admin-token-" + Date.now()
      return NextResponse.json({ success: true, token })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
