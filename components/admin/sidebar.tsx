"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, FilePenLine, FileText, Image, LayoutGrid, ListChecks, MapPinned, MessageSquareText, Package, Settings, UserRound, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const adminNavGroups: { label: string; items: readonly { label: string; href: string; icon: LucideIcon }[] }[] = [
  { label: "Operations", items: [{ label: "Overview", href: "/admin", icon: LayoutGrid }, { label: "Leads", href: "/admin/leads", icon: Users }, { label: "Coverage", href: "/admin/coverage", icon: MapPinned }] },
  { label: "Content", items: [{ label: "Website", href: "/admin/website", icon: FilePenLine }, { label: "Paket Internet", href: "/admin/plans", icon: Package }, { label: "FAQ", href: "/admin/faqs", icon: MessageSquareText }, { label: "Testimonials", href: "/admin/testimonials", icon: ListChecks }, { label: "Media", href: "/admin/media", icon: Image }] },
  { label: "System", items: [{ label: "SEO", href: "/admin/seo", icon: FileText }, { label: "Settings", href: "/admin/settings", icon: Settings }] },
]

export function AdminNavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname()
  return <nav className={mobile ? "space-y-5 px-4" : "space-y-6 px-3"} aria-label="Admin navigation">{adminNavGroups.map((group) => <div key={group.label}><p className="px-3 text-[10px] font-bold tracking-[.16em] text-secondary-foreground/40 uppercase">{group.label}</p><div className="mt-2 space-y-1">{group.items.map(({ label, href, icon: Icon }) => { const active = pathname === href || (href !== "/admin" && pathname.startsWith(href)); return <Link key={href} href={href} className={`group flex min-h-10 items-center gap-3 rounded-none px-3 text-sm font-semibold transition ${active ? "bg-secondary-foreground text-secondary" : "text-secondary-foreground/65 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"}`}><Icon className="size-4" />{label}{active && <ChevronRight className="ml-auto size-4" />}</Link> })}</div></div>)}</nav>
}

export function AdminSidebar() {
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-y-auto border-r border-secondary-foreground/10 bg-secondary text-secondary-foreground lg:flex lg:flex-col"><div className="flex min-h-20 items-center gap-3 border-b border-secondary-foreground/10 px-5"><span className="grid size-9 place-items-center rounded-none bg-primary text-sm font-black text-primary-foreground">IC</span><div><p className="font-black tracking-tight">JULIANT.NET</p><p className="text-xs text-secondary-foreground/55">CMS workspace</p></div></div><div className="flex-1 py-6"><AdminNavLinks /></div><div className="p-4"><Link href="/admin/account" className="flex items-center gap-3 rounded-none border border-secondary-foreground/10 bg-secondary-foreground/5 p-3 transition hover:bg-secondary-foreground/10"><span className="grid size-8 place-items-center rounded-none bg-primary/20 text-primary"><UserRound className="size-4" /></span><span className="min-w-0"><span className="block text-sm font-bold">Admin account</span><span className="block truncate text-xs text-secondary-foreground/55">Manage your profile</span></span></Link></div></aside>
}
