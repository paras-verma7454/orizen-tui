import { notFound } from 'next/navigation'
import Link from 'next/link'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { TerminalWindow } from '@/components/terminal-window'
import { CodeBlock } from '@/components/code-block'
import { ComponentPreview } from '@/components/component-preview'
import { Tabs } from '@/components/tabs'
import { InstallCommand } from '@/components/install-command'
import { getComponent, components } from '@/lib/registry'

// Static params for all component slugs
export function generateStaticParams() {
  return components.map(c => ({ slug: c.slug }))
}

function PropsTable({ props }: { props: Array<{ name: string; type: string; default: string; description: string }> }) {
  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden font-mono text-xs">
      {/* Desktop header */}
      <div className="hidden sm:grid grid-cols-4 gap-4 px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800 text-zinc-500 uppercase tracking-widest text-[10px]">
        <span>Prop</span>
        <span>Type</span>
        <span>Default</span>
        <span>Description</span>
      </div>
      {props.map((prop, i) => (
        <div
          key={prop.name}
          className={`border-b border-zinc-800/50 last:border-0 ${i % 2 === 0 ? 'bg-transparent' : 'bg-zinc-950/40'}`}
        >
          {/* Desktop row */}
          <div className="hidden sm:grid grid-cols-4 gap-4 px-4 py-3">
            <span className="text-cyan-400">{prop.name}</span>
            <span className="text-zinc-300 truncate">{prop.type}</span>
            <span className="text-zinc-500">{prop.default}</span>
            <span className="text-zinc-400">{prop.description}</span>
          </div>
          {/* Mobile card */}
          <div className="sm:hidden px-4 py-3 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyan-400 font-semibold">{prop.name}</span>
              <span className="text-zinc-500 shrink-0">{prop.default}</span>
            </div>
            <span className="block text-zinc-300 text-[11px]">{prop.type}</span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">{prop.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function splitUsage(usage: string) {
  const lines = usage.trim().split('\n')
  const importLines: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (line.startsWith('import ') || (importLines.length > 0 && line.trim() === '')) {
      importLines.push(line)
      index++
      continue
    }
    break
  }

  const exampleLines = lines.slice(index).join('\n').trim()
  return {
    importCode: importLines.join('\n').trim(),
    exampleCode: exampleLines || usage.trim(),
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component)
    notFound()

  let sourceCode = '// Source not available'
  try {
    const srcPath = join(process.cwd(), '..', 'registry', 'src', 'components', slug, 'index.tsx')
    sourceCode = await readFile(srcPath, 'utf-8')
  }
  catch {
    // file not found fallback
  }

  const manualInstall = `npm install ink@^5.0.1 react@^18.3.1 @types/react@^18.3.18 orizen-tui-core@latest`
  const { importCode, exampleCode } = splitUsage(component.usage)
  const tocItems = [
    { id: 'installation', label: 'Installation' },
    { id: 'usage', label: 'Usage' },
    { id: 'examples', label: 'Examples' },
    { id: 'api-reference', label: 'API Reference' },
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] gap-10 max-w-6xl">
      <div className="space-y-10 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
          <Link href="/components" className="hover:text-zinc-300 transition-colors">Components</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-300">{component.name}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{component.name}</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 uppercase tracking-widest">
              stable
            </span>
          </div>
          <p className="text-zinc-400 text-sm">{component.description}</p>
        </div>

        <section className="space-y-3">
          <p className="text-xs text-zinc-500">
            Browser preview is a simulation. The copied component runs in Ink inside terminal apps.
          </p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6">
            <Tabs
              tabs={[
                {
                  label: 'Terminal UI',
                  content: (
                    <TerminalWindow title={`${slug}.tsx`} className="rounded-xl border-zinc-800">
                      <div className="py-3 min-h-28 flex items-center">
                        <ComponentPreview slug={slug} />
                      </div>
                    </TerminalWindow>
                  ),
                },
                {
                  label: 'Source',
                  content: <CodeBlock code={sourceCode} lang="tsx" filename={`${slug}.tsx`} />,
                },
              ]}
            />
          </div>
        </section>

        <section id="installation" className="space-y-3 scroll-mt-24">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Installation</h2>
          <Tabs
            tabs={[
              {
                label: 'Command',
                content: (
                  <div className="space-y-3">
                    <InstallCommand slug={slug} />
                    <p className="text-xs text-zinc-600 font-mono">
                      if dependency install fails, run:{' '}
                      <code className="text-zinc-400">{manualInstall}</code>
                    </p>
                  </div>
                ),
              },
              {
                label: 'Manual',
                content: (
                  <div className="space-y-4 rounded-lg border border-zinc-800 p-4 bg-zinc-950/40">
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-zinc-300">
                      <li>Copy and paste the following code into your project.</li>
                      <li>Update import paths to match your project setup.</li>
                    </ol>
                    <CodeBlock code={sourceCode} lang="tsx" filename={`components/ui/orizen/${slug}.tsx`} />
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section id="usage" className="space-y-3 scroll-mt-24">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Usage</h2>
          {importCode
            ? <CodeBlock code={importCode} lang="tsx" filename={`${slug}.imports.tsx`} />
            : null}
          <CodeBlock code={exampleCode} lang="tsx" filename={`${slug}.example.tsx`} />
        </section>

        <section id="examples" className="space-y-3 scroll-mt-24">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Examples</h2>
          <TerminalWindow title={`${slug}.demo.tsx`}>
            <div className="py-2">
              <ComponentPreview slug={slug} />
            </div>
          </TerminalWindow>
        </section>

        <section id="api-reference" className="space-y-3 scroll-mt-24">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">API Reference</h2>
          <h3 className="text-lg font-semibold text-zinc-200">{component.name}</h3>
          <PropsTable props={component.props} />
        </section>

        <div className="pt-4 border-t border-zinc-800">
          <a
            href={`https://github.com/orizen-tui/orizen-tui/tree/main/packages/registry/src/components/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View source on GitHub
          </a>
        </div>
      </div>

      <aside className="hidden xl:block">
        <div className="sticky top-20 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
          <p className="text-sm font-semibold text-zinc-200 mb-3">On This Page</p>
          <nav className="space-y-2">
            {tocItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
