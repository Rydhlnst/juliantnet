"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { adminNavGroups } from "@/components/admin/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminMobileNav() {
  const pathname = usePathname()
  return <Sheet><SheetTrigger render={<Button variant="outline" size="icon" aria-label="Open admin navigation" />}><Menu /></SheetTrigger><SheetContent side="left" className="w-[86vw] max-w-sm bg-secondary text-secondary-foreground"><SheetHeader><SheetTitle className="text-secondary-foreground">JULIANT.NET</SheetTitle><SheetDescription className="text-secondary-foreground/60">CMS workspace navigation.</SheetDescription></SheetHeader><nav className="space-y-5 px-4" aria-label="Mobile admin navigation">{adminNavGroups.map((group) => <div key={group.label}><p className="px-3 text-[10px] font-bold tracking-[.16em] text-secondary-foreground/40 uppercase">{group.label}</p><div className="mt-2 space-y-1">{group.items.map(({ label, href, icon: Icon }) => { const active = pathname === href || (href !== "/admin" && pathname.startsWith(href)); return <SheetClose key={href} render={<Link href={href} className={`flex min-h-10 items-center gap-3 rounded-none px-3 text-sm font-semibold ${active ? "bg-secondary-foreground text-secondary" : "text-secondary-foreground/70 hover:bg-secondary-foreground/10"}`} />}><Icon className="size-4" />{label}</SheetClose> })}</div></div>)}</nav></SheetContent></Sheet>
}
