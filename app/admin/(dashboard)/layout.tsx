import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { requireAdmin } from "@/lib/auth"
export default async function AdminLayout({ children }: LayoutProps<"/admin">) { try { await requireAdmin(); } catch { redirect("/admin/login") } return <div className="min-h-screen bg-muted/40 lg:flex"><AdminSidebar /><main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main></div> }
