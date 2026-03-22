import type { SelectItem } from './index.js'
import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { navigateSelect, Select } from './index.js'

// ── Pure logic tests ──────────────────────────────────────────────────────────
describe('navigateSelect', () => {
  it('moves down within bounds', () => {
    expect(navigateSelect(0, 3, 'down')).toBe(1)
    expect(navigateSelect(1, 3, 'down')).toBe(2)
  })

  it('clamps at last item on down', () => {
    expect(navigateSelect(2, 3, 'down')).toBe(2)
  })

  it('moves up within bounds', () => {
    expect(navigateSelect(2, 3, 'up')).toBe(1)
    expect(navigateSelect(1, 3, 'up')).toBe(0)
  })

  it('clamps at 0 on up', () => {
    expect(navigateSelect(0, 3, 'up')).toBe(0)
  })
})

// ── Render tests ──────────────────────────────────────────────────────────────
const items: SelectItem[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

describe('Select (render)', () => {
  it('renders all items', () => {
    const { lastFrame } = render(<Select items={items} onSelect={() => {}} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('Apple')
    expect(frame).toContain('Banana')
    expect(frame).toContain('Cherry')
  })

  it('highlights the first item by default', () => {
    const { lastFrame } = render(<Select items={items} onSelect={() => {}} />)
    expect(lastFrame()).toContain('❯')
  })

  it('highlights a custom initialIndex', () => {
    const { lastFrame } = render(
      <Select items={items} onSelect={() => {}} initialIndex={1} />,
    )
    const frame = lastFrame() ?? ''
    const lines = frame.split('\n')
    const cursorLine = lines.find(l => l.includes('❯'))
    expect(cursorLine).toContain('Banana')
  })

  it('shows a label when provided', () => {
    const { lastFrame } = render(
      <Select items={items} onSelect={() => {}} label="Pick a fruit" />,
    )
    expect(lastFrame()).toContain('Pick a fruit')
  })

  it('renders cursor indicator character', () => {
    const { lastFrame } = render(<Select items={items} onSelect={() => {}} />)
    expect(lastFrame()).toContain('❯')
  })

  it('renders correct number of items', () => {
    const { lastFrame } = render(<Select items={items} onSelect={() => {}} />)
    const frame = lastFrame() ?? ''
    const lines = frame.split('\n').filter(l => l.trim())
    // 3 items, no label
    expect(lines.length).toBeGreaterThanOrEqual(3)
  })
})
