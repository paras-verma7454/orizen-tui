'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface TabItem {
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  className?: string
  initialTab?: number
}

export function Tabs({ tabs, className = '', initialTab = 0 }: TabsProps): JSX.Element {
  const [active, setActive] = useState(initialTab)

  useEffect(() => {
    setActive(initialTab)
  }, [initialTab])

  return (
    <div className={className}>
      <div className="flex gap-0 border-b border-zinc-800 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-mono transition-colors -mb-px border-b-2 cursor-pointer ${
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
