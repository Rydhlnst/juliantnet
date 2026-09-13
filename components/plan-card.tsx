import Link from "next/link"
import { Check, ChevronRight, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { PublicPlan, PublicSettings } from "@/lib/contracts"
import { formatIdr } from "@/lib/plans"
import { generateWhatsAppUrl, packageWhatsAppMessage } from "@/lib/whatsapp"

export function PlanCard({ plan, settings }: { plan: PublicPlan; settings: PublicSettings }) {
  const displayedPrice = plan.isPromoActive && plan.promoPrice ? plan.promoPrice : plan.price
  return <Card className={`relative h-full gap-5 border bg-card py-6 shadow-none ${plan.isPopular ? "border-primary/70 ring-1 ring-primary/20" : "border-border/75"}`}>
    {plan.isPopular && <Badge className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-1 text-accent-foreground">Paling Populer</Badge>}
    <CardHeader className="gap-3 px-6"><p className="text-sm font-bold tracking-[.16em] text-primary uppercase">{plan.name}</p><CardTitle className="text-4xl font-black tracking-tight">{plan.speedMbps} Mbps</CardTitle><p className="text-muted-foreground">{plan.deviceMax ? `${plan.deviceMin}–${plan.deviceMax} perangkat` : `${plan.deviceMin}+ perangkat`}</p></CardHeader>
    <CardContent className="space-y-5 px-6"><div>{plan.isPromoActive && plan.promoLabel && <p className="mb-1 text-sm font-bold text-primary">{plan.promoLabel}</p>}<span className="text-2xl font-black">{displayedPrice > 0 ? formatIdr(displayedPrice) : "Harga di CMS"}</span><span className="ml-1 text-sm text-muted-foreground">/bulan</span>{plan.isPromoActive && <p className="mt-1 text-sm text-muted-foreground line-through">{formatIdr(plan.price)}</p>}</div><p className="min-h-10 text-sm leading-6 text-muted-foreground">{plan.description}</p><ul className="space-y-2.5 text-sm">{plan.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{benefit}</li>)}</ul></CardContent>
    <CardFooter className="mt-auto flex-col gap-3 px-6 pt-0"><Link className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground" href={`/daftar?plan=${plan.id}`}>Pilih paket <ChevronRight className="size-4" /></Link><a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href={generateWhatsAppUrl(settings.whatsappNumber, packageWhatsAppMessage(settings.brandName, plan.name, plan.speedMbps))} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Tanya via WhatsApp</a></CardFooter>
  </Card>
}
