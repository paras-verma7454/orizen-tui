'use client'

import { ArrowRight, Check, Focus, Github, Keyboard, Palette, Terminal, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { CodeBlock } from '@/components/code-block-client'
import { ComponentPreview } from '@/components/component-preview'
import { CopyButton } from '@/components/copy-button'
import { HeroTerminal } from '@/components/hero-terminal'
import { components } from '@/lib/registry'

// ── Hero install command ──────────────────────────────────────────────────────

function InstallCommand(): JSX.Element {
  const cmd = 'npx orizen-tui@latest add spinner'
  return (
    <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full text-sm group hover:border-cyan-500/40 transition-colors max-w-full">
      <span className="text-cyan-400 select-none shrink-0">$</span>
      <span className="text-zinc-200 truncate">{cmd}</span>
      <CopyButton text={cmd} />
    </div>
  )
}

// ── Feature cards ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: Focus,
    title: 'Focus Management',
    description: 'FocusManager context eliminates manual isFocused prop drilling. Tab cycles focus automatically.',
  },
  {
    icon: Palette,
    title: 'Theme System',
    description: 'Deep-merge theme tokens for colors, spacing, and borders. Override anything via ThemeProvider.',
  },
  {
    icon: Zap,
    title: '60fps Rendering',
    description: 'Built on Ink 5 with tuistate best practices — 80ms intervals, functional updates, cleanup effects.',
  },
]

const moreFeatures = [
  {
    icon: Keyboard,
    title: 'Keyboard First',
    description: 'Every component responds to arrow keys, enter, space, and escape. No mouse required.',
  },
  {
    icon: Terminal,
    title: 'Terminal Native',
    description: 'Runs in any terminal that supports Node.js. macOS, Linux, Windows, SSH, Docker.',
  },
  {
    icon: Check,
    title: 'Type Safe',
    description: 'Full TypeScript support with strict types. Autocomplete for all props and theme tokens.',
  },
]

// ── Component grid preview ────────────────────────────────────────────────────

