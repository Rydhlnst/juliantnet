import { loadEnvFile } from "node:process"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

try {
  loadEnvFile(".env.local")
} catch {
  // Vercel and production environments inject DATABASE_URL directly.
}

const connectionString = process.env.DATABASE_URL
const isPostgresUrl = Boolean(connectionString && /^(postgres|postgresql):\/\//i.test(connectionString))
const sql = neon(
  connectionString && isPostgresUrl
    ? connectionString
    : "postgresql://unconfigured:unconfigured@127.0.0.1:5432/unconfigured",
)

export const db = drizzle(sql)
export const isDatabaseConfigured = Boolean(connectionString && isPostgresUrl)
export const databaseConfigurationError = connectionString && !isPostgresUrl
  ? "DATABASE_URL must point to a Neon PostgreSQL database."
  : null
