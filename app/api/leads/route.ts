import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db, isDatabaseConfigured } from "@/db"
import { coverageAreas, internetPlans, leads } from "@/db/schema"
import { getPublicSettings } from "@/lib/services/public"
import { generateWhatsAppUrl, packageWhatsAppMessage } from "@/lib/whatsapp"
import { leadSubmissionSchema } from "@/lib/validations/public"

export async function POST(request: Request) {
  try {
    const parsed = leadSubmissionSchema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Data tidak valid." }, { status: 400 })
    if (!isDatabaseConfigured) return NextResponse.json({ error: "Pendaftaran belum dikonfigurasi. Tambahkan DATABASE_URL lalu jalankan migrasi." }, { status: 503 })
    const input = parsed.data
    const [plan] = await db.select().from(internetPlans).where(and(eq(internetPlans.id, input.planId), eq(internetPlans.isActive, true), eq(internetPlans.isArchived, false))).limit(1)
    if (!plan) return NextResponse.json({ error: "Paket yang dipilih tidak tersedia. Pilih paket lain." }, { status: 400 })
    const coverage = input.coverageAreaId ? await db.select({ id: coverageAreas.id }).from(coverageAreas).where(eq(coverageAreas.id, input.coverageAreaId)).limit(1) : []
    const leadId = crypto.randomUUID()
    await db.insert(leads).values({ id: leadId, name: input.name, phone: input.phone, email: input.email || null, address: input.address, province: input.province, city: input.city, district: input.district, postalCode: input.postalCode, propertyType: input.propertyType, planId: plan.id, coverageAreaId: coverage[0]?.id ?? null, source: input.source, notes: input.notes || null })
    const settings = await getPublicSettings()
    return NextResponse.json({ id: leadId, message: "Permintaan pemasangan berhasil dikirim.", whatsappUrl: generateWhatsAppUrl(settings.whatsappNumber, packageWhatsAppMessage(settings.brandName, plan.name, plan.speedMbps)) }, { status: 201 })
  } catch (error) {
    console.error("Lead creation failed", error)
    return NextResponse.json({ error: "Permintaan belum dapat disimpan. Silakan coba lagi atau hubungi WhatsApp kami." }, { status: 500 })
  }
}
