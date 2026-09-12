import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"

import type { Plan } from "@/data/plans"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { whatsappUrl } from "@/lib/site"

export function PlanCard({ plan }: { plan: Plan }) {
  const message = `Halo Internet Cepat, saya tertarik dengan paket ${plan.name}. Bisa dibantu cek coverage di lokasi saya?`
  return (
    <Card className={cn("relative h-full gap-5 overflow-visible border border-border/75 bg-white py-6 shadow-none", plan.popular && "border-primary/70 ring-1 ring-primary/20")}> 
      {plan.popular && <Badge className="absolute -top-3 left-5 z-10 rounded-full bg-accent px-3 py-1 text-accent-foreground shadow-sm">Paling Populer</Badge>}
      <CardHeader className="gap-3 px-6">
        <p className="text-sm font-bold tracking-[0.16em] text-primary uppercase">{plan.name}</p>
        <CardTitle className="text-4xl font-black tracking-tight text-foreground">{plan.speed}</CardTitle>
        <p className="text-muted-foreground">{plan.devices}</p>
      </CardHeader>
      <CardContent className="space-y-5 px-6">
        <div><span className="text-2xl font-black text-foreground">{plan.price}</span><span className="ml-1 text-sm text-muted-foreground">/bulan</span></div>
        <p className="min-h-10 text-sm leading-6 text-muted-foreground">{plan.description}</p>
        <ul className="space-y-2.5 text-sm text-foreground">{plan.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{benefit}</li>)}</ul>
      </CardContent>
      <CardFooter className="mt-auto flex-col gap-3 border-0 bg-transparent px-6 pt-0">
        <a className={cn(buttonVariants({ size: "lg" }), "h-11 w-full rounded-xl font-bold")} href={whatsappUrl(message)} target="_blank" rel="noreferrer">Pilih Paket <ChevronRight aria-hidden="true" /></a>
        <Link className="text-sm font-bold text-primary underline-offset-4 hover:underline" href="/paket-internet">Lihat detail paket</Link>
      </CardFooter>
    </Card>
  )
}