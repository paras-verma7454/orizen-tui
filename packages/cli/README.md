# orizen-tui

Add beautiful terminal UI components to your project (shadcn-style source copy flow).

**GitHub:** https://github.com/paras-verma7454/orizen-tui

## About this package

`orizen-tui` is an npm CLI package for adding ready-to-use terminal UI components to your Ink app.

Use it when you want a shadcn-style workflow:
- install components with a command
- copy component source code into your own project
- customize the copied files freely

This package is for scaffolding component code, not for rendering UI by itself. Your app still runs with Ink + React, while this CLI helps you set up component files quickly.

## Usage

```bash
npx orizen-tui add spinner
```

Add multiple components:

```bash
npx orizen-tui add spinner badge progress
```

## Component usage examples

After running:

```bash
npx orizen-tui add spinner badge progress text-input
```

You can import and use copied components from your app:

```tsx
import { Box, render } from 'ink'
import { ThemeProvider } from 'orizen-tui-core'
import React, { useEffect, useState } from 'react'
import { Badge } from './components/ui/orizen/badge'
import { Progress } from './components/ui/orizen/progress'
import { Spinner } from './components/ui/orizen/spinner'
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
<>
  <Spinner label="Installing..." preset="dots" />
  <Badge variant="warning">BETA</Badge>
  <Progress value={42} max={100} label="Upload" />
  <TextInput value={text} onChange={setText} placeholder="Type here..." />
</>
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

