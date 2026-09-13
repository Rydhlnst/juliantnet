# cPanel Node.js deployment

1. Use the Node.js version supported by Next.js 16 (Node 20.9+).
2. Create a MySQL/MariaDB database and user in cPanel; grant that user access only to this database.
3. Upload the project, install production dependencies, and create `.env` from `.env.example` with production values. Never upload `.env.local` or credentials to source control.
4. Run `npm run db:migrate` once after reviewing the generated SQL migration. Set `SEED_ADMIN_*`, run `npm run db:seed`, then remove those seed password variables.
5. Run `npm run build`. With `output: "standalone"`, copy `public/` and `.next/static/` into `.next/standalone/` if deploying only the standalone folder.
6. Configure the cPanel Node.js application startup command as `node .next/standalone/server.js`; set `PORT`/`HOSTNAME` if required by the host.
7. Point the domain to the Node application, enable HTTPS, and set `NEXT_PUBLIC_SITE_URL` and `BETTER_AUTH_URL` to the canonical HTTPS URL.
8. Create an R2 bucket, a limited access key, and a public delivery URL. Add bucket CORS allowing `POST` from the production origin and configure `R2_*` variables.
9. Verify: `/`, coverage lookup, registration, `/admin/login`, plan/coverage CRUD, lead status update, media upload, sitemap, robots, and application logs.

Do not use destructive schema synchronization in production. Generate and review migrations with `npm run db:generate`, then apply them with `npm run db:migrate`.
