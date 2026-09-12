import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://internetcepat.id"),
  title: { default: "Internet Cepat | WiFi Cepat & Stabil", template: "%s | Internet Cepat" },
  description: "Internet Cepat menghadirkan koneksi WiFi cepat dan stabil untuk rumah, kerja, hiburan, dan bisnis.",
  openGraph: { type: "website", locale: "id_ID", siteName: "Internet Cepat", title: "Internet Cepat | WiFi Cepat & Stabil", description: "Koneksi WiFi cepat dan stabil untuk rumah, kerja, hiburan, dan bisnis.", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Maskot Internet Cepat bekerja di ruang data center" }] },
  twitter: { card: "summary_large_image", title: "Internet Cepat | WiFi Cepat & Stabil", description: "Koneksi WiFi cepat dan stabil untuk rumah, kerja, hiburan, dan bisnis.", images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="id" className={`${geist.variable} scroll-smooth`}><body>{children}<FloatingWhatsapp /></body></html>
}