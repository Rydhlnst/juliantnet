import type { Metadata } from "next"
import { PlanCard } from "@/components/plan-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { plans } from "@/data/plans"
export const metadata: Metadata = { title: "Paket Internet", description: "Bandingkan paket internet Internet Cepat untuk kebutuhan rumah dan bisnis.", alternates: { canonical: "/paket-internet" } }
export default function PlansPage() { return <><SiteHeader /><main className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><p className="text-sm font-black tracking-[.16em] text-primary uppercase">Paket internet</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Pilih paket berdasarkan cara kamu terhubung.</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Harga adalah placeholder sampai data komersial disediakan. Semua detail wajib dikonfirmasi sebelum pendaftaran.</p><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{plans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}</div></main><SiteFooter /></> }