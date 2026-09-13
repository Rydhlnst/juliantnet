import { asc, eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/db"
import { pageSections, pages } from "@/db/schema"
import {
  HOME_SECTION_DEFAULTS,
  HOME_SECTION_LABELS,
  HOME_SECTION_ORDER,
  mergeHomeSectionContent,
  type HomeSection,
  type HomeSectionKey,
} from "@/lib/home-content"

type PersistedHomeSection = Pick<typeof pageSections.$inferSelect, "id" | "sectionKey" | "content" | "sortOrder" | "isVisible">

export function isHomeSectionKey(value: string): value is HomeSectionKey {
  return (HOME_SECTION_ORDER as readonly string[]).includes(value)
}

export function buildHomeSections(rows: PersistedHomeSection[]): HomeSection[] {
  const byKey = new Map(rows.map((row) => [row.sectionKey, row]))

  return HOME_SECTION_ORDER.map((key, index) => {
    const row = byKey.get(key)
    return {
      id: row?.id ?? `default-${key}`,
      key,
      label: HOME_SECTION_LABELS[key],
      content: mergeHomeSectionContent(key, row?.content),
      sortOrder: row?.sortOrder ?? index,
      isVisible: row?.isVisible ?? true,
    }
  }).sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getOrCreateHomePage() {
  if (!isDatabaseConfigured) throw new Error("DATABASE_NOT_CONFIGURED")

  await db.insert(pages).values({ id: crypto.randomUUID(), slug: "home", title: "Homepage", status: "PUBLISHED" }).onConflictDoNothing({ target: pages.slug })
  const [page] = await db.select().from(pages).where(eq(pages.slug, "home")).limit(1)
  if (!page) throw new Error("HOME_PAGE_NOT_FOUND")

  for (const [sortOrder, key] of HOME_SECTION_ORDER.entries()) {
    await db.insert(pageSections).values({
      id: crypto.randomUUID(),
      pageId: page.id,
      sectionKey: key,
      sectionType: key,
      content: HOME_SECTION_DEFAULTS[key],
      sortOrder,
      isVisible: true,
    }).onConflictDoNothing({ target: [pageSections.pageId, pageSections.sectionKey] })
  }

  return page
}

export async function getHomeContent(): Promise<HomeSection[]> {
  if (!isDatabaseConfigured) return buildHomeSections([])

  try {
    const page = await getOrCreateHomePage()
    const rows = await db.select({ id: pageSections.id, sectionKey: pageSections.sectionKey, content: pageSections.content, sortOrder: pageSections.sortOrder, isVisible: pageSections.isVisible }).from(pageSections).where(eq(pageSections.pageId, page.id)).orderBy(asc(pageSections.sortOrder))
    return buildHomeSections(rows)
  } catch {
    return buildHomeSections([])
  }
}
