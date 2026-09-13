import { and, asc, desc, eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/db"
import { faqs, internetPlans, siteSettings } from "@/db/schema"
import type { PublicFaq, PublicPlan, PublicSettings } from "@/lib/contracts"

const fallbackSettings: PublicSettings = { brandName: "Internet Cepat", companyName: "Internet Cepat", whatsappNumber: "6280000000000", phone: null, email: null, businessAddress: null, defaultSeoTitle: "Internet Cepat | WiFi Cepat & Stabil", defaultSeoDescription: "DEVELOPMENT PLACEHOLDER — Internet WiFi cepat dan stabil untuk rumah dan bisnis.", footerCopy: "DEVELOPMENT PLACEHOLDER — Ganti informasi bisnis ini melalui CMS sebelum dipublikasikan." }
const fallbackPlans: PublicPlan[] = [
  { id: "dev-hemat", name: "Hemat", slug: "hemat", speedMbps: 50, price: 0, promoPrice: null, promoLabel: null, description: "DEVELOPMENT PLACEHOLDER untuk browsing, belajar, dan streaming HD.", deviceMin: 1, deviceMax: 3, benefits: ["Internet unlimited", "Dukungan lokal"], isPopular: false, isPromoActive: false },
  { id: "dev-keluarga", name: "Keluarga", slug: "keluarga", speedMbps: 100, price: 0, promoPrice: null, promoLabel: null, description: "DEVELOPMENT PLACEHOLDER untuk streaming, kerja, dan perangkat keluarga.", deviceMin: 3, deviceMax: 6, benefits: ["Internet unlimited", "Instalasi terjadwal"], isPopular: true, isPromoActive: false },
]
const fallbackFaqs: PublicFaq[] = [{ id: "dev-coverage", question: "Bagaimana cara cek coverage?", answer: "Masukkan alamat lengkap untuk mendapatkan hasil awal. DEVELOPMENT PLACEHOLDER." }]

function mapPlan(plan: typeof internetPlans.$inferSelect): PublicPlan {
  const now = new Date()
  return { id: plan.id, name: plan.name, slug: plan.slug, speedMbps: plan.speedMbps, price: Number(plan.price), promoPrice: plan.promoPrice ? Number(plan.promoPrice) : null, promoLabel: plan.promoLabel, description: plan.description, deviceMin: plan.deviceMin, deviceMax: plan.deviceMax, benefits: plan.benefits, isPopular: plan.isPopular, isPromoActive: Boolean(plan.promoPrice && plan.promoLabel && (!plan.promoStartAt || plan.promoStartAt <= now) && (!plan.promoEndAt || plan.promoEndAt >= now)) }
}

export async function getPublicSettings(): Promise<PublicSettings> {
  if (!isDatabaseConfigured) return fallbackSettings
  const row = await db.select().from(siteSettings).limit(1)
  if (!row[0]) return fallbackSettings
  return { brandName: row[0].brandName, companyName: row[0].companyName, whatsappNumber: row[0].whatsappNumber, phone: row[0].phone, email: row[0].email, businessAddress: row[0].businessAddress, defaultSeoTitle: row[0].defaultSeoTitle, defaultSeoDescription: row[0].defaultSeoDescription, footerCopy: row[0].footerCopy }
}

export async function getPublicPlans(): Promise<PublicPlan[]> {
  if (!isDatabaseConfigured) return fallbackPlans
  const rows = await db.select().from(internetPlans).where(and(eq(internetPlans.isActive, true), eq(internetPlans.isArchived, false))).orderBy(asc(internetPlans.sortOrder), asc(internetPlans.speedMbps))
  return rows.map(mapPlan)
}

export async function getPublicPlan(idOrSlug: string) {
  const plans = await getPublicPlans()
  return plans.find((plan) => plan.id === idOrSlug || plan.slug === idOrSlug) ?? null
}

export async function getPublicFaqs(): Promise<PublicFaq[]> {
  if (!isDatabaseConfigured) return fallbackFaqs
  return db.select({ id: faqs.id, question: faqs.question, answer: faqs.answer }).from(faqs).where(eq(faqs.isPublished, true)).orderBy(asc(faqs.sortOrder), desc(faqs.createdAt))
}
