import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export function Nav() {
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

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm font-mono">
          <ThemeToggle />
          <Link href="/components" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Components
          </Link>
          <Link
            href="https://github.com"
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
      </div>
    </header>
  )
}
