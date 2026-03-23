'use client'

import { Terminal } from 'lucide-react'
import { useState } from 'react'
import { CopyButton } from './copy-button'

const MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const
type Manager = typeof MANAGERS[number]

function buildCmd(manager: Manager, slug: string): string {
  if (manager === 'pnpm')
    return `pnpm dlx orizen-tui@latest add ${slug}`
  if (manager === 'npm')
    return `npx orizen-tui@latest add ${slug}`
  if (manager === 'yarn')
    return `yarn dlx orizen-tui@latest add ${slug}`
  return `bunx --bun orizen-tui@latest add ${slug}`
}

interface InstallCommandProps {
  slug: string
}

export function InstallCommand({ slug }: InstallCommandProps): JSX.Element {
  const [manager, setManager] = useState<Manager>('pnpm')
  const cmd = buildCmd(manager, slug)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 px-2.5 py-1.5">
        <div className="flex items-center gap-1">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-900 text-zinc-500">
            <Terminal className="w-3 h-3" />
          </span>
          {MANAGERS.map(m => (
            <button
              key={m}
              onClick={() => setManager(m)}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                manager === m
                  ? 'text-zinc-100 bg-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <CopyButton text={cmd} />
      </div>
      <div className="px-3.5 py-3 text-sm leading-relaxed text-zinc-300 select-all overflow-x-auto whitespace-pre sm:whitespace-normal sm:break-words">
        {cmd}
      </div>
    </div>
  )
}
