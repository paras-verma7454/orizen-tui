# AGENTS.md

Guidance for coding agents working in the `orizen-tui` monorepo.

## Project Snapshot

- Product: **Orizen TUI** (shadcn-style component workflow for terminal UIs)
- Runtime stack: Bun + TypeScript + Ink + Next.js (for docs site)
- Workspace layout:
  - `packages/cli` - `orizen-tui` CLI (source-copy flow via `add`)
  - `packages/core` - theme + shared primitives/hooks for TUI components
  - `packages/registry` - canonical terminal components, metadata, and docs pipeline
  - `packages/web` - docs site + browser preview simulations
  - `packages/demo` - local interactive demo

## Ground Rules

- Prefer **small, targeted changes** over broad refactors.
- Do not edit generated files by hand unless explicitly asked.
- Keep source of truth in registry metadata (`packages/registry/src/components/*/meta.ts`).
- Preserve the copy-source mental model (like shadcn), not package-import-first DX.

## Key Commands

From repo root (`d:/code/tui`):

```bash
# Generate web docs manifest from registry metadata
bun run generate:docs

# Build all packages (includes docs generation first)
bun run build

# Typecheck all packages (includes docs generation first)
bun run typecheck

# Run all tests
bun test

# Run tests with coverage
bun test --coverage

# Lint
bun run lint
bun run lint:fix

# Run the demo app
bun run demo
```

Package-level:

```bash
# CLI tests
bun test packages/cli/src/commands/add.test.ts

# Registry docs pipeline tests
bun test packages/registry/src/docs/collect.test.ts

# Web dev server (shorthand)
bun run dev:web
# Equivalent to:
bun run --filter './packages/web' dev
```

## Registry + Docs Data Flow

1. Component runtime code: `packages/registry/src/components/<slug>/index.tsx`
2. Docs metadata: `packages/registry/src/components/<slug>/meta.ts`
3. Docs pipeline helpers: `packages/registry/src/docs/collect.ts`
4. Generator script: `packages/registry/scripts/generate-web-component-docs.ts`
5. Generated output: `packages/web/lib/generated/components.ts` (auto-generated, deterministic order)
6. Web adapter: `packages/web/lib/registry.ts` maps generated docs to web-facing shape (`install` command included)

If adding a new component, update both runtime (`index.tsx`) and metadata (`meta.ts`), then run `bun run generate:docs`.

## Available Registry Components (19)

`badge`, `checkbox`, `confirm-input`, `counter`, `file-picker`, `help`, `list`, `multi-select`, `number-input`, `paginator`, `progress`, `select`, `spinner`, `stopwatch`, `table`, `text-input`, `textarea`, `timer`, `viewport`

## Core Package (`packages/core/src`)

- `theme.ts` - theme tokens and types
- `ThemeContext.tsx` - React context for theming
- `focus.tsx` - focus management hook
- `tv.ts` - tailwind-variants-style utility for terminal styles
- `index.ts` - public exports

## CLI `add` Behavior (Expected)

Implemented in `packages/cli/src/commands/add.ts`.

- Command: `orizen-tui add <slug...>`
- Defaults:
  - target path: `src/components/ui`
  - copy destination: `src/components/ui/orizen/<slug>.tsx`
  - primitives copied on-demand to: `src/components/ui/orizen/primitives/{borders,symbols}.ts`
- Also generates/updates:
  - `src/components/ui/orizen/components.json` - manifest of installed components
  - `src/components/ui/orizen/index.ts` - barrel re-export for all installed components
- Flags:
  - `--path <dir>`
  - `--cwd <dir>`
  - `--dry-run`
  - `--no-install`
  - `--overwrite`
  - `--registry <url>` - override remote registry base URL
- Dependency install precedence:
  - Bun lock -> pnpm lock -> yaml lock -> npm fallback
- Required dependencies installed automatically:
  - `ink@^5.0.1`, `react@^18.3.1`, `@types/react@^18.3.18`, `@types/node@latest`, `orizen-tui-core@latest`
- Environment variables:
  - `ORIZEN_TUI_REGISTRY_SRC` - path to a local registry `src/` directory (overrides auto-detection)
  - `ORIZEN_TUI_REGISTRY_BASE_URL` - override remote registry base URL

Keep import rewriting behavior intact (`../../primitives/*.js` -> `./primitives/*`).

## Editing Guidelines

- Use ASCII unless the target file already contains Unicode symbols intentionally.
- Keep TypeScript strictness intact; avoid `any` unless necessary.
- Maintain ESM-compatible imports where used.
- For generated artifacts (`packages/web/lib/generated/components.ts`), prefer updating generator logic, then regenerate.
- `vitest.config.ts` exists at root but tests are run via `bun test` (Bun's native test runner).

## Verification Checklist Before Finishing

1. `bun run generate:docs`
2. Relevant tests for touched area
3. Relevant package typecheck(s)
4. If web UI changed, sanity-check docs copy still reflects:
   - browser previews are simulations
   - runtime is Ink in terminal apps

## Known Caveat

In some local environments, `packages/web` typecheck/build can fail due to Next-generated `.next` artifacts or platform spawn permissions. Validate core package changes independently if this occurs, and report the limitation clearly.
