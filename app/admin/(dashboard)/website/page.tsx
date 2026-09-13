import { HomepageEditor } from "@/components/admin/homepage-editor"

export default function WebsiteAdminPage() {
  return <div className="mx-auto max-w-7xl"><header className="mb-8"><p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Content studio</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Website content</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Edit structured homepage sections, control visibility, and change the order without touching code.</p></header><HomepageEditor /></div>
}
