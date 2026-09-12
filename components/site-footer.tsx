import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { site, whatsappUrl } from "@/lib/site"

export function SiteFooter() {
  const links = [["Layanan", [["Paket Internet", "/paket-internet"], ["Internet Rumah", "/internet-rumah"], ["Internet Bisnis", "/internet-bisnis"]]], ["Bantuan", [["Cek Coverage", "/cek-coverage"], ["FAQ", "/faq"], ["Kontak", "/kontak"]]], ["Perusahaan", [["Tentang Kami", "/tentang"], ["Bantuan", "/bantuan"], ["Daftar", "/daftar"]]]] as const
  return <footer className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]"><div><Link href="/" className="inline-flex" aria-label="Internet Cepat beranda"><Image src="/brand/internet-cepat-wordmark.png" alt="Internet Cepat" width={220} height={79} className="h-8 w-auto max-w-[12rem] object-contain brightness-125 sm:h-9" /></Link><p className="mt-4 max-w-xs text-sm leading-6 text-secondary-foreground/70">Internet Cepat membantu rumah dan bisnis tetap terhubung dengan koneksi WiFi yang cepat, stabil, dan mudah dipilih.</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent" href={whatsappUrl("Halo Internet Cepat, saya ingin cek paket dan coverage WiFi.")} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Chat WhatsApp</a></div>{links.map(([title, items]) => <div key={title}><h2 className="font-bold">{title}</h2><ul className="mt-4 space-y-3">{items.map(([label, href]) => <li key={href}><Link className="text-sm text-secondary-foreground/70 hover:text-accent" href={href}>{label}</Link></li>)}</ul></div>)}</div><Separator className="my-10 bg-secondary-foreground/15" /><p className="text-sm text-secondary-foreground/60">© {new Date().getFullYear()} {site.name}. Semua hak dilindungi.</p></div></footer>
}