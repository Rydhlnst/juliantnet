import type { NextConfig } from "next"
const r2Url = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL) : null
const nextConfig: NextConfig = { output: "standalone", turbopack: { root: process.cwd() }, images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }, ...(r2Url ? [{ protocol: r2Url.protocol.replace(":", "") as "https", hostname: r2Url.hostname, pathname: "/**" }] : [])] } }
export default nextConfig
