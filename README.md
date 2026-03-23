# Orizen TUI

Open-source **terminal UI components** for Node.js CLI applications. Build beautiful terminal interfaces with a shadcn-style copy workflow.

## What is Orizen TUI?

A component library for terminal applications. Copy components into your Node.js CLI project and own every line.

- **For Terminal Apps** — Runs in Node.js, renders to any terminal
- **Familiar Patterns** — Build CLI interfaces with component-based architecture
- **Copy & Customize** — Source code lives in your project, fully editable

## Install CLI

```bash
npx orizen-tui add spinner
```

Add multiple components:

```bash
npx orizen-tui add spinner badge progress
```

## Component Examples

Spinner:

```tsx
import { Spinner } from './components/ui/orizen/spinner'

<Spinner label="Loading..." />
```

Badge:

```tsx
import { Badge } from './components/ui/orizen/badge'

<Badge variant="success">READY</Badge>
```

Progress:

```tsx
import { Progress } from './components/ui/orizen/progress'

<Progress value={64} label="Build" />
```

## Monorepo Packages

- `packages/cli` - `orizen-tui` CLI (`add` command).
- `packages/core` - theme system, hooks, and shared primitives.
- `packages/registry` - canonical terminal components + metadata.
- `packages/web` - docs website and browser preview simulation.
- `packages/demo` - local interactive demo app.

## Development

From repo root:

```bash
bun install
bun run generate:docs
bun run build
bun run test
bun run typecheck
```

Run docs locally:

```bash
bun run dev:web
```

## Publish CLI

```bash
cd packages/cli
npm publish --access public
```

## License

MIT
