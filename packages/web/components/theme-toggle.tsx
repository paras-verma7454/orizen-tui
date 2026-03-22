'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined')
    return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(): Theme {
  if (typeof window === 'undefined')
    return 'dark'
  const saved = window.localStorage.getItem('orizen-theme')
  if (saved === 'light' || saved === 'dark')
    return saved
  return getSystemTheme()
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  window.localStorage.setItem('orizen-theme', theme)
}

export function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const initial = resolveTheme()
    setTheme(initial)
    applyTheme(initial)
  }, [])

  const toggle = (): void => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/60 p-1.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      type="button"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
