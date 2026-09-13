export const site = {
  name: "Internet Cepat",
  description: "Internet Cepat menghadirkan koneksi WiFi cepat dan stabil untuk rumah, kerja, hiburan, dan bisnis.",
  url: "https://www.internetcepat.co.id",
  whatsappNumber: "6280000000000",
} as const

export const navigation = [
  { href: "/internet-rumah", label: "Internet Rumah" },
  { href: "/internet-bisnis", label: "Internet Bisnis" },
  { href: "/paket-internet", label: "Paket Internet" },
  { href: "/cek-coverage", label: "Cek Coverage" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/bantuan", label: "Bantuan" },
]

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}
