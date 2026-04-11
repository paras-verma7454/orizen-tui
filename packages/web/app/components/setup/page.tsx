'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/code-block-client'
import { InstallCommand } from '@/components/install-command'
import { Tabs } from '@/components/tabs'
import { usePackageManager } from '@/hooks/usePackageManager'

const MANAGER_TAB_INDEX: Record<string, number> = {
  npm: 0,
  pnpm: 1,
  bun: 2,
}

export default function SetupPage(): JSX.Element {
  const { manager, isLoaded } = usePackageManager()

  const getInitialTab = (): number => {
    if (!isLoaded)
      return 0
    return MANAGER_TAB_INDEX[manager] ?? 0
  }

  return (
    <div className="space-y-10 max-w-3xl w-full">
      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
        <Link href="/components" className="hover:text-zinc-300 transition-colors">Components</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-300">Setup</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Setup</h1>
        <p className="text-zinc-400 text-sm">
          Install and configure Orizen TUI in your terminal project.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Quick Start</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6">
          <Tabs
            initialTab={getInitialTab()}
            tabs={[
              {
                label: 'npm',
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                      Create a new project with Orizen TUI:
                    </p>
                    <CodeBlock
                      code={`npx orizen-tui@latest init my-tui-app
cd my-tui-app
npm run dev`}
                      lang="bash"
                      filename="terminal"
                    />
                  </div>
                ),
              },
              {
                label: 'pnpm',
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                      Create a new project with Orizen TUI:
                    </p>
                    <CodeBlock
                      code={`pnpm dlx orizen-tui@latest init my-tui-app
cd my-tui-app
pnpm dev`}
                      lang="bash"
                      filename="terminal"
                    />
                  </div>
                ),
              },
              {
                label: 'bun',
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                      Create a new project with Orizen TUI:
                    </p>
                    <CodeBlock
                      code={`bunx orizen-tui@latest init my-tui-app
cd my-tui-app
bun dev`}
                      lang="bash"
                      filename="terminal"
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Init Command Options</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6 space-y-4">
          <p className="text-sm text-zinc-300">
            The init command scaffolds a complete project with TypeScript, dependencies, and starter components.
          </p>
          <CodeBlock
            code={`Usage: npx orizen-tui@latest init <project-name> [options]

Arguments:
  project-name       Name of the project to create

Options:
  --cwd <dir>        Parent directory (default: current directory)
  --no-install       Skip dependency installation
  --no-git          Skip git initialization
  --force           Overwrite existing directory

Examples:
  orizen-tui init my-app
  orizen-tui init my-app --no-git
  orizen-tui init my-app --force`}
            lang="bash"
            filename="help"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Add to Existing Project</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6">
          <Tabs
            initialTab={getInitialTab()}
            tabs={[
              {
                label: 'npm',
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                      If you have an existing Ink project, add components:
                    </p>
                    <CodeBlock
                      code={`# Install dependencies
npm install ink@^5.0.1 react@^18.3.1 orizen-tui-core@latest

# Add a component
npx orizen-tui@latest add select`}
                      lang="bash"
                      filename="terminal"
                    />
                  </div>
                ),
              },
              {
                label: 'pnpm',
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                      If you have an existing Ink project, add components:
                    </p>
                    <CodeBlock
                      code={`# Install dependencies
pnpm add ink@^5.0.1 react@^18.3.1 orizen-tui-core@latest

# Add a component
pnpm dlx orizen-tui@latest add select`}
                      lang="bash"
                      filename="terminal"
                    />
                  </div>
                ),
              },
              {
                label: 'bun',
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">
                      If you have an existing Ink project, add components:
                    </p>
                    <CodeBlock
                      code={`# Install dependencies
bun add ink@^5.0.1 react@^18.3.1 orizen-tui-core@latest

# Add a component
bunx orizen-tui@latest add select`}
                      lang="bash"
                      filename="terminal"
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Add Components</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6 space-y-4">
          <p className="text-sm text-zinc-300">
            Add individual components to your project:
          </p>
          <div className="space-y-3 overflow-x-auto">
            <InstallCommand slug="select" />
            <InstallCommand slug="checkbox" />
            <InstallCommand slug="table" />
          </div>
          <p className="text-xs text-zinc-500">
            Run
            <code className="text-zinc-400 mx-1">npx orizen-tui@latest add --help</code>
            for more options.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Project Structure</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6 space-y-4">
          <p className="text-sm text-zinc-300">
            After adding components, your project will look like this:
          </p>
          <CodeBlock
            code={`my-tui-app/
├── src/
│   └── app.tsx          # Your main app
├── components/
│   └── ui/
│       └── orizen/
│           ├── index.ts           # Re-exports all components
│           ├── components.json     # Manifest of installed components
│           ├── primitives/         # Shared utilities
│           │   ├── borders.ts
│           │   └── symbols.ts
│           ├── select.tsx          # Added components
│           ├── checkbox.tsx
│           └── table.tsx
├── package.json
└── tsconfig.json`}
            lang="bash"
            filename="structure"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Usage</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6 space-y-4">
          <p className="text-sm text-zinc-300">
            Import and use components in your app:
          </p>
          <CodeBlock
            code={`import React from 'react'
import { render } from 'ink'
import { Select } from './components/ui/orizen'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

render(
  <Select
    items={items}
    onSelect={(item) => console.log(item.value)}
  />
)`}
            lang="tsx"
            filename="src/app.tsx"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">CLI Options</h2>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 md:p-6 space-y-4">
          <CodeBlock
            code={`Usage: npx orizen-tui@latest add <slugs...> [options]

Arguments:
  slugs              Component slugs to add (e.g., select, checkbox)

Options:
  --path <dir>       Target directory for components (default: "components/ui")
  --cwd <dir>        Working directory (default: current directory)
  --dry-run          Show what would be done without making changes
  --no-install       Skip dependency installation
  --overwrite        Overwrite existing files
  --registry <url>   Override remote registry base URL

Examples:
  orizen-tui add select
  orizen-tui add select checkbox table
  orizen-tui add select --path ./my-components`}
            lang="bash"
            filename="help"
          />
        </div>
      </section>

      <div className="pt-4 border-t border-zinc-800">
        <Link
          href="/components"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Browse Components
        </Link>
      </div>
    </div>
  )
}
