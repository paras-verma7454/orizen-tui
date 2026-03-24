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

const DOTS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const CIRCLE = ['◐', '◓', '◑', '◒']
const BAR = ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃']

function SpinnerFrame({ frames, label }: { frames: string[], label: string }): JSX.Element {
  const frame = useFrames(frames)
  return (
    <span className="flex items-center gap-2">
      <span className="text-cyan-400 font-bold inline-block w-4 text-center">{frame}</span>
      <span className="text-zinc-300">{label}</span>
    </span>
  )
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function SpinnerPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  return (
    <div className="flex flex-wrap gap-6 items-center">
      <SpinnerFrame frames={DOTS} label="Loading…" />
      <SpinnerFrame frames={CIRCLE} label="Processing" />
      <SpinnerFrame frames={BAR} label="Building" />
    </div>
  )
}

// ── Badge preview ─────────────────────────────────────────────────────────────

// eslint-disable-next-line unused-imports/no-unused-vars
export function BadgePreview({ compact = false }: { compact?: boolean }): JSX.Element {
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

function AnimatedBar(): JSX.Element {
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
      <span className="text-zinc-500 text-xs ml-2">
        {pct}
        %
      </span>
    </span>
  )
}

function StaticBar({ pct }: { pct: number }): JSX.Element {
  const filled = Math.round((pct / 100) * TOTAL)
  return (
    <span>
      <span className="text-cyan-400">{'█'.repeat(filled)}</span>
      <span className="text-zinc-700">{'░'.repeat(TOTAL - filled)}</span>
      <span className="text-zinc-500 text-xs ml-2">
        {pct}
        %
      </span>
    </span>
  )
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function ProgressPreview({ compact = false }: { compact?: boolean }): JSX.Element {
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

export function ProgressPreviewCompact(): JSX.Element {
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

// eslint-disable-next-line unused-imports/no-unused-vars
export function TextInputPreview({ compact = false }: { compact?: boolean }): JSX.Element {
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

// eslint-disable-next-line unused-imports/no-unused-vars
export function SelectPreview({ compact = false }: { compact?: boolean }): JSX.Element {
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

// eslint-disable-next-line unused-imports/no-unused-vars
export function TextareaPreview({ compact = false }: { compact?: boolean }): JSX.Element {
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
  { label: 'ESLint', checked: true },
  { label: 'Prettier', checked: false },
  { label: 'Husky', checked: false },
]

// eslint-disable-next-line unused-imports/no-unused-vars
export function CheckboxPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [active, setActive] = useState(2)
  const [items, setItems] = useState(CHECKBOX_ITEMS)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
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

// eslint-disable-next-line unused-imports/no-unused-vars
export function MultiSelectPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [active, setActive] = useState(1)
  const [selected, setSelected] = useState(INITIAL_SELECTED)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % MULTI_ITEMS.length
        setSelected((s) => {
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
      <span className="text-cyan-400 font-bold text-xs block mb-1.5">
        Pick frameworks:
        <span className="text-zinc-600">(space to toggle)</span>
      </span>
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

// eslint-disable-next-line unused-imports/no-unused-vars
export function ConfirmInputPreview({ compact = false }: { compact?: boolean }): JSX.Element {
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

// eslint-disable-next-line unused-imports/no-unused-vars
export function NumberInputPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [port, setPort] = useState(3000)
  const [workers, setWorkers] = useState(4)
  useEffect(() => {
    const portTimer = setInterval(() => setPort(p => p >= 3005 ? 3000 : p + 1), 600)
    const workersTimer = setInterval(() => setWorkers(w => w >= 8 ? 1 : w + 1), 900)
    return () => {
      clearInterval(portTimer)
      clearInterval(workersTimer)
    }
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

// ── Paginator preview ─────────────────────────────────────────────────────────

// eslint-disable-next-line unused-imports/no-unused-vars
export function PaginatorPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [page, setPage] = useState(1)
  const total = 7
  useEffect(() => {
    const timer = setInterval(() => setPage(p => p >= total ? 1 : p + 1), 700)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="font-mono space-y-4">
      <div className="space-y-1">
        <div className="text-zinc-500 text-xs">Dots</div>
        <div className="flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={`text-sm ${i + 1 === page ? 'text-cyan-400' : 'text-zinc-700'}`}>
              {i + 1 === page ? '●' : '●'}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-zinc-500 text-xs">Numeric</div>
        <div className="text-zinc-300">
          <span className="text-cyan-400">{page}</span>
          <span className="text-zinc-600">
            {' '}
            /
            {total}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Timer preview ─────────────────────────────────────────────────────────────

// eslint-disable-next-line unused-imports/no-unused-vars
export function TimerPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [ms, setMs] = useState(5320)
  useEffect(() => {
    const timer = setInterval(() => setMs(r => r <= 0 ? 9999 : r - 37), 37)
    return () => clearInterval(timer)
  }, [])
  const isWarning = ms <= 3000
  const display = ms > 0 ? `${ms}ms` : '0ms'
  return (
    <div className="font-mono space-y-4">
      <div className="space-y-1">
        <div className={`text-lg ${isWarning ? 'text-yellow-400' : 'text-zinc-200'}`}>
          Exiting in
          {' '}
          <span className={isWarning ? 'text-yellow-400' : 'text-cyan-400'}>{display}</span>
        </div>
      </div>
      <div className="flex gap-2 text-zinc-600 text-xs">
        <span>
          <span className="text-zinc-400">s</span>
          {' '}
          stop
        </span>
        <span className="text-zinc-700">•</span>
        <span>
          <span className="text-zinc-400">r</span>
          {' '}
          reset
        </span>
        <span className="text-zinc-700">•</span>
        <span>
          <span className="text-zinc-400">q</span>
          {' '}
          quit
        </span>
      </div>
    </div>
  )
}

// ── Stopwatch preview ─────────────────────────────────────────────────────────

// eslint-disable-next-line unused-imports/no-unused-vars
export function StopwatchPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(true)
  useEffect(() => {
    const toggle = setInterval(() => setRunning(r => !r), 4000)
    return () => clearInterval(toggle)
  }, [])
  useEffect(() => {
    if (!running)
      return
    const timer = setInterval(() => setMs(e => e + 37), 37)
    return () => clearInterval(timer)
  }, [running])
  const secs = (ms / 1000).toFixed(2)
  return (
    <div className="font-mono space-y-4">
      <div className="space-y-1">
        <div className="text-lg text-zinc-200">
          Elapsed:
          {' '}
          <span className={running ? 'text-cyan-400' : 'text-zinc-500'}>
            {secs}
            s
          </span>
        </div>
      </div>
      <div className="flex gap-2 text-zinc-600 text-xs">
        <span>
          <span className="text-zinc-400">s</span>
          {' '}
          {running ? 'stop' : 'start'}
        </span>
        <span className="text-zinc-700">•</span>
        <span>
          <span className="text-zinc-400">r</span>
          {' '}
          reset
        </span>
        <span className="text-zinc-700">•</span>
        <span>
          <span className="text-zinc-400">q</span>
          {' '}
          quit
        </span>
      </div>
    </div>
  )
}

// ── Viewport preview ──────────────────────────────────────────────────────────

const VIEWPORT_CONTENT = [
  '> He holds him with a skinny hand,',
  '  \'There was a ship,\' quoth he.',
  '  \'Hold off! unhand me, grey-beard loon!\'',
  '  An artichoke, dropt he.',
  '',
  '--Samuel Taylor Coleridge',
  '',
  '## Other foods worth mentioning',
  '',
  '1. Carrots',
  '1. Celery',
  '1. Tacos',
  '      * Soft',
  '      * Hard',
  '1. Cucumber',
  '',
  '## Things to eat today',
  '',
  '* [x] Carrots',
  '* [x] Ramen',
  '* [ ] Currywurst',
]

export function ViewportPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [offset, setOffset] = useState(0)
  const height = compact ? 6 : 10
  const total = VIEWPORT_CONTENT.length
  const maxOffset = total - height
  useEffect(() => {
    const timer = setInterval(() => setOffset(o => o >= maxOffset ? 0 : o + 1), 600)
    return () => clearInterval(timer)
  }, [maxOffset])
  const visible = VIEWPORT_CONTENT.slice(offset, offset + height)

  const thumbSize = Math.max(1, Math.round((height / total) * height))
  const maxThumbOffset = height - thumbSize
  const thumbOffset = maxOffset > 0 ? Math.round((offset / maxOffset) * maxThumbOffset) : 0

  return (
    <div className={`font-mono text-xs border border-zinc-700 rounded overflow-hidden ${compact ? 'w-full max-w-[16rem]' : ''}`} style={compact ? {} : { width: '28rem' }}>
      <div className="flex items-center border-b border-zinc-700 px-3 py-1.5">
        <span className="text-zinc-400 text-xs">viewport</span>
        {!compact && <span className="ml-2 text-zinc-600 text-[10px]">↑↓ · PgUp/PgDn</span>}
      </div>
      <div className="flex px-3 py-2 gap-2">
        <div className="flex-1 min-w-0">
          {visible.map((line, i) => (
            <div key={i} className="text-zinc-300 whitespace-pre leading-5 truncate">{line || '\u00A0'}</div>
          ))}
        </div>
        <div className="flex flex-col shrink-0">
          {Array.from({ length: height }, (_, i) => {
            const isThumb = i >= thumbOffset && i < thumbOffset + thumbSize
            return (
              <span key={i} className={`leading-5 select-none ${isThumb ? 'text-cyan-400' : 'text-zinc-700'}`}>
                {isThumb ? '█' : '░'}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── List preview ──────────────────────────────────────────────────────────────

const LIST_DATA = [
  { label: 'Pocky', desc: 'Expensive' },
  { label: 'Ginger', desc: 'Exquisite' },
  { label: 'Plantains', desc: 'Questionable' },
  { label: 'Honey Dew', desc: 'Delectable' },
  { label: 'Pineapple', desc: 'Kind of spicy' },
]

export function ListPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % LIST_DATA.length), 900)
    return () => clearInterval(timer)
  }, [])
  const paginationDots = Array.from({ length: LIST_DATA.length }, (_, i) => i)

  if (compact) {
    return (
      <div className="font-mono text-xs w-full max-w-[16rem]">
        <div className="space-y-1">
          {LIST_DATA.slice(0, 4).map((item, i) => {
            const isActive = i === active
            return (
              <div
                key={item.label}
                className={`pl-2 border-l-2 ${isActive ? 'border-fuchsia-400' : 'border-transparent'}`}
              >
                <div className={`font-semibold ${isActive ? 'text-fuchsia-400' : 'text-zinc-300'}`}>
                  {item.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="font-mono text-xs min-w-56">
      <div className="mb-1.5">
        <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-0.5 rounded">Groceries</span>
      </div>
      <div className="text-zinc-500 text-xs mb-2">72 items</div>
      <div className="space-y-1.5 mb-2">
        {LIST_DATA.map((item, i) => {
          const isActive = i === active
          return (
            <div
              key={item.label}
              className={`pl-2 border-l-2 ${isActive ? 'border-fuchsia-400' : 'border-transparent'}`}
            >
              <div className={`font-semibold ${isActive ? 'text-fuchsia-400' : 'text-zinc-300'}`}>
                {item.label}
              </div>
              <div className={isActive ? 'text-fuchsia-500/70' : 'text-zinc-600'}>{item.desc}</div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-0.5 mb-2">
        {paginationDots.map(i => (
          <span key={i} className={`text-[8px] ${i === active ? 'text-zinc-300' : 'text-zinc-700'}`}>●</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-zinc-600 text-[10px]">
        <span>
          <span className="text-zinc-500">↑/k</span>
          {' '}
          up
        </span>
        <span className="text-zinc-800">•</span>
        <span>
          <span className="text-zinc-500">↓/j</span>
          {' '}
          down
        </span>
        <span className="text-zinc-800">•</span>
        <span>
          <span className="text-zinc-500">enter</span>
          {' '}
          choose
        </span>
        <span className="text-zinc-800">•</span>
        <span>
          <span className="text-zinc-500">/</span>
          {' '}
          filter
        </span>
        <span className="text-zinc-800">•</span>
        <span>
          <span className="text-zinc-500">q</span>
          {' '}
          quit
        </span>
      </div>
    </div>
  )
}

// ── Table preview ─────────────────────────────────────────────────────────────

const TABLE_ROWS = [
  { rank: '6', city: 'Mexico Ci…', country: 'Mexico', pop: '22,085,140' },
  { rank: '7', city: 'Cairo', country: 'Egypt', pop: '21,750,020' },
  { rank: '8', city: 'Beijing', country: 'China', pop: '21,333,332' },
  { rank: '9', city: 'Mumbai', country: 'India', pop: '20,961,472' },
  { rank: '10', city: 'Osaka', country: 'Japan', pop: '19,059,856' },
  { rank: '11', city: 'Chongqing', country: 'China', pop: '16,874,740' },
  { rank: '12', city: 'Karachi', country: 'Pakistan', pop: '16,839,950' },
]

export function TablePreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [selected, setSelected] = useState(1)
  useEffect(() => {
    const timer = setInterval(() => setSelected(i => (i + 1) % TABLE_ROWS.length), 900)
    return () => clearInterval(timer)
  }, [])

  if (compact) {
    return (
      <div className="font-mono text-xs border border-zinc-600 rounded w-full max-w-[16rem]">
        <div className="flex gap-2 text-cyan-400 font-semibold px-2 pt-2 pb-1 text-[10px]">
          <span className="w-5 text-right">#</span>
          <span className="flex-1">City</span>
          <span className="w-16 text-right">Pop</span>
        </div>
        <div className="text-zinc-700 px-2 mb-1">{'─'.repeat(30)}</div>
        {TABLE_ROWS.slice(0, 4).map((row, i) => {
          const isActive = i === selected
          return (
            <div
              key={row.rank}
              className={`flex gap-2 px-2 py-px text-[10px] ${isActive ? 'bg-violet-600 text-white font-bold' : 'text-zinc-400'}`}
            >
              <span className="w-5 text-right">{row.rank}</span>
              <span className="flex-1 truncate">{row.city}</span>
              <span className="w-16 text-right">{row.pop}</span>
            </div>
          )
        })}
        <div className="h-1" />
      </div>
    )
  }

  return (
    <div className="font-mono text-xs border border-zinc-600 rounded min-w-72">
      <div className="flex gap-3 text-cyan-400 font-semibold px-3 pt-2 pb-1">
        <span className="w-6 text-right">Rank</span>
        <span className="w-20">City</span>
        <span className="w-16">Country</span>
        <span className="w-20 text-right">Population</span>
      </div>
      <div className="text-zinc-700 px-3 mb-1">{'─'.repeat(40)}</div>
      {TABLE_ROWS.map((row, i) => {
        const isActive = i === selected
        return (
          <div
            key={row.rank}
            className={`flex gap-3 px-3 py-px ${isActive ? 'bg-violet-600 text-white font-bold' : 'text-zinc-400'}`}
          >
            <span className="w-6 text-right">{row.rank}</span>
            <span className="w-20">{row.city}</span>
            <span className="w-16">{row.country}</span>
            <span className="w-20 text-right">{row.pop}</span>
          </div>
        )
      })}
      <div className="h-2" />
    </div>
  )
}

// ── FilePicker preview ────────────────────────────────────────────────────────

const FP_ENTRIES = [
  { perms: 'drwxr-xr-x', size: '128 B', name: 'bin', isDir: true },
  { perms: 'drwxr-xr-x', size: ' 64 B', name: 'books', isDir: true },
  { perms: 'drwxr-xr-x', size: ' 96 B', name: 'movies', isDir: true },
  { perms: 'drwxr-xr-x', size: '288 B', name: 'projects', isDir: true },
]

export function FilePickerPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % FP_ENTRIES.length), 800)
    return () => clearInterval(timer)
  }, [])

  if (compact) {
    return (
      <div className="font-mono text-xs w-full max-w-[16rem]">
        <div className="text-zinc-500 mb-1 text-[10px]">Pick a file:</div>
        <div className="space-y-0.5">
          {FP_ENTRIES.slice(0, 3).map((entry, i) => {
            const isActive = i === active
            return (
              <div key={entry.name} className="flex items-center gap-2 text-[10px]">
                <span className={`w-3 ${isActive ? 'text-cyan-400' : 'text-transparent'}`}>{'>'}</span>
                <span className={`${isActive ? 'font-bold text-zinc-200' : 'text-zinc-600'}`}>
                  {entry.perms}
                </span>
                <span className={`w-8 text-right ${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {entry.size}
                </span>
                <span className={isActive ? 'text-fuchsia-400 font-bold' : 'text-violet-400'}>
                  {entry.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="font-mono text-xs min-w-64">
      <div className="text-zinc-300 mb-1">
        <span className="text-cyan-400">{'>'}</span>
        {' '}
        <span className="text-zinc-400">./bin/file</span>
      </div>
      <div className="text-zinc-500 mb-2 pl-2">Pick a file:</div>
      <div className="space-y-0.5">
        {FP_ENTRIES.map((entry, i) => {
          const isActive = i === active
          return (
            <div key={entry.name} className="flex items-center gap-2">
              <span className={`w-3 ${isActive ? 'text-cyan-400' : 'text-transparent'}`}>{'>'}</span>
              <span className={`${isActive ? 'font-bold text-zinc-200' : 'text-zinc-600'}`}>
                {entry.perms}
              </span>
              <span className={`w-10 text-right ${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {entry.size}
              </span>
              <span className={isActive ? 'text-fuchsia-400 font-bold' : 'text-violet-400'}>
                {entry.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Help preview ──────────────────────────────────────────────────────────────

export function HelpPreview({ compact = false }: { compact?: boolean }): JSX.Element {
  const cols = [
    [
      { key: '↑/k', desc: 'move up' },
      { key: '↓/j', desc: 'move down' },
      { key: '←/h', desc: 'move left' },
      { key: '→/l', desc: 'move right' },
    ],
    [
      { key: '?', desc: 'toggle help' },
      { key: 'q', desc: 'quit' },
    ],
  ]

  if (compact) {
    return (
      <div className="font-mono text-xs w-full max-w-[16rem]">
        <div className="space-y-0.5">
          {cols[0].slice(0, 3).map(({ key, desc }) => (
            <div key={key} className="flex gap-2 text-[10px]">
              <span className="text-zinc-400 w-8">{key}</span>
              <span className="text-zinc-600">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="font-mono text-xs">
      <div className="flex gap-8">
        {cols.map((col, ci) => (
          <div key={ci} className="space-y-0.5">
            {col.map(({ key, desc }) => (
              <div key={key} className="flex gap-2">
                <span className="text-zinc-400 w-10">{key}</span>
                <span className="text-zinc-600">{desc}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Spinner Example Previews ─────────────────────────────────────────────────

const GLOBE = ['🌐', '🌍', '🌎', '🌏']

export function SpinnerExample1Preview(): JSX.Element {
  return (
    <div className="flex flex-wrap gap-6 items-center">
      <SpinnerFrame frames={DOTS} label="Loading…" />
      <SpinnerFrame frames={CIRCLE} label="Processing" />
      <SpinnerFrame frames={BAR} label="Building" />
    </div>
  )
}

export function SpinnerExample2Preview(): JSX.Element {
  const frame = useFrames(GLOBE, 200)
  return (
    <span className="flex items-center gap-2">
      <span className="text-cyan-400 font-bold inline-block w-6 text-center">{frame}</span>
      <span className="text-zinc-300">Rotating</span>
    </span>
  )
}

export function SpinnerExample3Preview(): JSX.Element {
  const frame = useFrames(DOTS, 300)
  return (
    <span className="flex items-center gap-2">
      <span className="text-cyan-400 font-bold inline-block w-4 text-center">{frame}</span>
      <span className="text-zinc-300">Take your time...</span>
    </span>
  )
}

// ── Slug → preview map ────────────────────────────────────────────────────────

interface PreviewComponent extends React.FC<{ compact?: boolean }> {}

export const previewMap: Record<string, PreviewComponent> = {
  'spinner': SpinnerPreview,
  'badge': BadgePreview,
  'progress': ProgressPreview,
  'text-input': TextInputPreview,
  'select': SelectPreview,
  'textarea': TextareaPreview,
  'checkbox': CheckboxPreview,
  'multi-select': MultiSelectPreview,
  'confirm-input': ConfirmInputPreview,
  'number-input': NumberInputPreview,
  'paginator': PaginatorPreview,
  'timer': TimerPreview,
  'stopwatch': StopwatchPreview,
  'viewport': ViewportPreview,
  'list': ListPreview,
  'table': TablePreview,
  'file-picker': FilePickerPreview,
  'help': HelpPreview,
}

export const compactPreviewMap: Partial<Record<string, React.FC>> = {
  progress: ProgressPreviewCompact,
}

// Example-specific previews (for components with multiple examples)
// Key format: "{slug}-{exampleIndex}" (0-based)
export const examplePreviewMap: Record<string, React.FC> = {
  'spinner-0': SpinnerExample1Preview,
  'spinner-1': SpinnerExample2Preview,
  'spinner-2': SpinnerExample3Preview,
}
