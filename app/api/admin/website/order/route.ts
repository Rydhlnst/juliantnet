import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/db"
import { pageSections } from "@/db/schema"
import { requireAdmin } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"
import { getOrCreateHomePage } from "@/lib/services/home-content"
import { homeSectionOrderSchema } from "@/lib/validations/admin"

export async function PUT(request: Request) {
  if (!isDatabaseConfigured) return NextResponse.json({ error: "Database is not configured." }, { status: 503 })

  let user: Awaited<ReturnType<typeof requireAdmin>>
  try {
    user = await requireAdmin(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  } catch {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = homeSectionOrderSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid homepage section order.", details: parsed.error.flatten().fieldErrors }, { status: 400 })

  try {
    const page = await getOrCreateHomePage()
    await db.transaction(async (tx) => {
      for (const [sortOrder, key] of parsed.data.sections.entries()) {
        await tx.update(pageSections).set({ sortOrder, updatedAt: new Date() }).where(and(eq(pageSections.pageId, page.id), eq(pageSections.sectionKey, key)))
      }
    })
    await writeAuditLog(user.id, "homepage_sections_reordered", "page", page.id, { sections: parsed.data.sections })

    return NextResponse.json({ sections: parsed.data.sections })
  } catch {
    return NextResponse.json({ error: "Unable to reorder homepage sections." }, { status: 500 })
  }
}
