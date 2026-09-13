# Neon + Vercel deployment

## Neon

The project uses the existing Neon project provider, production branch, and neondb database. Use its pooled connection string as the Vercel DATABASE_URL value. Keep the unpooled URL for migrations/CI only.

Apply schema changes with:

    npm run db:generate
    npm run db:migrate

Never use destructive schema synchronization in production.

## Vercel environment variables

Configure these for Production (and Preview when needed):

    DATABASE_URL=postgresql://...pooled.../neondb?sslmode=require
    BETTER_AUTH_SECRET=<random-secret-at-least-32-characters>
    BETTER_AUTH_URL=https://your-production-domain.example
    NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
    NEXT_PUBLIC_WHATSAPP_NUMBER=6280000000000
    R2_ACCOUNT_ID=<cloudflare-account-id>
    R2_ACCESS_KEY_ID=<r2-access-key>
    R2_SECRET_ACCESS_KEY=<r2-secret-key>
    R2_BUCKET=<bucket-name>
    R2_PUBLIC_URL=https://<public-r2-domain>

Do not store SEED_ADMIN_PASSWORD in Vercel. Provision the first admin once with SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, and SEED_ADMIN_NAME, then remove them.

## R2

Create a private R2 bucket and a scoped access key. Configure the public custom domain in R2_PUBLIC_URL and allow the production site origin in bucket CORS for presigned POST uploads.

## Deploy

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add the variables above.
4. Deploy with the default Next.js build command (npm run build).
5. Add the production domain to BETTER_AUTH_URL and NEXT_PUBLIC_SITE_URL.
6. Verify /, coverage lookup, registration, /admin/login, CMS CRUD, media upload, /sitemap.xml, and /robots.txt.

If Better Auth reports an invalid domain, add the exact Vercel/custom domain to its trusted redirect domains before retrying login.
