'use client'

import { Menu, Terminal, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { SidebarContent } from './sidebar'
import { ThemeToggle } from './theme-toggle'

export function Nav(): JSX.Element {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const inComponents = pathname.startsWith('/components')

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono font-bold text-sm tracking-wider">
            <span className="text-cyan-400">ORIZEN</span>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-100">TUI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
          <ThemeToggle />
          <Link href="/components" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Components
          </Link>
          <Link
            href="https://github.com/paras-verma7454/orizen-tui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="/components"
            className="px-3 py-1.5 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-md hover:bg-cyan-500/20 transition-colors"
          >
            Get Started →
          </Link>
        </nav>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center justify-center w-8 h-8 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-800/60 bg-background/95 backdrop-blur-md overflow-y-auto max-h-[calc(100vh-3.5rem)]">
          <div className="max-w-7xl mx-auto px-6 font-mono">
            {/* Top nav links */}
            <nav className={`flex flex-col gap-1 py-4 ${inComponents ? 'border-b border-zinc-800' : ''}`}>
              <Link
                href="/components"
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3 py-2.5 rounded hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Components
              </Link>
              <Link
                href="https://github.com/paras-verma7454/orizen-tui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3 py-2.5 rounded hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                GitHub
              </Link>
              <div className="pt-1">
                <Link
                  href="/components"
                  className="inline-flex items-center px-4 py-2 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-md hover:bg-cyan-500/20 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Get Started →
                </Link>
              </div>
            </nav>

            {/* Component navigation — only on /components pages */}
            {inComponents && (
              <SidebarContent
                onNavigate={() => setOpen(false)}
                className="font-mono"
              />
            )}
          </div>
        </div>
      )}
    </header>
  )
}
