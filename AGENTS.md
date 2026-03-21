# AGENTS.md

Guidance for coding agents working in the `orizen-tui` monorepo.

## Project Snapshot

- Product: **Orizen TUI** (shadcn-style component workflow for terminal UIs)
- Runtime stack: Bun + TypeScript + Ink + Next.js (for docs site)
- Workspace layout:
  - `packages/cli` - `orizen-tui` CLI (source-copy flow via `add`)
  - `packages/core` - theme + shared primitives/hooks for TUI components
  - `packages/registry` - canonical terminal components and metadata
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
```

Package-level:

```bash
# CLI tests
bun test packages/cli/src/commands/add.test.ts

# Registry docs pipeline tests
bun test packages/registry/src/docs/collect.test.ts

# Web dev server
bun run --filter './packages/web' dev
```

## Registry + Docs Data Flow

1. Component runtime code lives in `packages/registry/src/components/<slug>/index.tsx`.
2. Docs metadata lives beside it in `packages/registry/src/components/<slug>/meta.ts`.
3. Generator script:
   - `packages/registry/scripts/generate-web-component-docs.ts`
4. Generated output:
   - `packages/web/lib/generated/components.ts` (auto-generated, deterministic order)
5. Web adapter:
   - `packages/web/lib/registry.ts` maps generated docs to web-facing shape (`install` command included).

If adding a new component, update both runtime and metadata, then run `bun run generate:docs`.

## CLI `add` Behavior (Expected)

Implemented in `packages/cli/src/commands/add.ts`.

- Command: `orizen-tui add <slug...>`
- Defaults:
  - target path: `components/ui`
  - copy destination: `components/ui/orizen/<slug>.tsx`
  - primitives copied on-demand to: `components/ui/orizen/primitives/{borders,symbols}.ts`
- Flags:
  - `--path <dir>`
  - `--cwd <dir>`
  - `--dry-run`
  - `--no-install`
  - `--overwrite`
- Dependency install precedence:
  - Bun lock -> pnpm lock -> yarn lock -> npm fallback

Keep import rewriting behavior intact (`../../primitives/*.js` -> `./primitives/*`).

## Editing Guidelines

- Use ASCII unless the target file already contains Unicode symbols intentionally.
- Keep TypeScript strictness intact; avoid `any` unless necessary.
- Maintain ESM-compatible imports where used.
- For generated artifacts, prefer updating generator logic, then regenerate.

## Verification Checklist Before Finishing

1. `bun run generate:docs`
2. Relevant tests for touched area
3. Relevant package typecheck(s)
4. If web UI changed, sanity-check docs copy still reflects:
   - browser previews are simulations
   - runtime is Ink in terminal apps

## Known Caveat

In some local environments, `packages/web` typecheck/build can fail due to Next-generated `.next` artifacts or platform spawn permissions. Validate core package changes independently if this occurs, and report the limitation clearly.
