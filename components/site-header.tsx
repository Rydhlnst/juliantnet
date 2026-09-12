"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { navigation } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
      <Link href="/" className="flex items-center" aria-label="Internet Cepat beranda"><Image src="/brand/internet-cepat-wordmark.png" alt="Internet Cepat" width={190} height={68} priority className="h-9 w-auto max-w-[48vw] object-contain sm:h-11" /></Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi utama">{navigation.map((item) => <Link key={item.href} className="text-sm font-semibold text-foreground/80 transition hover:text-primary" href={item.href}>{item.label}</Link>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><Link className="text-sm font-bold text-primary" href="/daftar">Masuk</Link><Link className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90" href="/cek-coverage">Cek Coverage</Link></div>
      <Sheet><SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu" />}><Menu /></SheetTrigger><SheetContent side="right" className="w-[86vw] max-w-sm bg-background"><SheetHeader><SheetTitle>Internet Cepat</SheetTitle><SheetDescription>Internet untuk keseharian yang lebih lancar.</SheetDescription></SheetHeader><nav className="flex flex-col gap-1 px-4" aria-label="Navigasi mobile">{navigation.map((item) => <Link key={item.href} className="rounded-lg px-3 py-3 font-semibold hover:bg-muted" href={item.href}>{item.label}</Link>)}<Link className="mt-3 rounded-xl bg-primary px-4 py-3 text-center font-bold text-primary-foreground" href="/cek-coverage">Cek Coverage</Link></nav></SheetContent></Sheet>
    </div>
  </header>
}