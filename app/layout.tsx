import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import { getSiteUrl } from "@/lib/site-url"
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" })
export const dynamic = "force-dynamic"
export const metadata: Metadata = { metadataBase: getSiteUrl(), title: { default: "JULIANT.NET | Internet Cepat", template: "%s | JULIANT.NET" }, description: "Internet WiFi cepat dan stabil dari JULIANT.NET untuk rumah dan bisnis.", openGraph: { type: "website", locale: "id_ID", siteName: "JULIANT.NET" }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } } }
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="id" className={jakarta.variable + " scroll-smooth"}><body>{children}<FloatingWhatsapp /></body></html> }
