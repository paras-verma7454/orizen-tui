# orizen-tui

Add beautiful terminal UI components to your project (shadcn-style source copy flow).

## Usage

```bash
npx orizen-tui add spinner
```

Add multiple components:

```bash
npx orizen-tui add spinner badge progress
```

## Command

```bash
orizen-tui add <slug...> [options]
```

## Options

- `--path <dir>` Output directory (default: `components/ui`)
- `--cwd <dir>` Project root to run in
- `--dry-run` Print planned changes without writing files
- `--no-install` Skip dependency installation
- `--overwrite` Overwrite existing files
- `--registry <url>` Remote registry base URL override

## What it generates

- Components: `components/ui/orizen/<slug>.tsx`
- Primitives (on-demand): `components/ui/orizen/primitives/{borders,symbols}.ts`
- Barrel exports: `components/ui/orizen/index.ts`
- Installed manifest: `components/ui/orizen/components.json`

If local registry files are not available, the CLI falls back to remote registry source from GitHub.

## Dependencies installed automatically

- `ink`
- `react`
- `@types/react`
- `orizen-tui-core`

## Component usage examples

After running:

```bash
npx orizen-tui add spinner badge progress text-input
```

You can import and use copied components from your app:

```tsx
import React, { useEffect, useState } from 'react'
import { render, Box } from 'ink'
import { ThemeProvider } from 'orizen-tui-core'
import { Spinner } from './components/ui/orizen/spinner'
import { Badge } from './components/ui/orizen/badge'
import { Progress } from './components/ui/orizen/progress'
import { TextInput } from './components/ui/orizen/text-input'

function App() {
  const [value, setValue] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    const t = setInterval(() => setValue(v => Math.min(100, v + 5)), 120)
    return () => clearInterval(t)
  }, [])

  return (
    <ThemeProvider>
      <Box flexDirection="column" gap={1}>
        <Spinner label="Loading components..." />
        <Badge variant="success">READY</Badge>
        <Progress label="Build" value={value} />
        <TextInput label="Project name" value={name} onChange={setName} placeholder="my-tui-app" />
      </Box>
    </ThemeProvider>
  )
}

render(<App />)
```

Single component quick examples:

```tsx
<Spinner label="Installing..." preset="dots" />
<Badge variant="warning">BETA</Badge>
<Progress value={42} max={100} label="Upload" />
<TextInput value={text} onChange={setText} placeholder="Type here..." />
```
