<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules

These rules are mandatory for every change in this repository.

## Architecture

- Keep Next.js `app` route files thin. Route files should compose layouts, pages, metadata, and route handlers only.
- Place business/domain types in `src/core/domain`, dependency contracts in `src/core/ports`, application use cases in `src/application`, replaceable implementations in `src/infrastructure`, shared primitives in `src/shared`, and page-level composition in `src/presentation`.
- Depend inward: presentation may call application use cases, application may depend on core ports, and infrastructure implements ports. Core code must not import presentation, infrastructure, or Next-specific modules.
- Prefer server components by default. Add `"use client"` only for components that need state, event handlers, lifecycle hooks, or browser APIs.

## Mock Services And APIs

- Until real backend contracts exist, add typed mock providers in `src/infrastructure/mock`.
- Expose demonstration API routes from `src/app/api/*/route.ts` only through application use cases; do not duplicate mock data in route handlers.
- Model request and response shapes with TypeScript types before consuming them in UI.
- Keep mock data realistic enough for demos, but isolated so it can be replaced by a real provider without rewriting presentation code.

## Design System

- Use shared UI primitives from `src/shared/ui` and shared tokens from `src/shared/design` before creating one-off styles.
- Keep global CSS focused on Tailwind imports, CSS variables, browser defaults, and project-wide tokens.
- Use consistent spacing, border radius, typography, focus states, and status colors. Add new tokens before scattering raw values across screens.
- Build accessible controls with semantic HTML, clear labels, visible focus states, and responsive layouts that avoid text overflow.

## Code Quality

- Use TypeScript strictly. Avoid `any`; create explicit domain or UI types instead.
- Keep files small and named by responsibility. Do not mix data access, business decisions, and visual components in one file.
- Run `pnpm lint` and `pnpm typecheck` before considering a change complete. Run `pnpm build` for broad UI or routing changes when local tooling allows it.
- Keep commits incremental and descriptive. Separate scaffolding, architecture, UI, documentation, and fixes when practical.
- Do not revert user work or unrelated changes. Read the worktree first and make scoped edits.
