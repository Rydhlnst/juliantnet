import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/db"
import { siteSettings } from "@/db/schema"
import { requireAdmin } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"
import { settingsSchema } from "@/lib/validations/admin"
export async function GET() { try { await requireAdmin(); const [settings] = isDatabaseConfigured ? await db.select().from(siteSettings).limit(1) : []; return NextResponse.json({ settings: settings ?? null }) } catch { return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 }) } }
export async function PUT(request: Request) { try { const user = await requireAdmin(["SUPER_ADMIN", "ADMIN"]); if (!isDatabaseConfigured) return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 }); const parsed = settingsSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Data tidak valid." }, { status: 400 }); const [current] = await db.select({ id: siteSettings.id }).from(siteSettings).limit(1); if (current) await db.update(siteSettings).set(parsed.data).where(eq(siteSettings.id, current.id)); else await db.insert(siteSettings).values({ id: crypto.randomUUID(), ...parsed.data }); await writeAuditLog(user.id, "settings_updated", "site_settings", current?.id); return NextResponse.json({ ok: true }) } catch { return NextResponse.json({ error: "Aksi tidak diizinkan." }, { status: 401 }) } }
