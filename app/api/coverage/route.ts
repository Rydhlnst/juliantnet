import { NextResponse } from "next/server"
import { checkCoverage } from "@/lib/services/coverage"
import { coverageRequestSchema } from "@/lib/validations/public"

export async function POST(request: Request) {
  try {
    const parsed = coverageRequestSchema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Data tidak valid." }, { status: 400 })
    return NextResponse.json(await checkCoverage(parsed.data))
  } catch (error) {
    console.error("Coverage check failed", error)
    return NextResponse.json({ error: "Kami belum bisa memeriksa lokasi ini. Silakan coba lagi." }, { status: 500 })
  }
}
