import type { ComponentCategory } from '@/lib/registry'
import Link from 'next/link'
import { ComponentPreview } from '@/components/component-preview'
import { TerminalWindow } from '@/components/terminal-window'
import { categories, components } from '@/lib/registry'

function ComponentCard({ slug, name, description }: { slug: string, name: string, description: string }): JSX.Element {
  const useCompact = ['table', 'list', 'viewport', 'file-picker', 'select'].includes(slug)
  return (
    <Link
      href={`/components/${slug}`}
      className="group flex h-full flex-col gap-0 rounded-xl border border-zinc-800 hover:border-cyan-500/40 hover:ring-1 hover:ring-cyan-500/20 transition-all overflow-hidden"
    >
      <TerminalWindow title={`${name.toLowerCase()}.tsx`} className="rounded-none border-0 border-b border-zinc-800 h-full">
        <div className="h-28 md:h-32 flex items-center overflow-hidden">
          <ComponentPreview slug={slug} compact={useCompact} />
        </div>
      </TerminalWindow>
      <div className="px-4 py-3 min-h-20 bg-zinc-950/60 group-hover:bg-zinc-900/60 transition-colors">
        <p className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">{name}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
      </div>
    </Link>
  )
}

export default function ComponentsPage(): JSX.Element {
  const grouped = Object.entries(categories).map(([key, label]) => ({
    key: key as ComponentCategory,
    label,
    items: components.filter(c => c.category === key),
  })).filter(g => g.items.length > 0)

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold mb-2">Components</h1>
        <p className="text-zinc-400 text-sm">
          {components.length}
          {' '}
          components. Copy source into your terminal app with
          <code>npx orizen-tui@latest add</code>
          .
        </p>
        <p className="text-zinc-500 text-xs mt-2">
          Previews below are browser simulations. Real components render in actual terminal apps.
        </p>
      </div>

      {grouped.map(group => (
        <section key={group.key}>
          <h2 className="text-[11px] uppercase tracking-widest text-zinc-300 mb-6 font-bold flex items-center gap-3 after:content-[''] after:h-px after:flex-1 after:bg-zinc-800">
            {group.label}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.items.map(c => (
              <ComponentCard key={c.slug} slug={c.slug} name={c.name} description={c.description} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
