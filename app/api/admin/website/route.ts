import { NextResponse } from "next/server"
import { isDatabaseConfigured } from "@/db"
import { requireAdmin } from "@/lib/auth"
import { getHomeContent } from "@/lib/services/home-content"

export async function GET() {
  if (!isDatabaseConfigured) return NextResponse.json({ error: "Database is not configured." }, { status: 503 })

  try {
    await requireAdmin(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  } catch {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  try {
    return NextResponse.json({ sections: await getHomeContent() })
  } catch {
    return NextResponse.json({ error: "Unable to load homepage content." }, { status: 500 })
  }
}
