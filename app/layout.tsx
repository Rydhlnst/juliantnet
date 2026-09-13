import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })
export const dynamic = "force-dynamic"
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"), title: { default: "Internet Cepat | WiFi Cepat & Stabil", template: "%s | Internet Cepat" }, description: "Internet WiFi cepat dan stabil untuk rumah dan bisnis. Cek coverage dan daftar pemasangan online.", openGraph: { type: "website", locale: "id_ID", siteName: "Internet Cepat" }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } } }
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="id" className={`${geist.variable} scroll-smooth`}><body>{children}<FloatingWhatsapp /></body></html> }
