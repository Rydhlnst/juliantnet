import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { requireAdmin } from "@/lib/auth"
export default async function AdminLayout({ children }: LayoutProps<"/admin">) { try { await requireAdmin(); } catch { redirect("/admin/login") } return <div className="admin-shell min-h-screen"><AdminSidebar /><div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-none bg-primary text-xs font-black text-primary-foreground">IC</span><span className="text-sm font-black">JULIANT.NET</span></div><AdminMobileNav /></div><main className="min-w-0 p-5 sm:p-8 lg:pl-[17rem]">{children}</main></div> }
