import { MessageCircle } from "lucide-react"

import { whatsappUrl } from "@/lib/site"

export function FloatingWhatsapp() {
  return <a
    href={whatsappUrl("Halo Internet Cepat, saya ingin cek paket dan coverage WiFi.")}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat WhatsApp dengan Internet Cepat"
    className="fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition hover:scale-105 hover:bg-[#1fbd5b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 sm:right-6 sm:bottom-6"
  >
    <MessageCircle className="size-7" aria-hidden="true" />
    <span className="sr-only">Chat WhatsApp</span>
  </a>
}