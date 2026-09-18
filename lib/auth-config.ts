const JULIANT_ORIGINS = ["https://juliant.net", "https://www.juliant.net"]
const LOCAL_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

export function getTrustedAuthOrigins(baseUrl = process.env.BETTER_AUTH_URL) {
  const configuredOrigin = baseUrl ? (() => { try { return new URL(baseUrl).origin } catch { return null } })() : null
  return Array.from(new Set([...LOCAL_ORIGINS, ...JULIANT_ORIGINS, configuredOrigin].filter((origin): origin is string => Boolean(origin))))
}