function ComponentCard({
  slug,
  name,
  description,
  compact = false,
}: {
  slug: string
  name: string
  description: string
  compact?: boolean
}): JSX.Element {
  return (
    <Link
      href={`/components/${slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-zinc-800 p-1.5 transition-all hover:border-cyan-500/40 hover:ring-1 hover:ring-cyan-500/20 bg-zinc-950 overflow-hidden"
    >
      <div className={`flex ${compact ? 'h-44' : 'h-32'} items-center justify-center rounded-lg bg-zinc-900/50 p-3 overflow-hidden`}>
        <div className="w-full flex justify-center">
          <ComponentPreview slug={slug} compact />
        </div>
      </div>
      <div className="px-2 pb-2">
        <p className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors truncate">{name}</p>
        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{description}</p>
      </div>
    </Link>
  )
}

// ── Code examples ─────────────────────────────────────────────────────────────

const installCliCode = `npm install orizen-tui`

const addComponentCode = `npx orizen-tui add spinner`

const usageCode = `import { render } from 'ink'
import { Spinner, ThemeProvider } from './components/ui/orizen'

render(
  <ThemeProvider>
    <Spinner label="Loading..." />
  </ThemeProvider>
)`

const themeCode = `const theme = {
  colors: {
    primary: 'cyan',
    secondary: 'magenta',
    success: 'green',
    warning: 'yellow',
    error: 'red',
  }
}

<ThemeProvider theme={theme}>
  <YourApp />
</ThemeProvider>`

// ── Quick Start code examples ─────────────────────────────────────────────────

const initCommand = `npx orizen-tui init my-tui-app`

const initInstallCode = `# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install

# Using bun
bun install`

const initRunCode = `# Run your app
npm run dev`

// ── Scrolling Rows Component ──────────────────────────────────────────────────

function ScrollingRows({ children }: { children: React.ReactNode }): JSX.Element {
  const childrenArray = React.Children.toArray(children)
  const midpoint = Math.ceil(childrenArray.length / 2)
  const row1 = childrenArray.slice(0, midpoint)
  const row2 = childrenArray.slice(midpoint)

  // Duplicate the items for seamless infinite scroll
  const duplicatedRow1 = [...row1, ...row1]
  const duplicatedRow2 = [...row2, ...row2]

  return (
    <div className="space-y-4">
      {/* Row 1 - scrolls left (right to left) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {[1, 2].map(blockIndex => (
            <div key={`block-${blockIndex}`} className="flex gap-4 pr-4">
              {duplicatedRow1.map((child, index) => (
                <div key={`r1-${blockIndex}-${index}`} className="shrink-0 w-64 sm:w-80">
                  {child}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right (left to right) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
          {[1, 2].map(blockIndex => (
            <div key={`block-${blockIndex}`} className="flex gap-4 pr-4">
              {duplicatedRow2.map((child, index) => (
                <div key={`r2-${blockIndex}-${index}`} className="shrink-0 w-64 sm:w-80">
                  {child}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage(): JSX.Element {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="pt-16 sm:pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="mb-8 flex justify-center sm:pr-16">
          <span className="group inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 p-1 transition-all duration-300 hover:border-zinc-700">
            <span className="max-w-0 overflow-hidden text-[11px] text-zinc-400 opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:px-2 group-hover:opacity-100 whitespace-nowrap">
              We're proudly
            </span>
            <a
              href="https://github.com/paras-verma7454/orizen-tui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-400 uppercase tracking-wider transition-all duration-300 hover:text-zinc-200 shadow-sm"
            >
              <Github className="h-4 w-4" />
              <span>Open Source</span>
            </a>
          </span>
        </div>

        <h1 className="text-[28px] sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-linear-to-b from-zinc-50 via-zinc-300 to-zinc-600 bg-clip-text text-transparent leading-[1.2] pb-2 sm:leading-[1.1]">
          <span className="block sm:inline">Terminal UI Components</span>
          <br className="hidden sm:block" />
          <span className="block sm:inline text-[22px] sm:text-4xl md:text-6xl text-zinc-300/80">For Node.js CLI Apps</span>
        </h1>

        <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed text-balance">
          A shadcn-style component library for terminal applications.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <InstallCommand />
          <Link
            href="/components"
            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Browse components
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Hero terminal */}
      <section className="px-6 pb-24 max-w-3xl mx-auto overflow-hidden">
        <HeroTerminal />
      </section>

      {/* Features */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors">
              <f.icon className="w-5 h-5 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Install in seconds</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Install the CLI, then add components with
              {' '}
              <code className="text-cyan-400">orizen-tui add</code>
              .
              Dependencies (ink, react, orizen-tui-core) are installed automatically.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">1</span>
                </div>
                <span className="text-zinc-300">Install dependencies</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">2</span>
                </div>
                <span className="text-zinc-300">Add components via CLI</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">3</span>
                </div>
                <span className="text-zinc-300">Import and use</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <CodeBlock code={installCliCode} lang="bash" filename="install" />
            <CodeBlock code={addComponentCode} lang="bash" filename="add component" />
            <CodeBlock code={usageCode} lang="tsx" filename="app.tsx" />
          </div>
        </div>
      </section>

      {/* Quick Start / Init */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Start a new project</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Use the
              {' '}
              <code className="text-cyan-400">init</code>
              {' '}
              command to scaffold a complete project with TypeScript, dependencies, and starter components ready to go.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">1</span>
                </div>
                <span className="text-zinc-300">Run init command</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">2</span>
                </div>
                <span className="text-zinc-300">Install dependencies</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">3</span>
                </div>
                <span className="text-zinc-300">Start building</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <CodeBlock code={initCommand} lang="bash" filename="init" />
            <CodeBlock code={initInstallCode} lang="bash" filename="install" />
            <CodeBlock code={initRunCode} lang="bash" filename="run" />
          </div>
        </div>
      </section>

      {/* Theming */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <CodeBlock code={themeCode} lang="tsx" filename="theme.tsx" />
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <h2 className="text-2xl font-bold">Theme your way</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Override any token in the theme — colors, borders, spacing, animations.
              Deep merging ensures your customizations blend perfectly with defaults.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="text-cyan-400 font-mono text-xs mb-1">primary</div>
                <div className="text-zinc-500 text-xs">Cyan accent color</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="text-emerald-400 font-mono text-xs mb-1">success</div>
                <div className="text-zinc-500 text-xs">Green for wins</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="text-yellow-400 font-mono text-xs mb-1">warning</div>
                <div className="text-zinc-500 text-xs">Yellow for caution</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="text-rose-400 font-mono text-xs mb-1">error</div>
                <div className="text-zinc-500 text-xs">Red for failures</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moreFeatures.map(f => (
            <div key={f.title} className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors">
              <f.icon className="w-5 h-5 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Component grid section */}
      <section className="pb-24 overflow-hidden">
        <div className="px-6 max-w-6xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Components</h2>
            <Link href="/components" className="text-xs text-zinc-500 hover:text-zinc-100 transition-colors flex items-center gap-1">
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Browser previews are simulations. Real components run in terminal apps through Ink.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <ScrollingRows>
            {components.map(c => (
              <ComponentCard key={c.slug} slug={c.slug} name={c.name} description={c.description} compact />
            ))}
          </ScrollingRows>
        </div>
      </section>

      {/* CTA / Footer */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to build?</h2>
            <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
              Start with a single component. Copy the code, customize the styles, and ship your terminal app today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/components"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 text-black font-medium text-sm hover:bg-cyan-400 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/paras-verma7454/orizen-tui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 font-medium text-sm hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 max-w-5xl mx-auto border-t border-zinc-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono font-bold text-sm tracking-wider">
                <span className="text-cyan-400">ORIZEN</span>
                <span className="text-zinc-500">/</span>
                <span className="text-zinc-100">TUI</span>
              </span>
            </Link>
            <span className="hidden md:inline text-zinc-700">—</span>
            <span className="text-zinc-500 text-sm">Terminal UI components for Node.js</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 w-full md:w-auto pt-6 md:pt-0 border-t border-zinc-900/50 md:border-0">
            <Link href="/components" className="hover:text-zinc-300 transition-colors">Components</Link>
            <a href="https://github.com/paras-verma7454/orizen-tui" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/orizen-tui" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">NPM</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
