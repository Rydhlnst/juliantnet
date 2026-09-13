"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) { useEffect(() => { console.error(error) }, [error]); return <main className="grid min-h-screen place-items-center p-5 text-center"><div><h1 className="text-3xl font-black">Terjadi kendala.</h1><p className="mt-3 text-muted-foreground">Silakan coba lagi. Jika masalah berlanjut, hubungi tim kami.</p><Button className="mt-6" onClick={reset}>Coba lagi</Button></div></main> }
