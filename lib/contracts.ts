import type { coverageStatuses, leadStatuses, leadSources, userRoles } from "@/db/schema"

export type CoverageStatus = (typeof coverageStatuses)[number]
export type LeadStatus = (typeof leadStatuses)[number]
export type LeadSource = (typeof leadSources)[number]
export type UserRole = (typeof userRoles)[number]

export type PublicPlan = { id: string; name: string; slug: string; speedMbps: number; price: number; promoPrice: number | null; promoLabel: string | null; description: string; deviceMin: number; deviceMax: number | null; benefits: string[]; isPopular: boolean; isPromoActive: boolean }
export type PublicFaq = { id: string; question: string; answer: string }
export type PublicSettings = { brandName: string; companyName: string; whatsappNumber: string; phone: string | null; email: string | null; businessAddress: string | null; defaultSeoTitle: string; defaultSeoDescription: string; footerCopy: string | null }
