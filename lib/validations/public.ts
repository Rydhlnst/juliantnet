import { z } from "zod"

const locationFields = {
  address: z.string().trim().min(6, "Masukkan alamat pemasangan yang lebih lengkap.").max(255),
  province: z.string().trim().min(2, "Masukkan provinsi.").max(120),
  city: z.string().trim().min(2, "Masukkan kota atau kabupaten.").max(120),
  district: z.string().trim().min(2, "Masukkan kecamatan.").max(120),
  postalCode: z.string().trim().regex(/^\d{5}$/, "Masukkan kode pos 5 digit."),
  propertyType: z.enum(["RESIDENTIAL", "BUSINESS"]),
}

export const coverageRequestSchema = z.object(locationFields)
export const leadSubmissionSchema = z.object({
  ...locationFields,
  name: z.string().trim().min(2, "Masukkan nama lengkap.").max(120),
  phone: z.string().trim().regex(/^(?:\+62|62|0)8\d{7,13}$/, "Masukkan nomor WhatsApp Indonesia yang valid."),
  email: z.string().trim().email("Masukkan email yang valid.").max(255).optional().or(z.literal("")),
  planId: z.string().uuid("Pilih paket internet terlebih dahulu."),
  coverageAreaId: z.string().uuid().nullable().optional(),
  source: z.enum(["HOMEPAGE", "COVERAGE_CHECKER", "PLAN_SELECTION", "REGISTRATION", "WHATSAPP", "CONTACT_FORM"]),
  notes: z.string().trim().max(2000).optional(),
  privacyAccepted: z.literal(true, { error: "Setujui kebijakan privasi untuk melanjutkan." }),
})
