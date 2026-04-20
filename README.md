# ALUXIL Frontend

A demonstration frontend for ALUXIL built with Next.js, TypeScript, Tailwind CSS, and a clean architecture that keeps UI, use cases, domain contracts, and data providers separate.

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS 4
- ESLint and TypeScript checks
- Typed mock services for demonstration APIs

This local setup pins wasm compiler packages for Next.js, Tailwind, and Lightning CSS, then uses Webpack for `dev` and `build` scripts because native compiler binaries can be blocked by macOS code-signing restrictions in this environment.

## Getting Started

Use `pnpm` for package management.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Architecture

The project uses explicit layers:

- `src/app`: Next.js routing, metadata, and API route handlers.
- `src/core/domain`: domain models and shared business language.
- `src/core/ports`: contracts for replaceable dependencies.
- `src/application`: use cases that orchestrate data for screens and APIs.
- `src/infrastructure`: concrete implementations, including mock providers.
- `src/presentation`: page-level UI composition.
- `src/shared`: design tokens, reusable UI primitives, utilities, and config.

The home page calls `getHomeOverview()` from the application layer. That use case depends on the `HomeOverviewProvider` port and currently uses `mockHomeOverviewProvider`. Real API clients can replace the mock provider without rewriting presentation components.

## Mock APIs

The demo exposes a typed mock endpoint:

```text
GET /api/overview
```

The route delegates to the same application use case used by the page, so mock data is defined in one place: `src/infrastructure/mock/home-overview.mock.ts`.

## Design System

Reusable primitives live in `src/shared/ui`, and shared design constants live in `src/shared/design`. Global CSS is limited to Tailwind setup, CSS variables, and base browser behavior.

## Agent Rules

Repository rules for future coding agents live in `AGENTS.md`. They cover Next.js version guidance, architecture boundaries, mock-service expectations, design-system usage, checks, and incremental commits.
