'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

interface TabItem {
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  className?: string
}

export function Tabs({ tabs, className = '' }: TabsProps): JSX.Element {
  const [active, setActive] = useState(0)

  return (
    <div className={className}>
      <div className="flex gap-0 border-b border-zinc-800 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-mono transition-colors -mb-px border-b-2 ${
              active === i
                ? 'text-zinc-200 border-cyan-500'
                : 'text-zinc-500 border-transparent hover:text-zinc-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.label} className={active === i ? '' : 'hidden'}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}
