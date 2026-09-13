import type { Metadata } from "next"
import { RegistrationForm } from "@/components/registration-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getPublicPlans } from "@/lib/services/public"
export const metadata: Metadata = { title: "Daftar Internet Cepat", description: "Mulai permintaan pemasangan Internet Cepat setelah coverage dan paket sesuai kebutuhanmu.", alternates: { canonical: "/daftar" } }
export default async function RegistrationPage({ searchParams }: PageProps<"/daftar">) { const params = await searchParams; const plan = typeof params.plan === "string" ? params.plan : undefined; const plans = await getPublicPlans(); return <><SiteHeader /><main className="mx-auto max-w-3xl px-5 py-16"><p className="text-sm font-black tracking-[.16em] text-primary uppercase">Pendaftaran</p><h1 className="mt-3 text-4xl font-black tracking-tight">Mulai pemasangan dengan langkah yang jelas.</h1><p className="mt-4 max-w-xl text-muted-foreground">Cek lokasi, pilih paket, lalu kirim data agar tim kami dapat menghubungi Anda.</p><div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8"><RegistrationForm plans={plans} initialPlanId={plan} /></div></main><SiteFooter /></> }
