"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CoverageStatus, PublicPlan } from "@/lib/contracts"

type RegistrationState = { name: string; phone: string; email: string; address: string; province: string; city: string; district: string; postalCode: string; propertyType: "RESIDENTIAL" | "BUSINESS"; planId: string; notes: string; privacyAccepted: boolean }
type CoverageResult = { status: CoverageStatus; message: string; coverageAreaId: string | null }

export function RegistrationForm({ plans, initialPlanId }: { plans: PublicPlan[]; initialPlanId?: string }) {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<RegistrationState>({ name: "", phone: "", email: "", address: "", province: "", city: "", district: "", postalCode: "", propertyType: "RESIDENTIAL", planId: initialPlanId && plans.some((plan) => plan.id === initialPlanId) ? initialPlanId : plans[0]?.id ?? "", notes: "", privacyAccepted: false })
  const [coverage, setCoverage] = useState<CoverageResult | null>(null)
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [complete, setComplete] = useState<{ message: string; whatsappUrl: string } | null>(null)
  const update = (key: keyof RegistrationState, value: string | boolean) => setState((current) => ({ ...current, [key]: value }))
  const selectedPlan = plans.find((plan) => plan.id === state.planId)

  async function checkLocation() {
    setError(""); setIsPending(true)
    try {
      const response = await fetch("/api/coverage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address: state.address, province: state.province, city: state.city, district: state.district, postalCode: state.postalCode, propertyType: state.propertyType }) })
      const data = await response.json() as CoverageResult & { error?: string }
      if (!response.ok) throw new Error(data.error ?? "Coverage belum dapat diperiksa.")
      setCoverage(data); setStep(2)
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Terjadi kesalahan.") } finally { setIsPending(false) }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setIsPending(true)
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...state, coverageAreaId: coverage?.coverageAreaId ?? null, source: "REGISTRATION" }) })
      const data = await response.json() as { message?: string; whatsappUrl?: string; error?: string }
      if (!response.ok || !data.whatsappUrl) throw new Error(data.error ?? "Permintaan belum dapat dikirim.")
      setComplete({ message: data.message ?? "Permintaan pemasangan berhasil dikirim.", whatsappUrl: data.whatsappUrl })
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Terjadi kesalahan.") } finally { setIsPending(false) }
  }
  if (!plans.length) return <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">Belum ada paket aktif. Hubungi tim kami untuk melanjutkan pendaftaran.</div>
  if (complete) return <div className="rounded-2xl bg-primary/10 p-6 text-primary"><CheckCircle2 className="size-8" /><h2 className="mt-4 text-xl font-black">Permintaan sudah diterima.</h2><p className="mt-2 leading-6">{complete.message}</p><a className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 font-bold text-primary-foreground" href={complete.whatsappUrl} target="_blank" rel="noreferrer">Lanjut ke WhatsApp <ExternalLink className="size-4" /></a></div>
  return <form className="space-y-6" onSubmit={submit} noValidate>
    <ol className="grid grid-cols-5 gap-2" aria-label="Tahapan pendaftaran">{["Coverage", "Paket", "Data", "Alamat", "Konfirmasi"].map((label, index) => <li key={label} className={`border-t-2 pt-2 text-xs font-semibold ${step === index + 1 ? "border-primary text-primary" : step > index + 1 ? "border-primary/40 text-foreground" : "border-border text-muted-foreground"}`}>0{index + 1}<span className="mt-1 block">{label}</span></li>)}</ol>
    {step === 1 && <div className="space-y-4"><h2 className="text-xl font-black">Cek coverage</h2><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Alamat<Input required value={state.address} onChange={(event) => update("address", event.target.value)} /></label><label className="grid gap-2 text-sm font-bold">Provinsi<Input required value={state.province} onChange={(event) => update("province", event.target.value)} /></label><label className="grid gap-2 text-sm font-bold">Kota / Kabupaten<Input required value={state.city} onChange={(event) => update("city", event.target.value)} /></label><label className="grid gap-2 text-sm font-bold">Kecamatan<Input required value={state.district} onChange={(event) => update("district", event.target.value)} /></label><label className="grid gap-2 text-sm font-bold">Kode pos<Input required pattern="[0-9]{5}" inputMode="numeric" value={state.postalCode} onChange={(event) => update("postalCode", event.target.value)} /></label><fieldset className="grid gap-2 text-sm font-bold"><legend>Tipe properti</legend><div className="flex gap-2">{(["RESIDENTIAL", "BUSINESS"] as const).map((type) => <button key={type} type="button" onClick={() => update("propertyType", type)} className={`min-h-10 rounded-lg px-3 ${state.propertyType === type ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{type === "RESIDENTIAL" ? "Rumah" : "Bisnis"}</button>)}</div></fieldset></div><Button type="button" onClick={() => void checkLocation()} disabled={isPending}>{isPending ? "Memeriksa..." : "Lanjut cek coverage"}<ArrowRight /></Button></div>}
    {step === 2 && <div className="space-y-5"><h2 className="text-xl font-black">Pilih paket</h2>{coverage && <p className="rounded-xl bg-muted p-3 text-sm"><strong>{coverage.status === "AVAILABLE" ? "Coverage tersedia." : coverage.status === "COMING_SOON" ? "Coverage segera hadir." : "Area belum tersedia."}</strong> {coverage.message}</p>}<div className="grid gap-3">{plans.map((plan) => <label key={plan.id} className={`cursor-pointer rounded-xl border p-4 ${state.planId === plan.id ? "border-primary bg-primary/5" : "border-border"}`}><input className="sr-only" type="radio" name="plan" value={plan.id} checked={state.planId === plan.id} onChange={() => update("planId", plan.id)} /><span className="font-black">{plan.name} · {plan.speedMbps} Mbps</span><span className="mt-1 block text-sm text-muted-foreground">{plan.description}</span></label>)}</div><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep(1)}><ArrowLeft />Kembali</Button><Button type="button" onClick={() => setStep(3)}>Lanjut</Button></div></div>}
    {step === 3 && <div className="space-y-4"><h2 className="text-xl font-black">Data pelanggan</h2><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Nama lengkap<Input required value={state.name} onChange={(event) => update("name", event.target.value)} /></label><label className="grid gap-2 text-sm font-bold">WhatsApp<Input required inputMode="tel" value={state.phone} onChange={(event) => update("phone", event.target.value)} placeholder="08xxxxxxxxxx" /></label></div><label className="grid gap-2 text-sm font-bold">Email <span className="font-normal text-muted-foreground">(opsional)</span><Input type="email" value={state.email} onChange={(event) => update("email", event.target.value)} /></label><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep(2)}><ArrowLeft />Kembali</Button><Button type="button" onClick={() => setStep(4)}>Lanjut</Button></div></div>}
    {step === 4 && <div className="space-y-4"><h2 className="text-xl font-black">Catatan pemasangan</h2><label className="grid gap-2 text-sm font-bold">Catatan untuk tim <span className="font-normal text-muted-foreground">(opsional)</span><textarea className="min-h-28 rounded-xl border bg-background px-3 py-2 text-sm" value={state.notes} onChange={(event) => update("notes", event.target.value)} maxLength={2000} placeholder="Patokan lokasi, jadwal yang diinginkan, atau kebutuhan khusus." /></label><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep(3)}><ArrowLeft />Kembali</Button><Button type="button" onClick={() => setStep(5)}>Lanjut</Button></div></div>}
    {step === 5 && <div className="space-y-5"><h2 className="text-xl font-black">Konfirmasi permintaan</h2><div className="rounded-xl bg-muted p-4 text-sm leading-6"><p><strong>Paket:</strong> {selectedPlan?.name} · {selectedPlan?.speedMbps} Mbps</p><p><strong>Pemasangan:</strong> {state.address}, {state.district}, {state.city}, {state.postalCode}</p><p><strong>Kontak:</strong> {state.name} · {state.phone}</p></div><label className="flex gap-3 text-sm leading-6"><input className="mt-1 size-4" type="checkbox" checked={state.privacyAccepted} onChange={(event) => update("privacyAccepted", event.target.checked)} required />Saya setuju data ini digunakan untuk menindaklanjuti permintaan pemasangan sesuai <Link href="/kebijakan-privasi" className="font-bold text-primary underline">kebijakan privasi</Link>.</label><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep(4)}><ArrowLeft />Kembali</Button><Button type="submit" disabled={isPending}>{isPending ? "Mengirim..." : "Kirim permintaan"}</Button></div></div>}
    {error && <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">{error}</p>}
  </form>
}
