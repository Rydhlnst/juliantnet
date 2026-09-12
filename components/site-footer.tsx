import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { site, whatsappUrl } from "@/lib/site"

export function SiteFooter() {
  const links = [["Layanan", [["Paket Internet", "/paket-internet"], ["Internet Rumah", "/internet-rumah"], ["Internet Bisnis", "/internet-bisnis"]]], ["Bantuan", [["Cek Coverage", "/cek-coverage"], ["FAQ", "/faq"], ["Kontak", "/kontak"]]], ["Perusahaan", [["Tentang Kami", "/tentang"], ["Bantuan", "/bantuan"], ["Daftar", "/daftar"]]]] as const
  return <footer className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]"><div><Link href="/" className="text-2xl font-black">Internet Cepat</Link><p className="mt-4 max-w-xs text-sm leading-6 text-secondary-foreground/70">Internet WiFi untuk rumah dan bisnis. Nama, nomor WhatsApp, serta informasi perusahaan ini adalah placeholder.</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent" href={whatsappUrl("Halo Internet Cepat, saya ingin bertanya tentang pemasangan WiFi.")} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Chat WhatsApp</a></div>{links.map(([title, items]) => <div key={title}><h2 className="font-bold">{title}</h2><ul className="mt-4 space-y-3">{items.map(([label, href]) => <li key={href}><Link className="text-sm text-secondary-foreground/70 hover:text-accent" href={href}>{label}</Link></li>)}</ul></div>)}</div><Separator className="my-10 bg-white/15" /><p className="text-sm text-secondary-foreground/60">© {new Date().getFullYear()} {site.name}. Semua hak dilindungi.</p></div></footer>
}