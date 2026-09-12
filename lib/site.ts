export const site = {
  name: "Internet Cepat",
  description: "Internet WiFi cepat dan stabil untuk rumah dan bisnis.",
  url: "https://internetcepat.id",
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