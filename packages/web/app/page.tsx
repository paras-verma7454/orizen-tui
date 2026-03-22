import { ArrowRight, Focus, Github, Palette, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentPreview } from '@/components/component-preview'
import { CopyButton } from '@/components/copy-button'
import { HeroTerminal } from '@/components/hero-terminal'
import { components } from '@/lib/registry'

// â”€â”€ Hero install command â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€ Feature cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    description: 'Built on Ink 5 with tuistate best practices â€” 80ms intervals, functional updates, cleanup effects.',
  },
]

// â”€â”€ Component grid preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ComponentCard({ slug, name, description }: { slug: string, name: string, description: string }): JSX.Element {
  return (
    <Link
      href={`/components/${slug}`}
      className="group flex h-full flex-col gap-3 rounded-xl border border-zinc-800 p-1 transition-all hover:border-cyan-500/40 hover:ring-1 hover:ring-cyan-500/20"
    >
      <div className="flex min-h-24 items-center overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-950 p-4">
        <div className="w-full overflow-x-auto font-mono text-sm">
          <ComponentPreview slug={slug} compact />
        </div>
      </div>
      <div className="px-3 pb-3">
        <p className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">{name}</p>
        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{description}</p>
      </div>
    </Link>
  )
}

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function LandingPage(): JSX.Element {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="pt-16 sm:pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="mb-8 inline-flex flex-col items-center">
          <a
            href="https://github.com/orizen-tui/orizen-tui"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
          >
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] text-zinc-400 opacity-0 transition-all duration-300 group-hover:mr-1 group-hover:max-w-64 group-hover:opacity-100">
              We&apos;re proudly
            </span>
            {/* <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> */}
            Open Source
            <Github className="h-3.5 w-3.5" />
          </a>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-600 bg-clip-text text-transparent leading-none pb-2">
          Terminal UIs,
          <br />
          Built with React.
        </h1>

        <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-base leading-relaxed">
          Open-source terminal UI components for
          {' '}
          <span className="text-zinc-200">Ink</span>
          .
          Copy the source, own every line, and ship fast with accessible, themeable primitives.
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
      <section className="px-6 pb-24 max-w-3xl mx-auto">
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

      {/* Component grid */}
      <section className="px-6 pb-32 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Components</h2>
          <Link href="/components" className="text-xs text-zinc-500 hover:text-zinc-100 transition-colors flex items-center gap-1">
            View all
            {' '}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-xs text-zinc-500 mb-4">
          Browser previews are simulations. Real components run in terminal apps through Ink.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map(c => (
            <ComponentCard key={c.slug} slug={c.slug} name={c.name} description={c.description} />
          ))}
        </div>
      </section>
    </main>
  )
}
