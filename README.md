# Compute Share

Turn idle laptops and workstations into paid compute for AI training jobs.

## Concept

Compute Share is a shared compute marketplace for AI training — starting with a friend's idle laptop as the first supply node. MVP scope is deliberately narrow: one provider + one renter, to validate the core loop before building a real marketplace/scheduler.

## Tech Stack

- **Framework:** Next.js 16.3.4 (App Router, TypeScript, `src/` dir)
- **Styling:** Tailwind CSS v4 with native CSS-variable theme (`@theme inline`)
- **Components:** shadcn/ui — New York style, built on **Base UI** (not Radix)
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)
- **Typography:** Fustat (primary sans), DM Mono (accent)
- **Auth:** Better Auth (email/password)
- **Database:** PostgreSQL
- **ORM:** Prisma (planned for Step 3)
- **Hosting:** Vercel (planned)

## Design System

- **Layout:** 65%-width centered column with visible vertical border rails
- **Backgrounds:** warm paper-toned column (`hsl(40 20% 95.5%)`) against faint off-white (`hsl(40 10% 98%)`)
- **Accent:** muted copper/amber (`hsl(30 60% 42%)`)
- **Font scale:** base `112.5%` (18px root), hero `text-6xl`, headings `text-3xl`

## Current State

- Landing page complete (`src/app/page.tsx` + `src/components/landing/`)
- Better Auth configured with `nextCookies()`, `secret`, and `baseURL`
- Functional `/login` and `/signup` pages with client-side validation, error display, and loading states
- Dashboard shell with sidebar nav for `/dashboard/machines`, `/dashboard/jobs`, `/dashboard/profile`, `/dashboard/billing`
- Protected routes via `src/proxy.ts` with Node.js runtime
- PostgreSQL database `computeshare` created
- Better Auth tables migrated: `user`, `session`, `account`, `verification`
- Build and lint verified with `next build --webpack` and `eslint`

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally or accessible via connection string
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|----------|-------------|
| `BETTER_AUTH_SECRET` | At least 32 characters; generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL of your app, e.g. `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Public URL of your app, e.g. `http://localhost:3000` |

### Database Setup

1. Ensure PostgreSQL is running
2. Create the `computeshare` database
3. Run the Better Auth schema migration:
   ```bash
   npx auth@latest generate -y
   npx auth@latest migrate -y
   ```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Turbopack is permanently disabled for this project. The dev server runs with `next dev --webpack`. The build script is also configured to use `--webpack`.

## Build Order

1. **Step 1 — Auth** (complete): Better Auth config, login/signup with validation, protected routes, database migrated
2. **Step 2 — Dashboard Shell** (complete): sidebar nav, stub pages for machines/jobs/profile/billing
3. **Step 3 — Database + CRUD**: Prisma schema, server actions, real data in dashboard
4. **Step 4+**: Provider agent, scheduler, metering/billing

After Step 3, we pause to validate shell usability before building the provider agent.

## Known Gotchas

1. **Never use raw `<a>` tags** in JSX. A browser/editor extension silently strips `<a` sequences from pasted JSX. Always use Next.js `<Link>`.

2. **Base UI, not Radix.** Don't use `asChild` + wrapper `<button>` patterns — it causes nested-`<button>` hydration errors. Pass `className`/`aria-label` directly to trigger components.

3. **Turbopack is broken for this project.** Run dev via `next dev --webpack` permanently. Do not switch back without a specific reason.

4. **Windows Defender file-locking** previously caused `EPERM` rename errors during builds. A Defender exclusion was added for the project folder. If `EPERM` errors reappear, check that exclusion is still active.

5. **Next.js 16 proxy naming:** middleware is now `proxy`. Better Auth supports both names, but this project uses `src/proxy.ts`.

## Project Structure

```
src/
  app/
    layout.tsx                 # Root layout with AuthProvider
    page.tsx                   # Landing page composition layer
    api/auth/[...all]/route.ts # Better Auth API route
    login/page.tsx             # Login page with validation and loading states
    signup/page.tsx            # Signup page with validation and loading states
    dashboard/
      layout.tsx               # Dashboard shell layout
      page.tsx                 # Redirects to /dashboard/machines
      machines/page.tsx        # Stub page
      jobs/page.tsx            # Stub page
      profile/page.tsx         # Stub page
      billing/page.tsx         # Stub page
  components/
    auth/
      auth-provider.tsx        # Client-side auth context
    dashboard/
      dashboard-shell.tsx      # Sidebar navigation shell
    landing/
      nav.tsx                  # Auth-aware navigation
      hero.tsx
      how-it-works.tsx
      audiences.tsx
      pricing.tsx
      footer.tsx
    ui/                        # shadcn/ui components (Base UI)
  lib/
    auth.ts                    # Better Auth server instance with nextCookies
    auth-client.ts             # Better Auth React client
    db/
proxy.ts                       # Next.js 16 proxy for protected routes (Node.js runtime)
```

## Scripts

```bash
npm run dev      # Start dev server with webpack
npm run build    # Production build with webpack
npm run start    # Start production server
npm run lint     # Run ESLint
npx auth@latest generate -y   # Generate Better Auth schema
npx auth@latest migrate -y    # Run Better Auth migrations
```

## Contributing

This is a learning project. Follow the existing build order: one piece at a time, verify working before moving on.
