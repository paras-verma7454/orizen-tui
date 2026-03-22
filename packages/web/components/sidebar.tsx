'use client'

import type { ComponentCategory } from '@/lib/registry'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories, components } from '@/lib/registry'

export function SidebarContent({ onNavigate, className }: { onNavigate?: () => void, className?: string }): JSX.Element {
  const pathname = usePathname()

  const grouped = Object.entries(categories).map(([key, label]) => ({
    key: key as ComponentCategory,
    label,
    items: components.filter(c => c.category === key),
  }))

  return (
    <div className={className ?? 'py-8 pr-4 font-mono'}>
      <div className="mb-6">
        <Link
          href="/components"
          onClick={onNavigate}
          className={`block px-3 py-1.5 text-sm rounded transition-colors ${
            pathname === '/components'
              ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
          }`}
        >
          Overview
        </Link>
      </div>

      {grouped.map(group => (
        <div key={group.key} className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 px-3 mb-2">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = pathname === `/components/${item.slug}`
              return (
                <li key={item.slug}>
                  <Link
                    href={`/components/${item.slug}`}
                    onClick={onNavigate}
                    className={`block px-3 py-1.5 text-sm rounded transition-colors ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function Sidebar(): JSX.Element {
  return (
    <aside className="w-56 shrink-0 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto">
      <SidebarContent />
    </aside>
  )
}
