import { eq } from "drizzle-orm"
import { hashPassword } from "better-auth/crypto"
import { db } from "@/db"
import { accounts, coverageAreas, faqs, internetPlans, siteSettings, users } from "@/db/schema"

const plans = [
  { id: "4e7a70c8-1d5d-4ed3-8e27-000000000001", name: "Hemat", slug: "hemat", speedMbps: 50, price: "0", description: "DEVELOPMENT PLACEHOLDER — browsing, belajar online, dan streaming HD.", deviceMin: 1, deviceMax: 3, benefits: ["Internet unlimited", "Dukungan lokal"], isPopular: false, isActive: true, isArchived: false, sortOrder: 1 },
  { id: "4e7a70c8-1d5d-4ed3-8e27-000000000002", name: "Keluarga", slug: "keluarga", speedMbps: 100, price: "0", description: "DEVELOPMENT PLACEHOLDER — streaming, WFH, dan perangkat keluarga.", deviceMin: 3, deviceMax: 6, benefits: ["Internet unlimited", "Instalasi terjadwal"], isPopular: true, isActive: true, isArchived: false, sortOrder: 2 },
  { id: "4e7a70c8-1d5d-4ed3-8e27-000000000003", name: "Gamer", slug: "gamer", speedMbps: 200, price: "0", description: "DEVELOPMENT PLACEHOLDER — gaming dan penggunaan multi-perangkat.", deviceMin: 5, deviceMax: 10, benefits: ["Internet unlimited", "Konsultasi kebutuhan"], isPopular: false, isActive: true, isArchived: false, sortOrder: 3 },
]

async function seed() {
  for (const plan of plans) { const [existing] = await db.select({ id: internetPlans.id }).from(internetPlans).where(eq(internetPlans.slug, plan.slug)).limit(1); if (!existing) await db.insert(internetPlans).values(plan) }
  const [settings] = await db.select({ id: siteSettings.id }).from(siteSettings).limit(1)
  if (!settings) await db.insert(siteSettings).values({ id: crypto.randomUUID(), companyName: "Internet Cepat — DEVELOPMENT PLACEHOLDER", brandName: "Internet Cepat", whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6280000000000", defaultSeoTitle: "Internet Cepat | WiFi Cepat & Stabil", defaultSeoDescription: "DEVELOPMENT PLACEHOLDER — Internet WiFi cepat dan stabil untuk rumah dan bisnis.", footerCopy: "DEVELOPMENT PLACEHOLDER — Ganti informasi ini di CMS sebelum publikasi." })
  const [area] = await db.select({ id: coverageAreas.id }).from(coverageAreas).where(eq(coverageAreas.postalCode, "40287")).limit(1)
  if (!area) await db.insert(coverageAreas).values({ id: crypto.randomUUID(), province: "Jawa Barat", city: "Bandung", district: "Bojongsoang", postalCode: "40287", status: "COMING_SOON", notes: "DEVELOPMENT PLACEHOLDER — bukan informasi coverage produksi." })
  const [faq] = await db.select({ id: faqs.id }).from(faqs).where(eq(faqs.question, "Bagaimana cara cek coverage?")).limit(1)
  if (!faq) await db.insert(faqs).values({ id: crypto.randomUUID(), question: "Bagaimana cara cek coverage?", answer: "Masukkan alamat dan lokasi lengkap untuk mendapatkan hasil awal. DEVELOPMENT PLACEHOLDER.", sortOrder: 1, isPublished: true })
  const email = process.env.SEED_ADMIN_EMAIL; const password = process.env.SEED_ADMIN_PASSWORD; const name = process.env.SEED_ADMIN_NAME ?? "Admin"
  if (email && password) { const [existingAdmin] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1); if (!existingAdmin) { const id = crypto.randomUUID(); await db.insert(users).values({ id, name, email, emailVerified: true, role: "SUPER_ADMIN" }); await db.insert(accounts).values({ id: crypto.randomUUID(), accountId: id, providerId: "credential", userId: id, password: await hashPassword(password) }); } }
  console.log("Seed complete. All seeded commercial and coverage values are DEVELOPMENT PLACEHOLDER data.")
}
seed().catch((error) => { console.error(error); process.exit(1) })
