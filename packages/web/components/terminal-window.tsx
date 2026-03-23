import React from 'react'

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title = 'bash', children, className = '' }: TerminalWindowProps): JSX.Element {
  return (
    <div className={`rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-2xl overflow-hidden font-mono ${className}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-background)]/60 border-b border-[var(--color-border-subtle)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest select-none">{title}</span>
        <div className="w-12" />
      </div>
      {/* Content */}
      <div className="p-5 text-sm leading-relaxed overflow-x-auto break-all sm:break-normal">
        {children}
      </div>
    </div>
  )
}
