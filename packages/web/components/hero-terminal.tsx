'use client'

import { useEffect, useState } from 'react'
import { TerminalWindow } from './terminal-window'

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const TOTAL = 30

function useFrames(frames: string[], ms = 80) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % frames.length), ms)
    return () => clearInterval(t)
  }, [frames.length, ms])
  return frames[i]
}

export function HeroTerminal() {
  const spin = useFrames(SPINNER_FRAMES, 80)
  const [pct, setPct] = useState(34)
  useEffect(() => {
    const t = setInterval(() => setPct(p => (p >= 100 ? 0 : p + 1)), 120)
    return () => clearInterval(t)
  }, [])

  const filled = Math.round((pct / 100) * TOTAL)

  return (
    <TerminalWindow title="orizen --demo">
      <div className="space-y-3 text-sm">
        <div className="flex gap-2">
          <span className="text-cyan-400 select-none">$</span>
          <span className="text-zinc-400">npx orizen-tui@latest add spinner badge progress</span>
        </div>
        <div className="text-emerald-400">✓ Added 3 components to ./components/ui</div>
        <div className="h-px bg-zinc-800 my-1" />
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold">{spin}</span>
            <span className="text-zinc-300">Installing dependencies</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 w-20 text-right shrink-0">Progress:</span>
            <span className="text-cyan-400">{'█'.repeat(filled)}</span>
            <span className="text-zinc-700">{'░'.repeat(TOTAL - filled)}</span>
            <span className="text-zinc-500 text-xs ml-1">{pct}%</span>
          </div>
        </div>
        <div className="h-px bg-zinc-800 my-1" />
        <div className="flex flex-wrap gap-3">
          <span className="text-cyan-400   font-bold">[default]</span>
          <span className="text-emerald-400 font-bold">[success]</span>
          <span className="text-yellow-400 font-bold">[warning]</span>
          <span className="text-rose-400   font-bold">[error]</span>
        </div>
      </div>
    </TerminalWindow>
  )
}
