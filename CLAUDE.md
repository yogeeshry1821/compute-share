# Compute Share — Project Context

## Concept
A shared compute marketplace for AI training — starting with a friend's idle
laptop as the first supply node. Built as a learning project with realistic
awareness of established competitors (Vast.ai, Akash, RunPod, io.net). MVP
scope is deliberately narrow: one provider + one renter, to validate the
core loop before building a real marketplace/scheduler.

## Stack
- Framework: Next.js 16.3.4 (App Router, TypeScript, `src/` dir)
- **Dev server runs with `--webpack`, not Turbopack** — see "Known gotchas" below.
  Do not switch back to Turbopack without a specific reason.
- Styling: Tailwind CSS v4 (native CSS-variable theme via `@theme inline` in
  globals.css, not the old `tailwind.config.ts` color approach)
- Components: shadcn/ui — New York style, Neutral base color, built on
  **Base UI, not Radix** (this matters — see gotchas)
- Icons: Phosphor Icons (`@phosphor-icons/react`). Server components import
  from `@phosphor-icons/react/ssr`; client components import from
  `@phosphor-icons/react`.
- Typography: Fustat (primary sans, via `next/font/google`), DM Mono
  (accent — specs, status, labels, IDs)
- Planned, not yet implemented: Postgres + Prisma, Clerk/NextAuth
  (undecided), Vercel hosting

## Design system
- Layout: content centered in a 65%-width column (full-bleed below `lg`
  breakpoint) with visible vertical border rails
- Backgrounds: warm paper-toned column (`hsl(40 20% 95.5%)`) against a very
  faint off-white outer page (`hsl(40 10% 98%)`, not pure white)
- Border color intentionally darkened (`hsl(35 20% 78%)`) to stay visible
  against both backgrounds
- Global base font size set to `112.5%` (18px root) via
  `html { font-size: 112.5% }` in globals.css — scales all rem-based
  Tailwind text sizes sitewide
- Type scale: hero `text-6xl`, section headings `text-3xl`, body
  `text-base`/`text-lg`
- Accent color: muted copper/amber (`primary: hsl(30 60% 42%)`), not a
  bright/neon accent

## Current state — landing page complete
`src/components/landing/`: nav.tsx, hero.tsx, how-it-works.tsx,
audiences.tsx, pricing.tsx, footer.tsx — composed in `src/app/page.tsx`.
Nav includes a responsive mobile sheet menu (hamburger -> slide-in panel).

## Known gotchas (read before touching these areas)

1. **Never use raw `<a>` tags.** A browser/editor extension (Grammarly
   suspected, never fully confirmed) silently strips `<a` sequences from
   pasted JSX, corrupting files. Always use Next.js `<Link>` instead.
   When writing files via automation, prefer direct file writes over
   simulating paste/type actions where possible.

2. **shadcn here is on Base UI, not Radix.** Don't use the
   `asChild` + wrapper `<button>` pattern — it causes a nested-`<button>`
   hydration error. `SheetTrigger` (and similar trigger components) should
   render as the button directly; pass `className`/`aria-label` straight to
   the trigger component instead of wrapping a `<button>` inside it with
   `asChild`.

3. **Turbopack is broken for this specific project.** A fresh scaffold
   elsewhere works fine with Turbopack, so this is project-specific, not a
   general Next/Tailwind incompatibility. Root cause traced to global
   npm/npx cache corruption (compounded by Anaconda's `(base)` environment
   interrupting earlier installs — `conda auto_activate_base` was disabled
   as a result). A full global cache clear plus reinstall fixed the
   underlying corruption, but Turbopack still fails to compile CSS
   correctly in this project even after that fix. Decision: run dev via
   `"next dev --webpack"` permanently. Do not attempt to switch back
   without a specific reason and a plan to re-diagnose.

4. Windows Defender file-locking previously caused `EPERM` rename errors
   during builds — a Defender exclusion was added for the project folder.
   If EPERM errors reappear, check that exclusion is still active.

5. `next.config.ts` has `experimental.optimizePackageImports` for Phosphor
   and a pinned `turbopack.root` — leftover from debugging, harmless to
   keep even while running webpack.

## Not yet started
- Auth (`/login`, `/signup`)
- Dashboard shell (`/dashboard`, `/dashboard/machines`, `/dashboard/jobs`,
  `/dashboard/profile`, `/dashboard/billing`)
- CRUD for machines (provider) and jobs (renter) — planned as
  stubbed/mock-status records before any real scheduler/agent exists
- Postgres/Prisma setup, real job execution logic, provider agent,
  billing/metering — all deferred per "prove the shell first" build order

## Working conventions
- Build one piece at a time, verify working before moving to the next
  (explicit preference — avoid batching multiple untested changes)
- Each landing page section is its own component file under
  `src/components/landing/`; `page.tsx` stays a thin composition layer
- Prefer writing files directly (terminal/automation) over editor paste
  where the `<a>` corruption risk applies
