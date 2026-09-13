import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.internetcepat.co.id"
const routes = ["", "/paket-internet", "/cek-coverage", "/internet-rumah", "/internet-bisnis", "/tentang", "/bantuan", "/faq", "/kontak", "/daftar"]

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
