import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/db"
import { leads } from "@/db/schema"
import { requireAdmin } from "@/lib/auth"
import { writeAuditLog } from "@/lib/audit"
import { leadStatusSchema } from "@/lib/validations/admin"
export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/leads/[id]">) { try { const user = await requireAdmin(["SUPER_ADMIN", "ADMIN", "EDITOR", "SALES"]); if (!isDatabaseConfigured) return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 }); const parsed = leadStatusSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Data tidak valid." }, { status: 400 }); const { id } = await params; await db.update(leads).set(parsed.data).where(eq(leads.id, id)); await writeAuditLog(user.id, "lead_status_updated", "lead", id); return NextResponse.json({ ok: true }) } catch { return NextResponse.json({ error: "Aksi tidak diizinkan." }, { status: 401 }) } }
