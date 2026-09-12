import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://internetcepat.id"),
  title: { default: "Internet Cepat | Internet WiFi Cepat & Stabil", template: "%s | Internet Cepat" },
  description: "Internet WiFi cepat dan stabil untuk rumah dan bisnis.",
  openGraph: { type: "website", locale: "id_ID", siteName: "Internet Cepat" },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="id" className={`${geist.variable} scroll-smooth`}><body>{children}</body></html>
}