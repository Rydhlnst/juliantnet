import { MediaLibrary } from "@/components/admin/media-library"
export default function MediaAdminPage() { return <><p className="text-sm font-black tracking-[.16em] text-primary uppercase">CMS</p><h1 className="mt-2 text-3xl font-black">Media library</h1><p className="mt-2 text-sm text-muted-foreground">Media disimpan di Cloudflare R2, bukan di folder public aplikasi.</p><MediaLibrary /></> }
