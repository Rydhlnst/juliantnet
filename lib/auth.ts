import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { headers } from "next/headers"
import { db } from "@/db"
import { getTrustedAuthOrigins } from "@/lib/auth-config"
import { accounts, sessions, users, verifications } from "@/db/schema"
import type { UserRole } from "@/lib/contracts"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: getTrustedAuthOrigins(),
  secret: process.env.BETTER_AUTH_SECRET ?? "development-secret-change-before-production-32-chars",
  database: drizzleAdapter(db, { provider: "pg", schema: { user: users, session: sessions, account: accounts, verification: verifications } }),
  user: { additionalFields: { role: { type: "string", required: false, input: false, defaultValue: "ADMIN" } } },
  emailAndPassword: { enabled: true, disableSignUp: true },
  plugins: [nextCookies()],
})

export async function getCurrentUser() { return auth.api.getSession({ headers: await headers() }).then((session) => session?.user ?? null) }
export async function requireAdmin(allowedRoles: UserRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR", "SALES"]) { const user = await getCurrentUser(); const role = (user as { role?: UserRole } | null)?.role; if (!user || !role || !allowedRoles.includes(role)) throw new Error("UNAUTHORIZED"); return user as typeof user & { role: UserRole } }
