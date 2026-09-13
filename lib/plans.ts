import type { PublicPlan } from "@/lib/contracts"

export function isPromotionActive(plan: Pick<PublicPlan, "promoPrice" | "promoLabel" | "isPromoActive">, now = new Date()) {
  return Boolean(plan.promoPrice && plan.promoLabel && plan.isPromoActive && now)
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value)
}
