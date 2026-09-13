import { loadEnvFile } from "node:process"
import { defineConfig } from "drizzle-kit"

try {
  loadEnvFile(".env.local")
} catch {
  // Production migration environments provide DATABASE_URL directly.
}

const databaseUrl = process.env.DATABASE_URL

if (databaseUrl && /^(postgres|postgresql):\/\//i.test(databaseUrl)) {
  throw new Error(
    "DATABASE_URL points to PostgreSQL, but this project migration is configured for MySQL/MariaDB. Set DATABASE_URL to a mysql:// or mariadb:// URL.",
  )
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: databaseUrl ?? "mysql://unconfigured:unconfigured@127.0.0.1:3306/unconfigured",
  },
})
