import React from 'react'

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title = 'bash', children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono ${className}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest select-none">{title}</span>
        <div className="w-12" />
      </div>
      {/* Content */}
      <div className="p-5 text-sm leading-relaxed overflow-auto">
        {children}
      </div>
    </div>
  )
}
