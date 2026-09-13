import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { requireAdmin } from "@/lib/auth"
export default async function AdminLayout({ children }: LayoutProps<"/admin">) { try { await requireAdmin(); } catch { redirect("/admin/login") } return <div className="min-h-screen bg-muted/40"><AdminSidebar /><div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/70 bg-background/95 px-4 backdrop-blur lg:hidden"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-black text-primary-foreground">IC</span><span className="text-sm font-black">Internet Cepat</span></div><AdminMobileNav /></div><main className="min-w-0 p-5 sm:p-8 lg:pl-[19rem]">{children}</main></div> }
