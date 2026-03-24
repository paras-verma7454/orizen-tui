---
name: orizen-tui
description: >
  Use this skill whenever a user wants to install, add, or use Orizen TUI
  components in their Node.js CLI project. Trigger on any mention of: orizen-tui,
  terminal UI components, TUI spinner/badge/progress/select, `npx orizen-tui add`,
  or building CLI interfaces with copy-paste components. Also trigger when
  the user asks "how do I add a spinner to my CLI", "how do I show a progress bar
  in my terminal app", or similar component usage questions in a terminal/Node.js
  context.
---

# Orizen TUI — Usage & Installation

Orizen TUI is a **shadcn-style terminal UI component library** for Node.js/Bun CLI
apps. Components are **copied as source files** into your project — you own the code.

---

## Install a Component

```bash
npx orizen-tui@latest add spinner
```

Add multiple at once:

```bash
npx orizen-tui@latest add spinner badge progress select
```

Components land at:

```
your-project/
└── src/components/ui/orizen/
    ├── spinner.tsx
    ├── badge.tsx
    ├── progress.tsx
    ├── select.tsx
    ├── primitives/        ← auto-copied when needed
    │   ├── borders.ts
    │   └── symbols.ts
    ├── components.json    ← installed component manifest
    └── index.ts           ← barrel re-export
```

---

## CLI Flags

| Flag | What it does |
|---|---|
| `--path <dir>` | Change target directory (default: `src/components/ui`) |
| `--cwd <dir>` | Run as if from a different directory |
| `--dry-run` | Preview what would be copied, without writing files |
| `--no-install` | Skip automatic dependency installation |
| `--overwrite` | Overwrite existing component files |
| `--registry <url>` | Use a custom remote registry base URL |

```bash
npx orizen-tui add spinner --path src/components --overwrite
```

---

## Init Command — Quick Start

Create a new project with Orizen TUI pre-configured:

```bash
npx orizen-tui@latest init my-app
cd my-app
```

This creates:

```
my-app/
├── src/
│   └── index.tsx      # Starter app with Spinner, Badge, Progress
├── package.json
├── tsconfig.json
└── node_modules/
```

Then run:

```bash
bun run src/index.tsx   # or: npm run start
```

---

## Using Components

Import from the copied path and wrap with `ThemeProvider`:

```tsx
import { render } from 'ink'
import { ThemeProvider } from 'orizen-tui-core'
import React from 'react'
import { Spinner } from './src/components/ui/orizen/spinner'

render(
  <ThemeProvider>
    <Spinner label="Loading..." />
  </ThemeProvider>
)
```

### Common component props

**Spinner**
```tsx
<Spinner label="Loading" preset="dots" intervalMs={80} />
```

**Progress**
```tsx
<Progress value={64} max={100} label="Build" showPercent />
// Omit value for indeterminate mode
<Progress label="Working..." />
```

**Select**
```tsx
<Select
  items={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
  onSelect={item => console.log(item.value)}
  label="Continue?"
/>
```

**TextInput**
```tsx
<TextInput
  value={val}
  onChange={setVal}
  onSubmit={() => console.log(val)}  // Required - Enter to submit
  placeholder="Type here"
  label="Name"
  width={40}     // Optional - defaults to full terminal width
  color="cyan"   // Optional - Ink color
/>
```
Keys: Enter to submit · Escape to clear

**Textarea**
```tsx
<Textarea
  value={val}
  onChange={setVal}
  onSubmit={() => console.log(val)}  // Required - Enter to submit
  rows={4}
  placeholder="Type here..."
  label="Description"
  width={50}    // Optional - defaults to full terminal width
  color="green"  // Optional - Ink color
/>
```
Keys: Enter to submit · Shift+Enter for new line

**Badge**
```tsx
<Badge variant="success">SUCCESS</Badge>
<Badge variant="error">ERROR</Badge>
{/* variant: 'default' | 'success' | 'warning' | 'error' | 'info' */}
```

**MultiSelect** *(controlled)*
```tsx
const [selected, setSelected] = useState<string[]>([])
<MultiSelect
  items={[{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }]}
  value={selected}
  onChange={setSelected}
  onSubmit={(values) => console.log(values)}
  label="Pick fruits"
/>
```
Keys: ↑↓ navigate · Space toggle · Enter submit

**Checkbox** *(multi-item list, not a single toggle)*
```tsx
const [checked, setChecked] = useState<string[]>([])
<Checkbox
  items={[{ label: 'Feature A', value: 'a' }, { label: 'Feature B', value: 'b' }]}
  value={checked}
  onChange={setChecked}
  label="Enable features"
/>
```
Keys: ↑↓ navigate · Space toggle · Escape deselect all

**ConfirmInput**
```tsx
<ConfirmInput
  message="Are you sure?"
  defaultAnswer="yes"
  onConfirm={yes => console.log(yes)}
/>
```
Keys: y/Y confirm · n/N deny · Enter = defaultAnswer · Escape = no

**Counter**
```tsx
<Counter />                              // Default: green, 100ms interval
<Counter label="files processed" />       // Custom label
<Counter intervalMs={1000} color="cyan" />  // Custom interval & color
```
Auto-increments at the specified interval.

---

## Theming

Pass a partial theme to override defaults:

```tsx
<ThemeProvider theme={{
  colors: { primary: 'magenta', success: 'green', error: 'red' },
  borders: { style: 'round' }, // 'round' | 'single' | 'double' | 'bold' | 'classic'
  spinner: 'dots', // 'dots' | 'line' | 'arc' | 'bounce'
}}
>
  {children}
</ThemeProvider>
```

Read tokens inside any component:

```tsx
import { useTheme } from 'orizen-tui-core'

const { colors, borders, spacing } = useTheme()
```

---

## Focus Management

Pass `focus` to interactive components so only one receives input at a time:

```tsx
import { useFocus } from 'ink'

const { isFocused: nameF } = useFocus({ id: 'name' })
const { isFocused: passF } = useFocus({ id: 'pass' })

<TextInput value={name} onChange={setName} label="Username" focus={nameF} />
<TextInput value={pass} onChange={setPass} label="Password" mask="*" focus={passF} />
```

Tab / Shift+Tab cycles focus.

---

## Available Components (19)

`badge` · `checkbox` · `confirm-input` · `counter` · `file-picker` · `help` · `list` ·
`multi-select` · `number-input` · `paginator` · `progress` · `select` ·
`spinner` · `stopwatch` · `table` · `text-input` · `textarea` · `timer` · `viewport`

Browse live previews: **[orizen-tui.vercel.app](https://orizen-tui.vercel.app)** · Source: **[github.com/paras-verma7454/orizen-tui](https://github.com/paras-verma7454/orizen-tui)**

---

## Dependency Install Behavior

The CLI auto-detects your package manager from lock files and installs:
`ink@^5.0.1` · `react@^18.3.1` · `@types/react@^18.3.18` · `@types/node@latest` · `orizen-tui-core@latest`

- `bun.lock` → **Bun** · `pnpm-lock.yaml` → **pnpm** · `yarn.lock` → **Yarn** · fallback → **npm**

Use `--no-install` to manage dependencies yourself.
