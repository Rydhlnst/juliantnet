import { eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/db"
import { coverageAreas, coverageChecks } from "@/db/schema"
import { coverageStatusCopy, normalizeLocation } from "@/lib/coverage"
import type { CoverageStatus } from "@/lib/contracts"
import type { coverageRequestSchema } from "@/lib/validations/public"

export async function checkCoverage(input: typeof coverageRequestSchema._output) {
  if (!isDatabaseConfigured) return { status: "UNAVAILABLE" as CoverageStatus, message: "Database belum dikonfigurasi. Gunakan data seed setelah DATABASE_URL tersedia.", coverageAreaId: null }
  const candidates = await db.select().from(coverageAreas).where(eq(coverageAreas.postalCode, input.postalCode))
  const match = candidates.find((area) => normalizeLocation(area.province) === normalizeLocation(input.province) && normalizeLocation(area.city) === normalizeLocation(input.city) && normalizeLocation(area.district) === normalizeLocation(input.district))
  const status = match?.status ?? "UNAVAILABLE"
  await db.insert(coverageChecks).values({ id: crypto.randomUUID(), address: input.address, province: input.province, city: input.city, district: input.district, postalCode: input.postalCode, propertyType: input.propertyType, resultStatus: status, coverageAreaId: match?.id })
  return { status, message: coverageStatusCopy[status], coverageAreaId: match?.id ?? null }
}
