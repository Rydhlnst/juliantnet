"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Clock3, MapPin, Search, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CoverageStatus } from "@/lib/contracts"

type FormState = { address: string; province: string; city: string; district: string; postalCode: string; propertyType: "RESIDENTIAL" | "BUSINESS" }
type CoverageResult = { status: CoverageStatus; message: string; coverageAreaId: string | null }
const initialState: FormState = { address: "", province: "", city: "", district: "", postalCode: "", propertyType: "RESIDENTIAL" }

export function CoverageChecker({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState(initialState)
  const [result, setResult] = useState<CoverageResult | null>(null)
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setResult(null)
    setIsPending(true)
    try {
      const response = await fetch("/api/coverage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await response.json() as CoverageResult & { error?: string }
      if (!response.ok) throw new Error(data.error ?? "Kami belum bisa memeriksa lokasi ini.")
      setResult(data)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Terjadi kesalahan. Coba lagi.")
    } finally { setIsPending(false) }
  }

  const ResultIcon = result?.status === "AVAILABLE" ? CheckCircle2 : result?.status === "COMING_SOON" ? Clock3 : XCircle
  return <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"} aria-busy={isPending}>
    <div className="flex flex-wrap gap-2" aria-label="Tipe properti">
      {(["RESIDENTIAL", "BUSINESS"] as const).map((type) => <button key={type} type="button" onClick={() => update("propertyType", type)} className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${form.propertyType === type ? "bg-primary text-primary-foreground" : "bg-primary/8 text-primary hover:bg-primary/15"}`} aria-pressed={form.propertyType === type}>{type === "RESIDENTIAL" ? "Rumah" : "Bisnis"}</button>)}
    </div>
    <label className="grid gap-2 text-sm font-semibold">Alamat pemasangan<Input value={form.address} onChange={(event) => update("address", event.target.value)} placeholder="Nama jalan dan nomor rumah" required minLength={6} /></label>
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-semibold">Provinsi<Input value={form.province} onChange={(event) => update("province", event.target.value)} placeholder="Jawa Barat" required /></label>
      <label className="grid gap-2 text-sm font-semibold">Kota / Kabupaten<Input value={form.city} onChange={(event) => update("city", event.target.value)} placeholder="Bandung" required /></label>
      <label className="grid gap-2 text-sm font-semibold">Kecamatan<Input value={form.district} onChange={(event) => update("district", event.target.value)} placeholder="Bojongsoang" required /></label>
      <label className="grid gap-2 text-sm font-semibold">Kode pos<Input inputMode="numeric" value={form.postalCode} onChange={(event) => update("postalCode", event.target.value)} placeholder="40287" pattern="[0-9]{5}" required /></label>
    </div>
    <Button type="submit" disabled={isPending} className="h-12 w-full rounded-xl text-base font-bold sm:w-auto"><Search aria-hidden="true" />{isPending ? "Memeriksa..." : "Cek Coverage"}</Button>
    {result && <div className={`rounded-xl border p-4 text-sm ${result.status === "AVAILABLE" ? "border-primary/25 bg-primary/10 text-primary" : result.status === "COMING_SOON" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-border bg-muted text-foreground"}`} role="status"><div className="flex gap-2"><ResultIcon className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><div><p className="font-black">{result.status === "AVAILABLE" ? "Jaringan tersedia" : result.status === "COMING_SOON" ? "Jaringan segera hadir" : "Belum tersedia"}</p><p className="mt-1 leading-6">{result.message}</p></div></div><div className="mt-4 flex flex-wrap gap-3"><Link className="font-bold underline underline-offset-4" href={result.status === "AVAILABLE" ? "/paket-internet" : "/daftar"}>{result.status === "AVAILABLE" ? "Lihat paket" : "Daftar minat"}</Link><Link className="font-bold underline underline-offset-4" href="/kontak">Hubungi kami</Link></div></div>}
    {error && <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert"><XCircle className="size-5" aria-hidden="true" />{error}</p>}
    <p className="flex items-center gap-2 text-xs leading-5 text-muted-foreground"><MapPin className="size-3.5" />Hasil awal berdasarkan area yang dikelola tim kami.</p>
  </form>
}
