# Internet Cepat

Next.js 16 ISP sales website and protected CMS for plans, coverage, leads, content, media, and SEO.

## Stack

Next.js App Router, React 19, TypeScript, Tailwind v4, shadcn/ui, Drizzle ORM, Neon PostgreSQL, Better Auth, Zod, and Cloudflare R2.

## Local setup

1. Copy .env.example to .env.local.
2. Set DATABASE_URL to the Neon pooled connection string.
3. Run npm install.
4. Run npm run db:migrate.
5. Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD, then run npm run db:seed.
6. Remove the seed password variables and run npm run dev.
7. Sign in at /admin/login.

Seeded plans, coverage, FAQ, and company data are marked DEVELOPMENT PLACEHOLDER. Replace them before launch.

## Commands

    npm run dev
    npm run lint
    npm run build
    npm run db:generate
    npm run db:migrate
    npm run db:seed

## CMS

/admin is protected by Better Auth. There is no public admin registration. CMS supports plans, coverage, leads, FAQs, testimonials, media, settings, and SEO/content entry points.

R2 media uploads use short-lived presigned uploads. Configure the five R2 variables plus R2_PUBLIC_URL and bucket CORS for the deployed site origin.

## Vercel environment variables

Add every runtime variable below in Vercel Project Settings → Environment Variables:

- DATABASE_URL — Neon pooled PostgreSQL URL for the production branch.
- BETTER_AUTH_SECRET — random secret, at least 32 characters.
- BETTER_AUTH_URL — canonical HTTPS production URL.
- NEXT_PUBLIC_SITE_URL — same canonical HTTPS production URL.
- NEXT_PUBLIC_WHATSAPP_NUMBER — WhatsApp number in international digits.
- R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL — required for CMS media uploads.

Do not add SEED_ADMIN_* to Vercel. Run the seed once locally or from a protected CI job, then remove those variables.

See DEPLOYMENT.md for Neon, Vercel, R2, and post-deploy checks.
