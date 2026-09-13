import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/db"
import { mediaAssets } from "@/db/schema"
import { requireAdmin } from "@/lib/auth"
import { deleteObject } from "@/lib/r2"
import { writeAuditLog } from "@/lib/audit"
export async function GET() { try { await requireAdmin(); const items = isDatabaseConfigured ? await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt)) : []; return NextResponse.json({ items }) } catch { return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 }) } }
export async function DELETE(request: Request) { try { const user = await requireAdmin(["SUPER_ADMIN", "ADMIN", "EDITOR"]); const id = new URL(request.url).searchParams.get("id"); if (!id) return NextResponse.json({ error: "ID media diperlukan." }, { status: 400 }); const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1); if (!asset) return NextResponse.json({ error: "Media tidak ditemukan." }, { status: 404 }); await deleteObject(asset.key); await db.delete(mediaAssets).where(eq(mediaAssets.id, id)); await writeAuditLog(user.id, "media_deleted", "media", id); return NextResponse.json({ ok: true }) } catch { return NextResponse.json({ error: "Media tidak dapat dihapus." }, { status: 400 }) } }
