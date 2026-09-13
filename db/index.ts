import { drizzle } from "drizzle-orm/mysql2"
import { createPool } from "mysql2/promise"

const connectionString = process.env.DATABASE_URL
const isPostgresUrl = Boolean(connectionString && /^(postgres|postgresql):\/\//i.test(connectionString))
const pool = createPool(
  connectionString && !isPostgresUrl
    ? connectionString
    : "mysql://unconfigured:unconfigured@127.0.0.1:3306/unconfigured",
)

export const db = drizzle(pool)
export const isDatabaseConfigured = Boolean(connectionString && !isPostgresUrl)
export const databaseConfigurationError = isPostgresUrl
  ? "DATABASE_URL points to PostgreSQL, but this app is configured for MySQL/MariaDB."
  : null
