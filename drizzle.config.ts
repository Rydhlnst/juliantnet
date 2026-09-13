import { loadEnvFile } from "node:process"
import { defineConfig } from "drizzle-kit"

try {
  loadEnvFile(".env.local")
} catch {
  // Production migration environments provide DATABASE_URL directly.
}

const databaseUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL

if (databaseUrl && !/^(postgres|postgresql):\/\//i.test(databaseUrl)) {
  throw new Error(
    "DATABASE_URL must point to a Neon PostgreSQL database (postgresql://...).",
  )
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl ?? "postgresql://unconfigured:unconfigured@127.0.0.1:5432/unconfigured",
  },
})
