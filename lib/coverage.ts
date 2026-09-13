import type { CoverageStatus } from "@/lib/contracts"

export const coverageStatusCopy: Record<CoverageStatus, string> = {
  AVAILABLE: "Jaringan tersedia di area ini. Tim kami akan mengonfirmasi kelayakan teknis sebelum pemasangan.",
  COMING_SOON: "Jaringan sedang dipersiapkan untuk area ini. Daftarkan minat Anda agar tim kami dapat memberi kabar.",
  UNAVAILABLE: "Area ini belum tercakup jaringan kami. Hubungi tim kami untuk mendapatkan informasi area layanan terbaru.",
}

export function normalizeLocation(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("id-ID")
}
