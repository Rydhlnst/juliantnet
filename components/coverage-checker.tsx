"use client"

import { FormEvent, useState } from "react"
import { CheckCircle2, MapPin, Search, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CoverageResult = { available: boolean; message: string }

export function CoverageChecker({ compact = false }: { compact?: boolean }) {
  const [address, setAddress] = useState("")
  const [propertyType, setPropertyType] = useState<"Rumah" | "Bisnis">("Rumah")
  const [result, setResult] = useState<CoverageResult | null>(null)
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setResult(null)
    setIsPending(true)
    try {
      const response = await fetch("/api/coverage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType }),
      })
      const data = (await response.json()) as CoverageResult & { error?: string }
      if (!response.ok) throw new Error(data.error ?? "Kami belum bisa memeriksa lokasi ini.")
      setResult(data)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Terjadi kesalahan. Coba lagi.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"} aria-busy={isPending}>
      <div className="flex flex-wrap gap-2" aria-label="Tipe properti">
        {(["Rumah", "Bisnis"] as const).map((type) => (
          <button key={type} type="button" onClick={() => setPropertyType(type)} className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${propertyType === type ? "bg-primary text-primary-foreground" : "bg-primary/8 text-primary hover:bg-primary/15"}`} aria-pressed={propertyType === type}>
            {type}
          </button>
        ))}
      </div>
      <label className="sr-only" htmlFor={compact ? "coverage-compact" : "coverage-address"}>Alamat, kecamatan, atau kode pos</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <MapPin className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-primary" aria-hidden="true" />
          <Input id={compact ? "coverage-compact" : "coverage-address"} value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Alamat, kecamatan, atau kode pos" className="h-12 rounded-xl border-border bg-card pl-11 text-base shadow-none" required minLength={3} />
        </div>
        <Button type="submit" disabled={isPending} className="h-12 rounded-xl px-5 text-base font-bold">
          <Search aria-hidden="true" /> {isPending ? "Memeriksa..." : "Cek Coverage"}
        </Button>
      </div>
      {result && <p className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${result.available ? "bg-primary/10 text-primary" : "bg-amber-50 text-amber-900"}`} role="status"><CheckCircle2 className="size-5" aria-hidden="true" />{result.message}</p>}
      {error && <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert"><XCircle className="size-5" aria-hidden="true" />{error}</p>}
    </form>
  )
}