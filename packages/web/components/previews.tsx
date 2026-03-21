'use client'

// Static HTML/CSS simulations of each Orizen TUI component for browser display.
// Uses useState + setInterval to cycle frames — same 80ms interval as the real Ink components.

import { useEffect, useState } from 'react'

// ── Frame cycling hook (mirrors Ink's useEffect + setInterval pattern) ────────

function useFrames(frames: string[], intervalMs = 80): string {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % frames.length), intervalMs)
    return () => clearInterval(timer)
  }, [frames.length, intervalMs])
  return frames[index]
}

// ── Spinner preview ───────────────────────────────────────────────────────────

const DOTS   = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const CIRCLE = ['◐', '◓', '◑', '◒']
const BAR    = ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃']

function SpinnerFrame({ frames, label }: { frames: string[]; label: string }) {
  const frame = useFrames(frames)
  return (
    <span className="flex items-center gap-2">
      <span className="text-cyan-400 font-bold inline-block w-4 text-center">{frame}</span>
      <span className="text-zinc-300">{label}</span>
    </span>
  )
}

export function SpinnerPreview() {
  return (
    <div className="flex flex-wrap gap-6 items-center">
      <SpinnerFrame frames={DOTS}   label="Loading…" />
      <SpinnerFrame frames={CIRCLE} label="Processing" />
      <SpinnerFrame frames={BAR}    label="Building" />
    </div>
  )
}

// ── Badge preview ─────────────────────────────────────────────────────────────

export function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="text-cyan-400   font-bold">[default]</span>
      <span className="text-emerald-400 font-bold">[success]</span>
      <span className="text-yellow-400 font-bold">[warning]</span>
      <span className="text-rose-400   font-bold">[error]</span>
      <span className="text-blue-400   font-bold">[info]</span>
    </div>
  )
}

// ── Progress preview ──────────────────────────────────────────────────────────

const TOTAL = 30

function AnimatedBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setPct(p => (p >= 100 ? 0 : p + 2)), 80)
    return () => clearInterval(timer)
  }, [])
  const filled = Math.round((pct / 100) * TOTAL)
  return (
    <span>
      <span className="text-cyan-400">{'█'.repeat(filled)}</span>
      <span className="text-zinc-700">{'░'.repeat(TOTAL - filled)}</span>
      <span className="text-zinc-500 text-xs ml-2">{pct}%</span>
    </span>
  )
}

function StaticBar({ pct }: { pct: number }) {
  const filled = Math.round((pct / 100) * TOTAL)
  return (
    <span>
      <span className="text-cyan-400">{'█'.repeat(filled)}</span>
      <span className="text-zinc-700">{'░'.repeat(TOTAL - filled)}</span>
      <span className="text-zinc-500 text-xs ml-2">{pct}%</span>
    </span>
  )
}

export function ProgressPreview() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-zinc-400 w-20 text-right shrink-0">Animated:</span>
        <AnimatedBar />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-zinc-400 w-20 text-right shrink-0">  Static:</span>
        <StaticBar pct={65} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-zinc-400 w-20 text-right shrink-0">Complete:</span>
        <StaticBar pct={100} />
      </div>
    </div>
  )
}

export function ProgressPreviewCompact() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center">
        <AnimatedBar />
      </div>
      <div className="flex items-center">
        <StaticBar pct={65} />
      </div>
      <div className="flex items-center">
        <StaticBar pct={100} />
      </div>
    </div>
  )
}

// ── TextInput preview ─────────────────────────────────────────────────────────

const CURSOR_FRAMES = ['█', ' ']

export function TextInputPreview() {
  const cursor = useFrames(CURSOR_FRAMES, 530)
  return (
    <div className="space-y-1">
      <span className="text-zinc-500 text-xs">Component name:</span>
      <div className="border border-cyan-500/70 rounded px-2 py-1 flex items-center gap-0.5 w-fit min-w-44">
        <span className="text-zinc-500">e.g. button…</span>
        <span className="text-cyan-400">{cursor}</span>
      </div>
    </div>
  )
}

// ── Select preview ────────────────────────────────────────────────────────────

const SELECT_ITEMS = ['React', 'Vue', 'Svelte', 'Solid']

