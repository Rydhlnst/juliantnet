"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronRight, FilePenLine, FileText, Image, LayoutGrid, ListChecks, MapPinned, MessageSquareText, Package, Settings, UserRound, Users } from "lucide-react"

const items = [
  ["Overview", "/admin", LayoutGrid],
  ["Website", "/admin/website", FilePenLine],
  ["Paket Internet", "/admin/plans", Package],
  ["Coverage", "/admin/coverage", MapPinned],
  ["Leads", "/admin/leads", Users],
  ["FAQ", "/admin/faqs", MessageSquareText],
  ["Testimonials", "/admin/testimonials", ListChecks],
  ["Media", "/admin/media", Image],
  ["SEO", "/admin/seo", FileText],
  ["Settings", "/admin/settings", Settings],
] as const

export function AdminSidebar() {
  const pathname = usePathname()
  return <aside className="flex shrink-0 flex-col bg-secondary text-secondary-foreground lg:min-h-screen lg:w-68">
    <div className="flex h-19 items-center gap-3 px-5"><span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-black text-primary-foreground">IC</span><div><p className="font-black tracking-tight">Internet Cepat</p><p className="text-xs text-secondary-foreground/55">CMS workspace</p></div></div>
    <nav className="flex gap-1 overflow-x-auto border-y border-secondary-foreground/10 p-3 lg:flex-col lg:overflow-visible" aria-label="Admin navigation">{items.map(([label, href, Icon]) => { const active = pathname === href || (href !== "/admin" && pathname.startsWith(href)); return <Link key={href} href={href} className={`group inline-flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${active ? "bg-secondary-foreground text-secondary" : "text-secondary-foreground/65 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"}`}><Icon className="size-4" />{label}{active && <ChevronRight className="ml-auto hidden size-4 lg:block" />}</Link> })}</nav>
    <div className="mt-auto hidden p-4 lg:block"><Link href="/admin/account" className="flex items-center gap-3 rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-3 transition hover:bg-secondary-foreground/10"><span className="grid size-8 place-items-center rounded-full bg-primary/20 text-primary"><UserRound className="size-4" /></span><span className="min-w-0"><span className="block text-sm font-bold">Admin account</span><span className="block truncate text-xs text-secondary-foreground/55">Manage your profile</span></span></Link></div>
  </aside>
}
