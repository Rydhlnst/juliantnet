import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/db"
import { pageSections } from "@/db/schema"
import { requireAdmin } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"
import { isHomeSectionKey, getOrCreateHomePage } from "@/lib/services/home-content"
import { homeSectionUpdateSchemaFor } from "@/lib/validations/admin"
import { mergeHomeSectionContent } from "@/lib/home-content"

type RouteContext = { params: Promise<{ sectionKey: string }> }

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!isDatabaseConfigured) return NextResponse.json({ error: "Database is not configured." }, { status: 503 })

  let user: Awaited<ReturnType<typeof requireAdmin>>
  try {
    user = await requireAdmin(["SUPER_ADMIN", "ADMIN", "EDITOR"])
  } catch {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  const { sectionKey } = await params
  if (!isHomeSectionKey(sectionKey)) return NextResponse.json({ error: "Homepage section not found." }, { status: 404 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = homeSectionUpdateSchemaFor(sectionKey).safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid homepage section content.", details: parsed.error.flatten().fieldErrors }, { status: 400 })

  try {
    const page = await getOrCreateHomePage()
    const [section] = await db.select().from(pageSections).where(and(eq(pageSections.pageId, page.id), eq(pageSections.sectionKey, sectionKey))).limit(1)
    if (!section) return NextResponse.json({ error: "Homepage section not found." }, { status: 404 })

    const content = mergeHomeSectionContent(sectionKey, { ...section.content, ...parsed.data.content })
    await db.update(pageSections).set({ content, isVisible: parsed.data.isVisible, updatedAt: new Date() }).where(eq(pageSections.id, section.id))
    await writeAuditLog(user.id, "homepage_section_updated", "page_section", section.id, { sectionKey })

    return NextResponse.json({ section: { id: section.id, key: sectionKey, content, isVisible: parsed.data.isVisible } })
  } catch {
    return NextResponse.json({ error: "Unable to save homepage section." }, { status: 500 })
  }
}