export function SelectPreview() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % SELECT_ITEMS.length), 900)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-0.5">
      <span className="text-cyan-400 font-bold text-xs block mb-1.5">Pick a framework:</span>
      {SELECT_ITEMS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span className={i === active ? 'text-cyan-400' : 'text-transparent select-none'}>❯</span>
          <span className={i === active ? 'text-cyan-400 font-bold' : 'text-zinc-500'}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Textarea preview ──────────────────────────────────────────────────────────

export function TextareaPreview() {
  const cursor = useFrames(['█', ' '], 530)
  const lines = ['Building a terminal UI', 'with React and Ink…']
  return (
    <div className="space-y-1">
      <span className="text-zinc-500 text-xs">Description:</span>
      <div className="border border-cyan-500/70 rounded px-2 py-1.5 min-w-56 space-y-px">
        {lines.map((line, i) => (
          <div key={i} className="text-zinc-300 text-sm">
            {line}
            {i === lines.length - 1 && <span className="text-cyan-400">{cursor}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Checkbox preview ──────────────────────────────────────────────────────────

const CHECKBOX_ITEMS = [
  { label: 'TypeScript', checked: true },
  { label: 'ESLint',     checked: true },
  { label: 'Prettier',   checked: false },
  { label: 'Husky',      checked: false },
]

export function CheckboxPreview() {
  const [active, setActive] = useState(2)
  const [items, setItems] = useState(CHECKBOX_ITEMS)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % CHECKBOX_ITEMS.length
        setItems(it => it.map((item, i) => i === next ? { ...item, checked: !item.checked } : item))
        return next
      })
    }, 900)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="space-y-0.5">
      <span className="text-cyan-400 font-bold text-xs block mb-1.5">Select features:</span>
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={i === active ? 'text-cyan-400' : 'text-transparent select-none'}>❯</span>
          <span className={item.checked ? 'text-cyan-400' : 'text-zinc-600'}>{item.checked ? '[x]' : '[ ]'}</span>
          <span className={i === active ? 'text-zinc-200' : 'text-zinc-500'}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── MultiSelect preview ───────────────────────────────────────────────────────

const MULTI_ITEMS = ['React', 'Vue', 'Svelte', 'Solid']
const INITIAL_SELECTED = new Set([0, 2])

export function MultiSelectPreview() {
  const [active, setActive] = useState(1)
  const [selected, setSelected] = useState(INITIAL_SELECTED)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % MULTI_ITEMS.length
        setSelected(s => {
          const updated = new Set(s)
          updated.has(next) ? updated.delete(next) : updated.add(next)
          return updated
        })
        return next
      })
    }, 800)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="space-y-0.5">
      <span className="text-cyan-400 font-bold text-xs block mb-1.5">Pick frameworks: <span className="text-zinc-600">(space to toggle)</span></span>
      {MULTI_ITEMS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span className={i === active ? 'text-cyan-400' : 'text-transparent select-none'}>❯</span>
          <span className={selected.has(i) ? 'text-cyan-400' : 'text-zinc-600'}>{selected.has(i) ? '◉' : '○'}</span>
          <span className={i === active ? 'text-zinc-200' : 'text-zinc-500'}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ── ConfirmInput preview ──────────────────────────────────────────────────────

export function ConfirmInputPreview() {
  const [isYes, setIsYes] = useState(true)
  useEffect(() => {
    const timer = setInterval(() => setIsYes(v => !v), 1200)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 font-mono">
        <span className="text-zinc-300">Overwrite existing file?</span>
        <span className="text-cyan-400 font-bold">{isYes ? '[Y/n]' : '[y/N]'}</span>
      </div>
      <div className="flex items-center gap-2 font-mono">
        <span className="text-zinc-300">Delete 3 files?</span>
        <span className="text-rose-400 font-bold">[y/N]</span>
      </div>
    </div>
  )
}

// ── NumberInput preview ───────────────────────────────────────────────────────

export function NumberInputPreview() {
  const [port, setPort] = useState(3000)
  const [workers, setWorkers] = useState(4)
  useEffect(() => {
    const portTimer = setInterval(() => setPort(p => p >= 3005 ? 3000 : p + 1), 600)
    const workersTimer = setInterval(() => setWorkers(w => w >= 8 ? 1 : w + 1), 900)
    return () => { clearInterval(portTimer); clearInterval(workersTimer) }
  }, [])
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <span className="text-zinc-500 text-xs">Port:</span>
        <div className="flex items-center gap-2">
          <div className="border border-cyan-500/70 rounded px-2 py-1 inline-flex items-center gap-2 min-w-20">
            <span className="text-zinc-300 inline-block w-10 text-center">{port}</span>
          </div>
          <span className="text-zinc-600 text-xs">↑↓</span>
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-zinc-500 text-xs">Workers:</span>
        <div className="flex items-center gap-2">
          <div className="border border-zinc-700 rounded px-2 py-1 inline-flex items-center gap-2 min-w-20">
            <span className="text-zinc-300 inline-block w-10 text-center">{workers}</span>
          </div>
          <span className="text-zinc-600 text-xs">↑↓</span>
        </div>
      </div>
    </div>
  )
}

// ── Slug → preview map ────────────────────────────────────────────────────────

export const previewMap: Record<string, React.FC> = {
  spinner:        SpinnerPreview,
  badge:          BadgePreview,
  progress:       ProgressPreview,
  'text-input':   TextInputPreview,
  select:         SelectPreview,
  textarea:       TextareaPreview,
  checkbox:       CheckboxPreview,
  'multi-select': MultiSelectPreview,
  'confirm-input': ConfirmInputPreview,
  'number-input': NumberInputPreview,
}

export const compactPreviewMap: Partial<Record<string, React.FC>> = {
  progress: ProgressPreviewCompact,
}
