'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

interface CodeBlockClientProps {
  code: string
  lang?: string
  filename?: string
}

export function CodeBlock({ code, lang = 'tsx', filename }: CodeBlockClientProps): JSX.Element {
  const [html, setHtml] = useState<string>('')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const updateTheme = (): void => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      setTheme(isLight ? 'light' : 'dark')
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false

    codeToHtml(code, {
      lang,
      theme: theme === 'light' ? 'github-light' : 'tokyo-night',
    }).then((result) => {
      if (!cancelled) {
        setHtml(result)
      }
    })

    return () => {
      cancelled = true
    }
  }, [code, lang, theme])

  return (
    <div className="relative rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden font-mono text-sm">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-subtle)] bg-[var(--color-background)]/40">
          <span className="text-xs text-[var(--color-muted)]">{filename}</span>
          <CopyButton text={code} />
        </div>
      )}
      {!filename && (
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code} />
        </div>
      )}
      <div
        className="p-4 overflow-auto [&>pre]:bg-transparent! [&>pre]:p-0!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
