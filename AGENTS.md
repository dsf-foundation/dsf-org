<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# dsf — Do Something Foundation site

Humanitarian nonprofit website. Next.js 16 App Router + React 19 + Tailwind v4, single package.

## Commands

- pnpm only (pinned via `packageManager`). `pnpm dev`, `pnpm build`, `pnpm lint` (ESLint 9 flat config; bare `eslint`).
- No test suite. Verify changes with `pnpm lint` then `pnpm build` (build also type-checks).

## Next.js 16 differences

- Middleware is gone — `src/proxy.ts` exports a named `proxy()` but it's currently a no-op (returns immediately). If locale-based routing is added later, this is where it goes.
- `params` is a Promise. Dynamic routes (`[slug]`, `[batchId]`) must `await params` — see `src/app/(site)/blog/[slug]/page.tsx`.
- React Compiler is on (`reactCompiler: true` in `next.config.ts`) — don't add `useMemo`/`useCallback`/`memo`.

## Routing

- Routes live under `src/app/(site)/` (a route group, not a locale segment). No `[lang]` prefix.
- All pages: `/`, `/about`, `/activities`, `/blog`, `/gallery`, `/contact`, `/donate`, `/get-involved`.
- Dynamic routes: `/activities/[slug]`, `/activities/schools/[branch]`, `/blog/[slug]`, `/gallery/[batchId]`.
- Admin CMS: `src/app/admin/content-manager/` (Firebase Auth gated).
- API: `src/app/api/cloudinary/` (signed upload/delete).
- Adding/removing a route requires updating the hardcoded path list in `src/app/sitemap.ts`.
- Dynamic routes must export `generateStaticParams` derived from their data file so everything prerenders.

## Content & data

- Site content is code in `src/data/*.ts` (activities, blogs, funds, accounts, gallery, images, site), not a CMS.
- Firestore collections (`heroes`, `blogs`, `galleryAlbums`, `galleryBatches`) overlay static data — `src/lib/content.ts` tries Firestore first, falls back to static files.
- All UI strings live in `src/data/dictionary.ts`. The `t()` function in `src/lib/locales.ts` is currently a pass-through (identity function) — locales are scaffolded but not wired into routing.
- Bangla numerals via `bnNum()` in `src/lib/format.ts`.

## Styling

- Tailwind v4 CSS-first: colors, fonts, shadows, and the custom `xs` breakpoint are declared in `@theme` inside `src/app/globals.css`. There is no `tailwind.config` file.
- Page width wrapper is the custom `.container-site` class, not Tailwind's `container`.
- Fonts: body is DM Sans (`--font-dmsans`) with Geist as the base (`--font-sans`). English display headings use Sora (`--font-display`). All loaded in root `src/app/layout.tsx`. No Bangla font is currently loaded.

## Design system

- Visual identity is **editorial, blue-primary, warm paper background, generous whitespace**. Do NOT change the primary color.
- Palette tokens (defined in `@theme` in `globals.css`): `paper` (warm off-white bg), `surface` (white cards), `ink` (blue-black text), `body`, `muted`, `line` (hairline), `primary` (`#0c75b8`) / `primary-dark` / `primary-soft` (tinted bg), `accent` (`#00afec`, blue) / `accent-soft`, `cream`. There is no `primary-deep`, `gold`, or `forest` token.
- Type helpers in `globals.css`: `.display-xl/.display-lg/.display-md`, `.kicker-dot` (kicker with leading gold dot), `.index-num`, `.stat-num`, `.lead`, `.pullquote`. Buttons are `.btn` pill + variants `primary`/`accent`/`gold`/`ghost`/`light`.
- Icons are **react-icons** (Ionicons, Font Awesome, Simple Icons), re-exported from `src/components/icons/ui.tsx` and `index.tsx`. Icons render `<svg>` directly, so size with `h-X w-X` (NOT `[&_svg]:`). `Deco*` icons are empty spans.
- Carousels are **Swiper** via `src/components/ui/carousel.tsx`. Hero slider uses `.hero-swiper` + `.hero-kenburns` CSS animations.
- Shared UI: `Button` (variants `primary`/`accent`/`gold`/`ghost`/`light`, sizes sm/md/lg/xl), `SectionHeader` (`title` + optional `subtitle` + right `action` slot), `PageHero` (`title`/`subtitle`/`image` required + optional `stats`/`children`; dark navy-blue overlay masthead).
- Cards: `src/components/ui/card.tsx` (`ImageCard`).
- Sections should feel distinct (staggered collage, editorial numbered lists, full-width rows), not a repeated card grid.

## shadcn/ui

- Configured via `components.json` (`radix-nova` style, Tailwind CSS variables). Components live in `src/components/ui/`.
- Add new shadcn components with `pnpm dlx shadcn@latest add <component>`.

## Firebase & deployment

- Deployed on Vercel. Cloudinary for images (cloud: `thy4ada6`).
- Firebase: Firestore for CMS content, Firebase Auth for admin access only. Admin guard checks email against hardcoded value in `src/lib/admin-guard.ts`.
- Firestore rules in `firestore.rules` — read is public, write requires admin auth.
