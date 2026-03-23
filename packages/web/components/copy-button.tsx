'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className = '' }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(setCopied, 2000, false)
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md border border-transparent text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border-subtle)] transition-all cursor-pointer ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
        : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}
