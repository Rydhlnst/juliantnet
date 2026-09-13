# Internet Cepat

Next.js 16 ISP sales website and CMS for plans, coverage, leads, content, media, and SEO.

## Stack

Next.js App Router, React 19, TypeScript, Tailwind v4, shadcn/ui, Drizzle ORM, MySQL/MariaDB, Better Auth, Zod, and Cloudflare R2.

## Local setup

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.
2. Run `npm install`.
3. Run `npm run db:migrate`.
4. Set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`, then run `npm run db:seed`.
5. Run `npm run dev` and sign in at `/admin/login`.

Seeded plans, coverage, FAQ, and company data are marked `DEVELOPMENT PLACEHOLDER`. Replace them before launch.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run db:generate
npm run db:migrate
npm run db:seed
```

## CMS

`/admin` is protected by Better Auth. There is no public admin registration. CMS supports plans, coverage, leads, FAQs, testimonials, media, settings, and SEO/content entry points.

R2 media uploads use short-lived presigned uploads. Configure the five `R2_*`/`R2_PUBLIC_URL` values and bucket CORS for the deployed site origin.

See [DEPLOYMENT.md](DEPLOYMENT.md) for cPanel production setup.
