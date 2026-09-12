import { NextResponse } from "next/server"
import { z } from "zod"

const coverageRequestSchema = z.object({
  address: z.string().trim().min(3, "Masukkan alamat, kecamatan, atau kode pos yang lebih lengkap.").max(160),
  propertyType: z.enum(["Rumah", "Bisnis"]),
})

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const input = coverageRequestSchema.safeParse(body)
    if (!input.success) return NextResponse.json({ error: input.error.issues[0]?.message ?? "Data tidak valid." }, { status: 400 })

    // Replace this deterministic MVP result with the coverage provider integration.
    const unavailable = /belum|luar area|tidak tersedia/i.test(input.data.address)
    return NextResponse.json({
      available: !unavailable,
      message: unavailable ? "Lokasi ini belum masuk jangkauan Internet Cepat. Tinggalkan kontak agar kami dapat memberi kabar saat jaringan tersedia." : `Internet Cepat tersedia untuk ${input.data.propertyType.toLowerCase()} Anda. Lanjutkan untuk melihat paket yang paling sesuai.`,
    })
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid. Silakan coba lagi." }, { status: 400 })
  }
}